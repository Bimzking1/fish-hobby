import type { FishSpecies, FishSpeciesId } from '../types/fish';

/**
 * Every fish is drawn from this table — add a species here and it shows up in the
 * tank, the stocking list and the shop. Paths live in a 100x60 box, nose at x=0,
 * centreline at y=30. Keep the nose at 0 or the swim animation will look off.
 *
 * `water: 'fresh'` are river fish, `water: 'salt'` are sea fish. A species only
 * stays happy when the tank water matches — stress drives health down each night.
 */
function def(def: Omit<FishSpecies, 'id'> & { id: FishSpeciesId }): FishSpecies {
  return { ...def };
}

const fresh = { ph: [6.2, 7.8] as [number, number], temp: [22, 28] as [number, number] };
const salt = { ph: [7.9, 8.4] as [number, number], temp: [24, 28] as [number, number] };

export const FISH_SPECIES: Record<FishSpeciesId, FishSpecies> = {
  guppy: def({
    id: 'guppy', name: 'Guppy', latin: 'Poecilia reticulata', water: 'fresh', phRange: fresh.ph, tempRange: fresh.temp, price: 12,
    length: 46,
    palette: { body: '#E4A14B', belly: '#F6E0B8', fin: '#4FA3C7', accent: '#2E6F8E' },
    pattern: 'spots',
    shape: {
      body: 'M0,30 C10,20 34,15 58,20 C72,23 80,27 84,30 C80,33 72,37 58,40 C34,45 10,40 0,30 Z',
      tail: 'M82,30 C90,22 98,10 102,6 C106,18 106,42 102,54 C98,50 90,38 82,30 Z',
      dorsal: 'M44,20 C50,10 60,8 66,12 C60,16 54,19 48,21 Z',
      anal: 'M50,39 C56,46 62,48 66,46 C60,43 55,41 52,40 Z',
      pectoral: 'M40,32 C46,38 52,41 56,41 C50,36 45,33 42,32 Z',
      eye: { x: 12, y: 27, r: 3.1 }
    },
    swim: 'flutter', lapSeconds: 17, schooling: false, zone: 'top', finOpacity: 0.72,
    note: 'Restless surface swimmer, always first to the food.'
  }),
  goldfish: def({
    id: 'goldfish', name: 'Goldfish', latin: 'Carassius auratus', water: 'fresh', phRange: fresh.ph, tempRange: [16, 26], price: 48,
    length: 96,
    palette: { body: '#E2762B', belly: '#F7D9A6', fin: '#EE9C51', accent: '#B44E1C' },
    pattern: 'plain',
    shape: {
      body: 'M0,30 C8,16 26,8 46,8 C66,8 78,18 82,30 C78,42 66,52 46,52 C26,52 8,44 0,30 Z',
      tail: 'M80,30 C90,20 96,8 102,2 C104,16 104,44 102,58 C96,52 90,40 80,30 Z',
      dorsal: 'M36,9 C44,-3 58,-4 66,4 C56,6 46,8 40,10 Z',
      anal: 'M46,50 C54,58 62,59 66,56 C58,54 51,52 48,51 Z',
      pectoral: 'M38,34 C44,44 52,48 57,47 C50,41 43,36 40,34 Z',
      eye: { x: 13, y: 24, r: 4.2 }
    },
    swim: 'glide', lapSeconds: 26, schooling: false, zone: 'mid', finOpacity: 0.8,
    note: 'Big, slow, and produces a lot of waste. Needs volume.'
  }),
  betta: def({
    id: 'betta', name: 'Betta', latin: 'Betta splendens', water: 'fresh', phRange: [6.4, 7.6], tempRange: [24, 29], price: 22,
    length: 70,
    palette: { body: '#B0384F', belly: '#D8768A', fin: '#7B2E8E', accent: '#33184A' },
    pattern: 'mottle',
    shape: {
      body: 'M0,30 C10,20 28,14 48,17 C64,20 74,26 78,30 C74,34 64,40 48,43 C28,46 10,40 0,30 Z',
      tail: 'M74,30 C88,14 98,4 106,-2 C110,16 110,44 106,62 C98,56 88,46 74,30 Z',
      dorsal: 'M36,17 C46,2 62,-2 72,4 C62,10 50,14 42,17 Z',
      anal: 'M38,42 C48,56 62,62 72,58 C60,52 48,46 42,43 Z',
      pectoral: 'M36,32 C42,42 50,47 55,46 C48,40 41,35 38,32 Z',
      eye: { x: 12, y: 26, r: 3.6 }
    },
    swim: 'drift', lapSeconds: 30, schooling: false, zone: 'mid', finOpacity: 0.62,
    note: 'Territorial. Long fins tear on sharp decor.'
  }),
  'neon-tetra': def({
    id: 'neon-tetra', name: 'Neon Tetra', latin: 'Paracheirodon innesi', water: 'fresh', phRange: [6.0, 7.4], tempRange: [22, 27], price: 8,
    length: 30,
    palette: { body: '#2E7FB8', belly: '#E9F3F6', fin: '#9FC9DC', accent: '#D83A3A' },
    pattern: 'neon',
    shape: {
      body: 'M0,30 C10,22 32,18 54,22 C70,25 78,28 82,30 C78,32 70,35 54,38 C32,42 10,38 0,30 Z',
      tail: 'M80,30 C88,25 94,18 100,12 C99,24 99,36 100,48 C94,42 88,35 80,30 Z',
      dorsal: 'M44,21 C50,13 58,12 62,15 C56,18 50,20 46,21 Z',
      anal: 'M50,38 C56,44 62,45 66,43 C60,41 54,39 52,38 Z',
      pectoral: 'M38,32 C44,37 50,39 54,39 C48,35 42,33 40,32 Z',
      eye: { x: 11, y: 28, r: 2.6 }
    },
    swim: 'school', lapSeconds: 13, schooling: true, zone: 'mid', finOpacity: 0.55,
    note: 'Keep six or more or they stay pale and hidden.'
  }),
  molly: def({
    id: 'molly', name: 'Molly', latin: 'Poecilia sphenops', water: 'fresh', phRange: [7.0, 8.2], tempRange: [24, 28], price: 14,
    length: 58,
    palette: { body: '#3C3F46', belly: '#8A8F98', fin: '#5A5F69', accent: '#E0B65A' },
    pattern: 'plain',
    shape: {
      body: 'M0,30 C10,18 30,12 52,16 C70,19 78,26 82,30 C78,34 70,41 52,44 C30,48 10,42 0,30 Z',
      tail: 'M80,30 C88,24 96,16 101,10 C102,24 102,36 101,50 C96,44 88,36 80,30 Z',
      dorsal: 'M30,14 C42,2 60,0 70,6 C58,10 44,13 36,15 Z',
      anal: 'M48,43 C54,50 60,52 64,50 C58,47 52,45 50,44 Z',
      pectoral: 'M36,32 C42,40 50,44 54,43 C47,38 40,34 38,32 Z',
      eye: { x: 12, y: 26, r: 3.2 }
    },
    swim: 'glide', lapSeconds: 21, schooling: false, zone: 'any', finOpacity: 0.75,
    note: 'Hardy, grazes algae, tolerates slightly harder water. Handles brackish.'
  }),
  platy: def({
    id: 'platy', name: 'Platy', latin: 'Xiphophorus maculatus', water: 'fresh', phRange: [6.8, 8.0], tempRange: [22, 27], price: 10,
    length: 44,
    palette: { body: '#D4553A', belly: '#F4C9A6', fin: '#E8853F', accent: '#8C2F1E' },
    pattern: 'bands',
    shape: {
      body: 'M0,30 C10,19 28,13 50,17 C68,20 78,26 82,30 C78,34 68,40 50,43 C28,47 10,41 0,30 Z',
      tail: 'M80,30 C87,25 94,18 99,13 C100,24 100,36 99,47 C94,42 87,35 80,30 Z',
      dorsal: 'M38,16 C46,6 58,4 64,9 C55,12 46,15 42,17 Z',
      anal: 'M46,42 C52,48 58,50 62,48 C56,46 50,44 48,43 Z',
      pectoral: 'M36,32 C42,38 48,42 52,42 C46,37 40,34 38,32 Z',
      eye: { x: 11, y: 26, r: 3 }
    },
    swim: 'dart', lapSeconds: 18, schooling: false, zone: 'any', finOpacity: 0.74,
    note: 'Peaceful and forgiving. Good first fish.'
  }),
  angelfish: def({
    id: 'angelfish', name: 'Angelfish', latin: 'Pterophyllum scalare', water: 'fresh', phRange: [6.5, 7.5], tempRange: [24, 29], price: 38,
    length: 84,
    palette: { body: '#C9CBC4', belly: '#EFEFE8', fin: '#9AA09A', accent: '#2C2E2C' },
    pattern: 'stripes',
    shape: {
      body: 'M0,30 C8,16 22,6 40,6 C58,6 70,18 74,30 C70,42 58,54 40,54 C22,54 8,44 0,30 Z',
      tail: 'M72,30 C82,20 90,10 98,2 C99,20 99,40 98,58 C90,50 82,40 72,30 Z',
      dorsal: 'M26,8 C34,-16 44,-26 52,-24 C52,-8 48,4 44,9 Z',
      anal: 'M28,52 C36,74 46,84 54,82 C54,66 50,56 46,51 Z',
      pectoral: 'M30,32 C34,48 38,60 42,62 C40,48 36,36 33,32 Z',
      eye: { x: 12, y: 22, r: 4 }
    },
    swim: 'glide', lapSeconds: 32, schooling: false, zone: 'mid', finOpacity: 0.68,
    note: 'Tall body needs tall water. Will bully small tetras.'
  }),
  corydoras: def({
    id: 'corydoras', name: 'Corydoras', latin: 'Corydoras paleatus', water: 'fresh', phRange: [6.5, 7.6], tempRange: [22, 27], price: 16,
    length: 50,
    palette: { body: '#9A8E76', belly: '#E4DAC2', fin: '#BBB19A', accent: '#59503F' },
    pattern: 'mottle',
    shape: {
      body: 'M0,32 C12,18 34,12 56,16 C72,19 80,26 84,32 C74,38 56,42 34,41 C18,40 6,37 0,32 Z',
      tail: 'M82,32 C89,26 95,19 100,14 C100,26 100,38 100,50 C95,44 89,38 82,32 Z',
      dorsal: 'M38,15 C46,2 58,0 64,6 C55,9 45,13 42,16 Z',
      anal: 'M52,41 C58,46 64,47 68,45 C62,43 56,42 54,41 Z',
      pectoral: 'M30,34 C36,44 44,49 49,48 C42,42 34,37 32,34 Z',
      eye: { x: 13, y: 27, r: 3.2 }
    },
    swim: 'graze', lapSeconds: 24, schooling: true, zone: 'bottom', finOpacity: 0.7,
    note: 'Sifts the substrate. Needs sand, not sharp gravel.'
  }),
  clownfish: def({
    id: 'clownfish', name: 'Clownfish', latin: 'Amphiprion ocellaris', water: 'salt', phRange: salt.ph, tempRange: salt.temp, price: 120,
    length: 52,
    palette: { body: '#E2612E', belly: '#F7C189', fin: '#3A3A3E', accent: '#F4F1E6' },
    pattern: 'bands',
    shape: {
      body: 'M0,30 C10,20 30,14 52,16 C68,19 78,25 82,30 C78,35 68,41 52,44 C30,46 10,40 0,30 Z',
      tail: 'M80,30 C88,25 95,17 100,12 C101,25 101,37 100,50 C95,44 88,35 80,30 Z',
      dorsal: 'M34,15 C46,1 60,-1 70,4 C60,9 48,12 40,15 Z',
      anal: 'M46,42 C53,50 61,52 65,50 C58,47 51,45 48,43 Z',
      pectoral: 'M38,31 C44,40 52,45 57,44 C50,38 42,34 40,32 Z',
      eye: { x: 12, y: 26, r: 3.6 }
    },
    swim: 'dart', lapSeconds: 19, schooling: false, zone: 'mid', finOpacity: 0.7,
    note: 'Lives in anemones. Bold and famous — but it is a sea fish.'
  }),
  'blue-tang': def({
    id: 'blue-tang', name: 'Blue Tang', latin: 'Paracanthurus hepatus', water: 'salt', phRange: [8.0, 8.4], tempRange: [24, 27], price: 160,
    length: 68,
    palette: { body: '#2562E0', belly: '#CFE0FF', fin: '#F2D53C', accent: '#0B2E9B' },
    pattern: 'plain',
    shape: {
      body: 'M0,28 C10,16 30,10 52,13 C70,16 78,23 82,28 C78,33 70,40 52,43 C30,46 10,40 0,28 Z',
      tail: 'M80,28 C86,20 92,12 98,10 C100,22 100,34 98,46 C94,42 88,34 80,28 Z',
      dorsal: 'M34,12 C42,0 56,-2 66,2 C58,6 46,10 40,12 Z',
      anal: 'M44,42 C50,48 58,50 62,48 C56,45 49,43 47,43 Z',
      pectoral: 'M40,30 C46,40 54,47 60,47 C52,41 44,34 42,31 Z',
      eye: { x: 12, y: 25, r: 4 }
    },
    swim: 'drift', lapSeconds: 24, schooling: false, zone: 'any', finOpacity: 0.75,
    note: 'Needs a lot of grazing room. Pale belly stripe shows when stressed.'
  }),
  'royal-gramma': def({
    id: 'royal-gramma', name: 'Royal Gramma', latin: 'Gramma loreto', water: 'salt', phRange: salt.ph, tempRange: salt.temp, price: 90,
    length: 40,
    palette: { body: '#C4418F', belly: '#F0C9E0', fin: '#8A2F68', accent: '#FFD34D' },
    pattern: 'mottle',
    shape: {
      body: 'M0,30 C10,21 30,16 52,18 C68,21 77,27 81,30 C77,33 68,39 52,42 C30,44 10,39 0,30 Z',
      tail: 'M79,30 C87,25 93,18 98,13 C99,24 99,36 98,47 C93,42 87,35 79,30 Z',
      dorsal: 'M34,17 C44,6 58,4 66,8 C56,11 44,14 38,17 Z',
      anal: 'M46,41 C52,48 59,49 63,47 C57,44 50,43 48,42 Z',
      pectoral: 'M38,32 C44,40 52,44 56,43 C49,38 42,34 40,33 Z',
      eye: { x: 12, y: 26, r: 3.4 }
    },
    swim: 'glide', lapSeconds: 20, schooling: false, zone: 'bottom', finOpacity: 0.65,
    note: 'A cave-dweller. Flashy colour, needs a hide to feel safe.'
  }),
  firefish: def({
    id: 'firefish', name: 'Firefish', latin: 'Nemateleotris magnifica', water: 'salt', phRange: salt.ph, tempRange: salt.temp, price: 65,
    length: 42,
    palette: { body: '#F2E8D8', belly: '#FFFFFF', fin: '#E2552E', accent: '#B93A1A' },
    pattern: 'plain',
    shape: {
      body: 'M0,30 C10,19 30,13 52,15 C68,17 77,24 81,30 C77,36 68,43 52,45 C30,47 10,41 0,30 Z',
      tail: 'M79,30 C87,22 93,15 98,12 C99,24 99,36 98,48 C93,44 87,36 79,30 Z',
      dorsal: 'M36,13 C46,0 60,-1 68,3 C58,7 47,11 41,13 Z',
      anal: 'M44,43 C50,49 58,50 62,48 C56,45 49,44 47,44 Z',
      pectoral: 'M38,31 C44,39 51,43 56,43 C49,38 41,34 39,32 Z',
      eye: { x: 12, y: 26, r: 3.2 }
    },
    swim: 'drift', lapSeconds: 22, schooling: false, zone: 'mid', finOpacity: 0.7,
    note: 'Timid darter. It hides or "floats" mid-water over its burrow.'
  })
};

export const FISH_LIST = Object.values(FISH_SPECIES);