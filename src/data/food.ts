import type { FoodDef, FoodId } from '../types/aquarium';

export const FOODS: Record<FoodId, FoodDef> = {
  flakes: { id: 'flakes', name: 'Flakes', shape: 'flake', color: '#D9913F', colorDark: '#A8641F', sinkSeconds: 9, size: 7, note: 'Drifts at the surface, top feeders get it first.' },
  pellets: { id: 'pellets', name: 'Pellets', shape: 'sphere', color: '#8A5A2B', colorDark: '#5C3818', sinkSeconds: 4.5, size: 6, note: 'Sinks quickly. Good for mid and bottom fish.' },
  granules: { id: 'granules', name: 'Granules', shape: 'grain', color: '#B8703A', colorDark: '#7A4520', sinkSeconds: 6, size: 4.5, note: 'Slow sink, spreads through the water column.' },
  frozen: { id: 'frozen', name: 'Frozen', shape: 'cube', color: '#9B3F4E', colorDark: '#6A2733', sinkSeconds: 5, size: 9, note: 'Rich. Fouls the water if any is left over.' },
  live: { id: 'live', name: 'Live', shape: 'worm', color: '#C05A6A', colorDark: '#8A3646', sinkSeconds: 7.5, size: 8, note: 'Wriggles on the way down. Best conditioning food.' }
};

export const FOOD_LIST = Object.values(FOODS);
