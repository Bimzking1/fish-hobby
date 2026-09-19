import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createInitialState } from '../data/initialState';
import { endDay as runEndDay } from '../simulation/endDay';
import { FISH_SPECIES } from '../data/fish';
import { PLANT_SPECIES } from '../data/plants';
import { WATERS } from '../data/water';
import { SUBSTRATES } from '../data/substrates';
import { ROCKS } from '../data/rocks';
import { TANKS } from '../data/tanks';
import { EQUIPMENT } from '../data/equipment';
import type { FoodId, FoodParticle, PlantInstance, RockInstance, RockDefId, SubstrateId, WaterType, AquariumState } from '../types/aquarium';
import type { ActionId, DailyReport, GameState, NoticeKind } from '../types/game';
import type { FishSpeciesId } from '../types/fish';
import { SCENE } from '../components/aquarium/geometry';
import { loadFromLocalStorage, saveToLocalStorage, clearLocalStorage } from './save';
import { mulberry32, range, pick } from './rng';

const ACTION_LABELS: Record<ActionId, string> = {
  feed: 'Fed the tank',
  'water-change': 'Changed 25% of the water',
  'clean-glass': 'Cleaned the glass',
  'check-water': 'Tested the water',
  'adjust-filter': 'Adjusted the filter',
  'adjust-oxygen': 'Adjusted aeration',
  lighting: 'Changed the lighting',
  medicine: 'Dosed medication',
  plants: 'Trimmed the plants',
  equipment: 'Serviced equipment'
};

const FISH_NAMES = ['Blue', 'Coral', 'Finley', 'Milo', 'Luna', 'Ash', 'Comet', 'Penny', 'Rigby', 'Sushi', 'Marina', 'Splash', 'Bubbles', 'Neptune', 'Fern', 'Pearl', 'Santo', 'Waffles', 'Pilot', 'Mango', 'Olive', 'Ziggy', 'Nix', 'Boba', 'Delta', 'Onyx'];

let particleId = 0;
let instanceId = 0;

const WATER_WARN: Record<WaterType, string> = {
  fresh: 'is a fresh-water (river) tank',
  salt: 'is a salt-water (sea) tank'
};

export function useGame() {
  const [state, setState] = useState<GameState>(() => loadFromLocalStorage() ?? createInitialState({ started: false }));
  const [hasSave, setHasSave] = useState<boolean>(() => loadFromLocalStorage() !== null);
  const [food, setFood] = useState<FoodParticle[]>([]);
  const [report, setReport] = useState<DailyReport | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [noticeKind, setNoticeKind] = useState<NoticeKind>('info');
  const timers = useRef<number[]>([]);

  useEffect(() => saveToLocalStorage(state), [state]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const flash = useCallback((message: string, kind: NoticeKind = 'info') => {
    setNotice(message);
    setNoticeKind(kind);
    timers.current.push(window.setTimeout(() => setNotice(null), 2600));
  }, []);

  const feed = useCallback((foodId: FoodId) => {
    const rand = mulberry32(Date.now() % 100000);
    const batch: FoodParticle[] = Array.from({ length: 16 }, () => ({
      id: `food-${particleId++}`,
      food: foodId,
      x: range(rand, 180, SCENE.width - 180),
      delay: range(rand, 0, 1.6),
      spin: range(rand, -240, 240)
    }));
    setFood((current) => [...current.slice(-40), ...batch]);
    timers.current.push(
      window.setTimeout(() => {
        setFood((current) => current.filter((p) => !batch.some((b) => b.id === p.id)));
      }, 14000)
    );
  }, []);

  const runAction = useCallback(
    (action: ActionId) => {
      let undone = false;
      setState((s) => {
        const already = s.care.some((c) => c.action === action);
        undone = already;
        const care = already
          ? s.care.filter((c) => c.action !== action)
          : [...s.care, { action, label: ACTION_LABELS[action] }];
        const next: GameState = { ...s, care };
        if (!already && action === 'lighting') next.aquarium = { ...s.aquarium, lightsOn: !s.aquarium.lightsOn };
        if (!already && action === 'clean-glass') next.aquarium = { ...next.aquarium, glassDirt: Math.max(0, s.aquarium.glassDirt - 0.15) };
        return next;
      });
      if (!undone && action === 'feed') feed(state.selectedFood);
      flash(undone ? `${ACTION_LABELS[action]} undone` : ACTION_LABELS[action], undone ? 'info' : 'success');
    },
    [feed, flash, state.selectedFood]
  );

  const endDay = useCallback(() => {
    setState((s) => {
      const result = runEndDay(s);
      setReport(result.report);
      return result.state;
    });
  }, []);

  const patch = useCallback((changes: Partial<GameState>) => setState((s) => ({ ...s, ...changes })), []);
  const replace = useCallback((next: GameState) => setState(next), []);
  const dismissNotice = useCallback(() => setNotice(null), []);

  /* ------------------------------- splash ------------------------------- */

  const startNewGame = useCallback(() => {
    clearLocalStorage();
    replace(createInitialState());
    setHasSave(true);
    flash('Fresh tank. Start in the shop.');
  }, [replace, flash]);

  const loadGame = useCallback(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      replace(saved);
      setHasSave(true);
      flash(`Welcome back — day ${saved.day}`);
      setReport(null);
    } else {
      flash('No saved tank found on this browser.');
    }
  }, [replace, flash]);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  const backToSplash = useCallback(() => {
    setReport(null);
    dismissNotice();
    patch({ started: false });
  }, [patch, setReport, dismissNotice]);

  /* -------------------------------- shop -------------------------------- */

  const buyWater = useCallback(
    (type: WaterType) => {
      const def = WATERS[type];
      if (state.money < def.price) return flash("Not enough cash — don't worry, it comes in fast.");
      setState((s) => {
        const tankL = TANKS[s.aquarium.tank].litres;
        const current = s.water?.litres ?? 0;
        const differentType = s.water !== null && s.water.type !== type;
        return {
          ...s,
          money: s.money - def.price,
          water: { type, litres: Math.min(tankL, current + def.unit) },
          finance: [...s.finance, { day: s.day, note: `Added ${def.unit}L ${def.name.toLowerCase()}`, amount: -def.price }].slice(-200),
          care: differentType ? [...s.care, { action: 'water-change', label: `Switched to ${def.name.toLowerCase()}` }] : s.care
        };
      });
      flash(`Added ${def.unit}L of ${def.name} (${WATER_WARN[type]})`, 'info');
    },
    [state.money, flash]
  );

  const buySubstrate = useCallback(
    (id: SubstrateId) => {
      const def = SUBSTRATES[id];
      if (state.money < def.price) return flash('Not enough cash for that bag.');
      setState((s) => {
        const replacing = s.substrate !== null && s.substrate.id !== id;
        return {
          ...s,
          money: s.money - def.price,
          substrate: {
            id,
            coverage: Math.min(100, replacing ? def.bagCoverage : (s.substrate?.coverage ?? 0) + def.bagCoverage)
          },
          finance: [...s.finance, { day: s.day, note: `Bag of ${def.name.toLowerCase()}`, amount: -def.price }].slice(-200)
        };
      });
      flash(`Laid in a bag of ${def.name} (${def.bagCoverage}% coverage)`);
    },
    [state.money, flash]
  );

  const buyRock = useCallback(
    (id: RockDefId) => {
      const def = ROCKS[id];
      if (state.money < def.price) return flash('Not enough cash for that piece.');
      setState((s) => {
        if (s.rocks.length >= 8) return s;
        const rand = mulberry32(Date.now() % 999983);
        const rock: RockInstance = {
          id: `rock-${instanceId++}`,
          def: id,
          x: range(rand, 120, SCENE.width - 120),
          y: SCENE.floorY + range(rand, 4, 26),
          scale: range(rand, 0.8, 1.4),
          seed: Math.floor(range(rand, 1, 400))
        };
        return { ...s, money: s.money - def.price, rocks: [...s.rocks, rock], finance: [...s.finance, { day: s.day, note: `Bought ${def.name.toLowerCase()}`, amount: -def.price }].slice(-200) };
      });
      flash(`Placed ${def.name}`);
    },
    [state.money, flash]
  );

  const buyPlant = useCallback(
    (speciesId: string) => {
      const def = PLANT_SPECIES[speciesId as keyof typeof PLANT_SPECIES];
      if (!def) return flash('That plant is not in the shop.');
      if (state.money < def.price) return flash(`Not enough cash for a ${def.name}.`);
      const wrongWater =
        state.water !== null && state.water.type !== def.water
          ? ` — it is a ${def.water === 'fresh' ? 'fresh' : 'salt'}-water plant and this is ${WATER_WARN[state.water.type]}`
          : '';
      setState((s) => {
        if (s.plants.length >= 20) return s;
        const rand = mulberry32(Date.now() % 999983 + instanceId);
        const plant: PlantInstance = {
          id: `plant-${instanceId++}`,
          species: def.id,
          stage: 'growing',
          health: def.maxHp,
          daysLeft: def.lifespanDays,
          x: range(rand, 0.06, 0.94),
          scale: range(rand, 0.92, 1.12),
          seed: Math.floor(range(rand, 1, 400))
        };
        return { ...s, money: s.money - def.price, plants: [...s.plants, plant], finance: [...s.finance, { day: s.day, note: `Bought ${def.name}`, amount: -def.price }].slice(-200) };
      });
      flash(`Bought ${def.name}${wrongWater}`);
    },
    [state.money, state.water, flash]
  );

  const buyFish = useCallback(
    (id: FishSpeciesId) => {
      const def = FISH_SPECIES[id];
      if (state.water === null) return flash('The tank is dry — pour some water before adding fish.', 'warning');
      if (state.money < def.price) return flash(`Not enough cash for a ${def.name}.`);
      const warned =
        state.water.type !== def.water
          ? ` — this is a ${def.water === 'fresh' ? 'fresh' : 'salt'}-water fish and your tank ${WATER_WARN[state.water.type]}`
          : '';
      setState((s) => {
        const rand = mulberry32(Date.now() % 999983 + instanceId);
        return {
          ...s,
          money: s.money - def.price,
          finance: [...s.finance, { day: s.day, note: `Bought a ${def.name}`, amount: -def.price }].slice(-200),
          fish: [
            ...s.fish,
            {
              id: `fish-${instanceId++}`,
              name: pick(rand, FISH_NAMES),
              species: id,
              condition: 'healthy',
              health: 100,
              happiness: 100,
              ageDays: 1,
              phase: range(rand, 0, 1),
              depth: range(rand, 0.2, 0.8),
              scale: range(rand, 0.92, 1.08)
            }
          ]
        };
      });
      flash(`Added a ${def.name}${warned}`);
    },
    [state.money, state.water, flash]
  );

  const buyEquipment = useCallback(
    (id: string) => {
      const def = EQUIPMENT[id as keyof typeof EQUIPMENT];
      if (!def) return flash('That item is not in the shop.');
      if (state.money < def.price) return flash(`Not enough cash for a ${def.name}.`);
      setState((s) => {
        const rand = mulberry32(Date.now() % 999983 + instanceId);
        return {
          ...s,
          money: s.money - def.price,
          finance: [...s.finance, { day: s.day, note: `Installed ${def.name}`, amount: -def.price }].slice(-200),
          equipment: [
            ...s.equipment,
            {
              id: `eq-${instanceId++}`,
              def: def.id,
              installed: true,
              powered: def.id !== 'feeding-ring' && def.category !== 'cleaning',
              position: range(rand, 0.15, 0.85),
              wear: 0
            }
          ]
        };
      });
      flash(`Installed ${def.name}`);
    },
    [state.money, flash]
  );

  const sellFish = useCallback(
    (fishId: string) => {
      const fish = state.fish.find((f) => f.id === fishId);
      if (!fish) return;
      const def = FISH_SPECIES[fish.species];
      const gain = fish.condition === 'dead' || fish.health <= 0 ? 0 : Math.round(def.price * 0.5);
      setState((s) => ({
        ...s,
        money: s.money + gain,
        finance: gain > 0 ? [...s.finance, { day: s.day, note: `Sold ${fish.name}`, amount: gain }].slice(-200) : s.finance,
        fish: s.fish.filter((f) => f.id !== fishId)
      }));
      flash(gain > 0 ? `Sold ${fish.name} for $${gain}.` : `Removed ${fish.name} (no value in that condition).`, gain > 0 ? 'money' : 'info');
    },
    [state.fish, flash]
  );

  const disposeFish = useCallback(
    (fishId: string) => {
      const fish = state.fish.find((f) => f.id === fishId);
      if (!fish) return;
      setState((s) => ({ ...s, fish: s.fish.filter((f) => f.id !== fishId) }));
      flash(`${fish.name} removed from the tank.`);
    },
    [state.fish, flash]
  );

  const removePlant = useCallback((plantId: string) => {
    setState((s) => ({ ...s, plants: s.plants.filter((p) => p.id !== plantId) }));
  }, []);

  const setAquarium = useCallback((changes: Partial<AquariumState>) => {
    setState((s) => ({ ...s, aquarium: { ...s.aquarium, ...changes } }));
  }, []);

  const stocking = useMemo(() => state.fish.length, [state.fish]);

  return {
    state, hasSave, food, report, notice, noticeKind, stocking,
    runAction, endDay, patch, replace, setReport, flash, dismissNotice,
    startNewGame, loadGame, toggleTheme, backToSplash,
    buyWater, buySubstrate, buyRock, buyPlant, buyFish, buyEquipment,
    sellFish, disposeFish, removePlant, setAquarium
  };
}