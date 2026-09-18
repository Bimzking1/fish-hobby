import type { PlantSpecies, PlantSpeciesId, PlantStage } from '../types/aquarium';

export const PLANT_SPECIES: Record<PlantSpeciesId, PlantSpecies> = {
  'java-fern': {
    id: 'java-fern', name: 'Java Fern', form: 'fern',
    palette: { leaf: '#3E6B45', leafDark: '#27482E', stem: '#4E7A52' },
    height: 190, spread: 96, leaves: 7,
    note: 'Ties to wood, hates being buried in substrate.'
  },
  anubias: {
    id: 'anubias', name: 'Anubias', form: 'rosette',
    palette: { leaf: '#2F5E3F', leafDark: '#1D4029', stem: '#517A52' },
    height: 120, spread: 110, leaves: 6,
    note: 'Thick waxy leaves. Slow grower, algae magnet.'
  },
  'amazon-sword': {
    id: 'amazon-sword', name: 'Amazon Sword', form: 'rosette',
    palette: { leaf: '#4C8046', leafDark: '#2F5B30', stem: '#63914F' },
    height: 240, spread: 150, leaves: 9,
    note: 'Heavy root feeder. Fills the back corners fast.'
  },
  vallisneria: {
    id: 'vallisneria', name: 'Vallisneria', form: 'ribbon',
    palette: { leaf: '#5C9A4E', leafDark: '#3A6B36', stem: '#6FA95A' },
    height: 300, spread: 70, leaves: 8,
    note: 'Ribbons that curl along the surface once mature.'
  },
  'java-moss': {
    id: 'java-moss', name: 'Java Moss', form: 'moss',
    palette: { leaf: '#456F3C', leafDark: '#2B4A28', stem: '#4E7A42' },
    height: 64, spread: 120, leaves: 26,
    note: 'Fry hide in it. Traps mulm if you never trim.'
  },
  hornwort: {
    id: 'hornwort', name: 'Hornwort', form: 'feather',
    palette: { leaf: '#6AA05B', leafDark: '#3F6E3C', stem: '#7FB268' },
    height: 260, spread: 78, leaves: 12,
    note: 'Fast nitrate sponge. Sheds needles when unhappy.'
  },
  duckweed: {
    id: 'duckweed', name: 'Duckweed', form: 'floating',
    palette: { leaf: '#77B05C', leafDark: '#4E8442', stem: '#8CC06D' },
    height: 12, spread: 160, leaves: 18,
    note: 'Blocks light and never truly leaves the tank.'
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
