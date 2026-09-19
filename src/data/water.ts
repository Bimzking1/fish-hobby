import type { WaterDef, WaterType } from '../types/aquarium';

/**
 * Water is the single most important ingredient. Everything else has to be
 * compatible with it. Buying water shows which fish it suits and the shop
 * warns you when a fish or plant won't tolerate it.
 */
export const WATERS: Record<WaterType, WaterDef> = {
  fresh: {
    type: 'fresh',
    name: 'Fresh water',
    label: 'River',
    ph: 7.0,
    phRange: [6.2, 7.8],
    tdsLabel: '150–400 ppm',
    tempSuggested: 25,
    unit: 20,
    price: 18,
    note: 'Tap or dechlorinated water. River fish and grass plants live here.'
  },
  salt: {
    type: 'salt',
    name: 'Salt water',
    label: 'Sea',
    ph: 8.2,
    phRange: [7.9, 8.4],
    tdsLabel: 'SG 1.024–1.026',
    tempSuggested: 26,
    unit: 20,
    price: 28,
    note: 'Mixed marine water. Sea fish, coral and seaweed need it.'
  }
};

export const WATER_LIST = Object.values(WATERS);