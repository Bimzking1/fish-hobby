import type { DailyReport, GameState, Metrics, ReportLine, TankConditions } from '../types/game';
import type { FishCondition, FishInstance } from '../types/fish';
import { clamp } from '../components/aquarium/geometry';
import { tankConditions } from '../lib/conditions';
import { nextForecast } from '../lib/meteorology';
import { FISH_SPECIES } from '../data/fish';
import { PLANT_SPECIES, stageFromHealth } from '../data/plants';
import { TANKS } from '../data/tanks';
import type { PlantInstance } from '../types/aquarium';

/**
 * The daily model. The whole point of the game lives here: keeping fish and
 * plants in *their* water, keeping the volume up, and doing the maintenance.
 *
 * Contract: pure. Takes the state at the end of a day, returns the next day's
 * state plus the report the UI shows. No randomness.
 */
export function endDay(state: GameState): { state: GameState; report: DailyReport } {
  const cond = tankConditions(state);
  const fed = state.care.some((c) => c.action === 'feed');
  const cleaned = state.care.some((c) => c.action === 'clean-glass' || c.action === 'water-change');
  const lit = state.aquarium.lightsOn;
  const heaterOn = state.equipment.some((e) => e.installed && e.powered && e.def === 'heater');

  const lines: ReportLine[] = [];

  if (!cond.hasWater) {
    lines.push({ tone: 'bad', text: 'The tank is dry. Nothing survives a night without water.' });
  } else {
    const wrongFish = state.fish.filter((f) => FISH_SPECIES[f.species].water !== cond.waterType);
    if (wrongFish.length > 0) {
      const names = wrongFish.slice(0, 3).map((f) => f.name).join(', ');
      lines.push({
        tone: 'warn',
        text: `${wrongFish.length} fish are in the wrong water (${names}${wrongFish.length > 3 ? '…' : ''}). They won't last.`
      });
    }
  }

  const fish = state.fish.map((f) => evolveFish(f, state, cond, fed, cleaned));
  const newlyDead = fish.filter((f, i) => f.condition === 'dead' && state.fish[i].condition !== 'dead');
  if (newlyDead.length > 0) {
    lines.push({
      tone: 'bad',
      text: `${newlyDead.map((f) => `${f.name} the ${FISH_SPECIES[f.species].name}`).join(' and ')} didn't make it.`
    });
  }
  const stressedCount = fish.filter((f) => f.condition === 'stressed' || f.condition === 'sick').length;
  if (newlyDead.length === 0 && stressedCount > 0) {
    lines.push({ tone: 'warn', text: 'Some fish look pale and are less active.' });
  }
  if (fish.length === 0) {
    lines.push({ tone: 'warn', text: 'The tank is fishless. Stock it when the water is ready.' });
  }

  const plants = state.plants.map((p) => evolvePlant(p, state, cond));
  const plantDeaths = plants.filter((p, i) => p.health <= 0 && state.plants[i].health > 0);
  if (plantDeaths.length > 0) {
    lines.push({
      tone: 'bad',
      text: `${plantDeaths.map((p) => PLANT_SPECIES[p.species].name).join(' and ')} ${plantDeaths.length === 1 ? 'has' : 'have'} died.`
    });
  } else {
    const wrongPlants = plants.filter((p) => p.health > 0 && cond.hasWater && PLANT_SPECIES[p.species].water !== cond.waterType);
    if (wrongPlants.length > 0) {
      lines.push({ tone: 'warn', text: 'Some water is wrong for your plants — grass withers in salt water.' });
    }
  }

  if (fed) {
    lines.push({ tone: 'good', text: 'Fish were fed and stayed active.' });
  } else if (fish.length > 0) {
    lines.push({ tone: 'warn', text: 'Nobody was fed today — hunger is their main stress.' });
  }

  /* -------- metrics -------- */

  const afterFishHealth = fish.length ? Math.round(fish.reduce((s, f) => s + f.health, 0) / fish.length) : 0;
  const plantRatio = plants.map((p) => clamp(p.health / PLANT_SPECIES[p.species].maxHp, 0, 1));
  const afterPlantHealth = plantRatio.length ? Math.round((plantRatio.reduce((a, b) => a + b, 0) / plantRatio.length) * 100) : 0;

  const livePlants = plants.filter((p) => p.health > 0);
  const plantNitrate = livePlants.reduce((s, p) => s + PLANT_SPECIES[p.species].effects.nitrate * (p.health / PLANT_SPECIES[p.species].maxHp), 0);
  const plantOxygen = livePlants.reduce((s, p) => s + PLANT_SPECIES[p.species].effects.oxygen * (p.health / PLANT_SPECIES[p.species].maxHp), 0);
  const plantAura = livePlants.reduce((s, p) => s + PLANT_SPECIES[p.species].effects.health * (p.health / PLANT_SPECIES[p.species].maxHp), 0);

  const fishCapacity = TANKS[state.aquarium.tank].capacity;

  const wqBoostPlants = plantNitrate * 9 + plantOxygen * 5 + plantAura * 4;
  const wqPenalties =
    fish.length * 6 +
    (fed && !cleaned ? 14 : 0) +
    (cond.hasWater && cond.litresPct < 0.5 ? 15 : 0);

  const after: Metrics = {
    fishHealth: afterFishHealth,
    waterQuality: Math.round(clamp((cleaned ? 6 : 0) + wqBoostPlants - wqPenalties)),
    plantHealth: afterPlantHealth,
    stability: Math.round(clamp(
      5 +
        state.equipment.filter((e) => e.installed && e.powered).length * 3 +
        (cleaned ? 4 : 0) +
        (heaterOn ? 4 : 0) -
        (fish.length > fishCapacity ? 10 : 0)
    )),
    aesthetics: Math.round(clamp(
      8 +
        state.rocks.length * 4 +
        livePlants.length * 3 +
        (state.substrate ? 4 : 0) +
        (cond.hasWater ? 5 : 0) +
        fish.length * 2 +
        (cleaned && cond.hasWater ? 4 : 0)
    ))
  };

  if (cond.hasWater) {
    lines.push({
      tone: after.waterQuality < 70 ? 'warn' : 'good',
      text: after.waterQuality < 70 ? 'Nitrate crept up — plants or a water change would help.' : 'The plants kept nitrates in check.'
    });
  }

  const nextTemp = clamp(
    cond.temperature +
      (heaterOn ? (26 - cond.temperature) * 0.4 : 0) +
      (state.forecast.weather === 'hot' ? 1.1 : state.forecast.weather === 'cold' ? -1.1 : state.forecast.weather === 'sunny' ? 0.4 : 0),
    18,
    33
  );

  const earnings = 130 + fish.length * 6;

  // The forecast shown during this day is the weather that day actually had —
  // record it as history, then roll a fresh forecast for the day to come.
  const weatherHistory = [
    ...state.weatherHistory,
    {
      day: state.day,
      weather: state.forecast.weather,
      temp: state.forecast.temperatureC,
      hum: state.forecast.humidity
    }
  ].slice(-30);
  const forecast = nextForecast(state.forecast, state.day * 31 + 47);

  return {
    state: {
      ...state,
      day: state.day + 1,
      money: state.money + earnings,
      metrics: after,
      care: [],
      finance: [
        ...state.finance,
        { day: state.day, note: `Daily earnings (${fish.length} fish)`, amount: earnings }
      ].slice(-200),
      fish,
      plants,
      weatherHistory,
      forecast,
      aquarium: {
        ...state.aquarium,
        temperatureC: nextTemp,
        algae: clamp(state.aquarium.algae + (lit ? 0.02 : -0.015) - (cleaned ? 0.1 : 0), 0, 1),
        mulm: clamp(state.aquarium.mulm + fish.length * 0.01 + (fed && !cleaned ? 0.05 : 0) - (cleaned ? 0.12 : 0), 0, 1),
        glassDirt: clamp(state.aquarium.glassDirt + 0.02 - (cleaned ? 0.15 : 0), 0, 1)
      }
    },
    report: {
      fromDay: state.day,
      toDay: state.day + 1,
      lines,
      before: state.metrics,
      after,
      earnings
    }
  };
}

function evolveFish(fish: FishInstance, state: GameState, cond: TankConditions, fed: boolean, cleaned: boolean): FishInstance {
  const spp = FISH_SPECIES[fish.species];
  let dh = 0;
  let dha = 0;

  if (!cond.hasWater) {
    dh -= 26;
    dha -= 28;
  } else {
    if (spp.water !== cond.waterType) {
      dh -= 11;
      dha -= 18;
    }
    if (cond.effectivePh < spp.phRange[0] || cond.effectivePh > spp.phRange[1]) {
      dh -= 5;
      dha -= 8;
    }
    if (cond.temperature < spp.tempRange[0] || cond.temperature > spp.tempRange[1]) {
      dh -= 4;
      dha -= 6;
    }
    if (cond.litresPct < 0.5) {
      dh -= 4;
      dha -= 6;
    }
  }

  if (fed) {
    dh += 2;
    dha += 5;
  } else {
    dha -= 4;
  }
  if (cleaned) dh += 2;
  // Hardscape (rocks, driftwood, a cave) is a hiding spot — it eases stress and
  // gives every fish a place to be safe.
  if (state.rocks.length > 0) {
    dha += 5;
    dh += 1;
  }
  if (spp.schooling) {
    const school = state.fish.filter((f) => f.species === fish.species).length;
    if (school < 3) dha -= 10;
  }

  const health = clamp(fish.health + dh, 0, 100);
  const happiness = clamp(fish.happiness + dha, 0, 100);

  return {
    ...fish,
    health,
    happiness,
    ageDays: fish.ageDays + 1,
    condition: deriveCondition(health, happiness)
  };
}

function deriveCondition(health: number, happiness: number): FishCondition {
  if (health <= 0) return 'dead';
  if (health < 25) return 'critical';
  if (health < 50) return 'sick';
  if (happiness < 50 || health < 78) return 'stressed';
  return 'healthy';
}

function evolvePlant(plant: PlantInstance, state: GameState, cond: TankConditions): PlantInstance {
  const spp = PLANT_SPECIES[plant.species];
  const maxHp = spp.maxHp;
  let hp = plant.health;

  if (!cond.hasWater) {
    hp -= maxHp * 0.2;
  } else if (spp.water !== cond.waterType) {
    hp -= maxHp * 0.34;
  } else {
    hp += 1 + (state.substrate ? 1 : 0) + (state.aquarium.lightsOn ? 1 : 0);
    if (!state.substrate && spp.form !== 'floating' && spp.form !== 'moss' && spp.form !== 'anemone') {
      hp -= maxHp * 0.06;
    }
    if (plant.daysLeft !== null) {
      const left = Math.max(0, plant.daysLeft - 1);
      if (left <= 0) hp = 0;
      if (hp === 0) {
        return { ...plant, health: 0, daysLeft: 0, stage: 'dead' };
      }
      hp = clamp(hp, 0, maxHp);
      return { ...plant, health: hp, daysLeft: left, stage: stageFromHealth(hp, maxHp) };
    }
  }

  hp = clamp(hp, 0, maxHp);
  return { ...plant, health: hp, stage: hp <= 0 ? 'dead' : stageFromHealth(hp, maxHp) };
}