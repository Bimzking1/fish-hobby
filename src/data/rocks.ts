import type { RockDef, RockDefId } from '../types/aquarium';

/**
 * Hardscape is bought piece by piece. Like water and soil, every rock reports
 * what it adds to the tank — some shove pH up (limestone, coral rubble), some
 * shift it down (driftwood tannins), and this matters for fish compatibility.
 */
export const ROCKS: Record<RockDefId, RockDef> = {
  'river-stone': {
    id: 'river-stone', name: 'River stone', water: 'fresh',
    phShift: 0, hardness: 1, aesthetics: 2, art: 'rock', tone: 'pale', price: 16,
    note: 'Smooth, neutral. A quiet river bottom classic.'
  },
  slate: {
    id: 'slate', name: 'Slate', water: 'fresh',
    phShift: 0, hardness: 2, aesthetics: 2, art: 'rock', tone: 'dark', price: 20,
    note: 'Sharp edges. Neutral, builds layered ledges.'
  },
  'lava-rock': {
    id: 'lava-rock', name: 'Lava rock', water: 'any',
    phShift: 0, hardness: 0, aesthetics: 3, art: 'rock', tone: 'coal', price: 26,
    note: 'Porous and light. Great filter bacteria home, works in either water.'
  },
  limestone: {
    id: 'limestone', name: 'Limestone', water: 'any',
    phShift: 0.4, hardness: 3, aesthetics: 2, art: 'rock', tone: 'pale', price: 24,
    note: 'Leaches calcium — pushes pH up. Good for hard-water keepers.'
  },
  seiryu: {
    id: 'seiryu', name: 'Seiryu stone', water: 'fresh',
    phShift: 0, hardness: 2, aesthetics: 3, art: 'rock', tone: 'pale', price: 36,
    note: 'Ridged accent stone. Slightly hard, keep it in planted tanks.'
  },
  'coral-rubble': {
    id: 'coral-rubble', name: 'Coral rubble', water: 'salt',
    phShift: 0.2, hardness: 2, aesthetics: 2, art: 'rock', tone: 'pale', price: 30,
    note: 'Buffers salt water hard and bright. Sea tanks only.'
  },
  driftwood: {
    id: 'driftwood', name: 'Driftwood', water: 'fresh',
    phShift: -0.2, hardness: 0, aesthetics: 3, art: 'driftwood', tone: 'pale', price: 32,
    note: 'Tannins soften and slightly acidify fresh water.'
  },
  cave: {
    id: 'cave', name: 'Cave hide', water: 'any',
    phShift: 0, hardness: 1, aesthetics: 2, art: 'cave', tone: 'dark', price: 40,
    note: 'A hide for shy species — bettas and grammas feel safe here.'
  }
};

export const ROCK_LIST = Object.values(ROCKS);