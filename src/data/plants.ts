import type { PlantSpecies, PlantSpeciesId, PlantStage } from '../types/aquarium';

/**
 * Plants are living creatures in this game. Each has a max HP, a preferred water
 * (grass = fresh, coral/seaweed = salt), and either an endless life (everlasting)
 * or a countdown (`lifespanDays`). Wrong water drains HP fast.
 *
 * `values` is the human-readable perk list shown in the shop; `effects` is the
 * actual daily nudge applied in the simulation.
 */
export const PLANT_SPECIES: Record<PlantSpeciesId, PlantSpecies> = {
  'java-fern': {
    id: 'java-fern', name: 'Java Fern', form: 'fern', water: 'fresh',
    palette: { leaf: '#3E6B45', leafDark: '#27482E', stem: '#4E7A52' },
    height: 190, spread: 96, leaves: 7,
    maxHp: 60, lifespanDays: null, price: 14,
    values: ['Easy, forgiving evergreen', 'Small health aura', 'Loves being tied to wood'],
    effects: { oxygen: 1, nitrate: 1, health: 1, aesthetics: 2 },
    note: 'Ties to wood, hates being buried in substrate.'
  },
  anubias: {
    id: 'anubias', name: 'Anubias', form: 'rosette', water: 'fresh',
    palette: { leaf: '#2F5E3F', leafDark: '#1D4029', stem: '#517A52' },
    height: 120, spread: 110, leaves: 6,
    maxHp: 70, lifespanDays: null, price: 16,
    values: ['Everlasting', 'Tolerates low light', 'Strong health aura'],
    effects: { oxygen: 1, nitrate: 1, health: 2, aesthetics: 2 },
    note: 'Thick waxy leaves. Slow grower, algae magnet.'
  },
  'amazon-sword': {
    id: 'amazon-sword', name: 'Amazon Sword', form: 'rosette', water: 'fresh',
    palette: { leaf: '#4C8046', leafDark: '#2F5B30', stem: '#63914F' },
    height: 240, spread: 150, leaves: 9,
    maxHp: 80, lifespanDays: 45, price: 20,
    values: ['Big nitrate sponge', 'Heavy root feeder — wants rich soil', 'Timed life, must be replanted'],
    effects: { oxygen: 2, nitrate: 3, health: 1, aesthetics: 3 },
    note: 'Heavy root feeder. Fills the back corners fast.'
  },
  vallisneria: {
    id: 'vallisneria', name: 'Vallisneria', form: 'ribbon', water: 'fresh',
    palette: { leaf: '#5C9A4E', leafDark: '#3A6B36', stem: '#6FA95A' },
    height: 300, spread: 70, leaves: 8,
    maxHp: 60, lifespanDays: 60, price: 18,
    values: ['Runners spread fast', 'Great filler in the back', 'Timed life, must be replanted'],
    effects: { oxygen: 2, nitrate: 2, health: 0, aesthetics: 2 },
    note: 'Ribbons that curl along the surface once mature.'
  },
  'java-moss': {
    id: 'java-moss', name: 'Java Moss', form: 'moss', water: 'fresh',
    palette: { leaf: '#456F3C', leafDark: '#2B4A28', stem: '#4E7A42' },
    height: 64, spread: 120, leaves: 26,
    maxHp: 50, lifespanDays: null, price: 12,
    values: ['Everlasting carpet', 'Fry hide in it', 'Traps mulm if you never trim'],
    effects: { oxygen: 1, nitrate: 1, health: 1, aesthetics: 1 },
    note: 'Fry hide in it. Traps mulm if you never trim.'
  },
  hornwort: {
    id: 'hornwort', name: 'Hornwort', form: 'feather', water: 'fresh',
    palette: { leaf: '#6AA05B', leafDark: '#3F6E3C', stem: '#7FB268' },
    height: 260, spread: 78, leaves: 12,
    maxHp: 70, lifespanDays: 40, price: 18,
    values: ['Fastest nitrate sponge', 'Grows a lot per day', 'Timed life — sheds and must be replanted'],
    effects: { oxygen: 2, nitrate: 3, health: 0, aesthetics: 2 },
    note: 'Fast nitrate sponge. Sheds needles when unhappy.'
  },
  duckweed: {
    id: 'duckweed', name: 'Duckweed', form: 'floating', water: 'fresh',
    palette: { leaf: '#77B05C', leafDark: '#4E8442', stem: '#8CC06D' },
    height: 12, spread: 160, leaves: 18,
    maxHp: 30, lifespanDays: null, price: 8,
    values: ['Everlasting surface mat', 'First nitrate filter', 'Blocks light'],
    effects: { oxygen: 0, nitrate: 1, health: 0, aesthetics: 1 },
    note: 'Blocks light and never truly leaves the tank.'
  },
  coral: {
    id: 'coral', name: 'Coral', form: 'anemone', water: 'salt',
    palette: { leaf: '#E58B8B', leafDark: '#B54563', stem: '#7A2E4D' },
    height: 110, spread: 130, leaves: 14,
    maxHp: 40, lifespanDays: null, price: 30,
    values: ['Everlasting saltwater showpiece', 'Big aesthetics boost', 'Dies in fresh water — like all sea plants'],
    effects: { oxygen: 0, nitrate: 1, health: 1, aesthetics: 3 },
    note: 'Holds the reef together. Petals close when stressed.'
  },
  seaweed: {
    id: 'seaweed', name: 'Seaweed', form: 'kelp', water: 'salt',
    palette: { leaf: '#3F8F6A', leafDark: '#285C44', stem: '#5AAE80' },
    height: 220, spread: 80, leaves: 8,
    maxHp: 50, lifespanDays: 50, price: 22,
    values: ['Saltwater nitrate sponge', 'Sea fish love to graze it', 'Timed life, must be replanted'],
    effects: { oxygen: 2, nitrate: 3, health: 1, aesthetics: 2 },
    note: 'Macroalgae. Grazes nitrates for the whole reef.'
  }
};

export const PLANT_LIST = Object.values(PLANT_SPECIES);

/** Stage drives scale + colour so growth reads at a glance. */
export const PLANT_STAGE_STYLE: Record<PlantStage, { scale: number; saturation: number; droop: number; opacity: number }> = {
  young: { scale: 0.45, saturation: 1.05, droop: 0, opacity: 1 },
  growing: { scale: 0.72, saturation: 1, droop: 0, opacity: 1 },
  mature: { scale: 1, saturation: 1, droop: 0, opacity: 1 },
  overgrown: { scale: 1.22, saturation: 0.92, droop: 4, opacity: 1 },
  wilting: { scale: 0.95, saturation: 0.55, droop: 14, opacity: 0.85 },
  dead: { scale: 0.85, saturation: 0.18, droop: 26, opacity: 0.6 }
};

/** Map a plant's hp ratio to a stage so damage reads visually. */
export function stageFromHealth(health: number, maxHp: number): PlantStage {
  const r = maxHp <= 0 ? 0 : health / maxHp;
  if (r <= 0.05) return 'dead';
  if (r < 0.4) return 'wilting';
  if (r < 0.55) return 'young';
  if (r < 0.8) return 'growing';
  if (r < 0.95) return 'mature';
  return 'overgrown';
}