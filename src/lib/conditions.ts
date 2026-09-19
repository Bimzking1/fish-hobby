import type { TankConditions } from '../types/game';
import type { GameState } from '../types/game';
import { TANKS } from '../data/tanks';
import { WATERS } from '../data/water';
import { SUBSTRATES } from '../data/substrates';
import { ROCKS } from '../data/rocks';

/**
 * The tank's actual measured state each night: is the water right, how full is
 * it, and what pH do the water + soil + rocks add up to.
 */
export function tankConditions(state: GameState): TankConditions {
  const water = state.water;
  const hasWater = water !== null;
  const litres = water?.litres ?? 0;
  const litresPct = litres / TANKS[state.aquarium.tank].litres;
  const phBase = hasWater && water ? WATERS[water.type].ph : 0;
  const phShift =
    (state.substrate ? SUBSTRATES[state.substrate.id].phShift : 0) +
    state.rocks.reduce((sum, r) => sum + ROCKS[r.def].phShift, 0);
  const effectivePh = hasWater ? Math.max(0, phBase + phShift) : 0;
  return {
    hasWater,
    waterType: water?.type ?? null,
    litres,
    litresPct,
    effectivePh,
    temperature: state.aquarium.temperatureC
  };
}