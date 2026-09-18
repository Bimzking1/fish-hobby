import type { SnailSpecies, SnailSpeciesId } from '../types/aquarium';

export const SNAIL_SPECIES: Record<SnailSpeciesId, SnailSpecies> = {
  nerite: {
    id: 'nerite', name: 'Nerite', shell: '#3A2C1E', shellDark: '#1F1710',
    foot: '#D8C8AE', size: 22, coil: 'cone', note: 'Best glass cleaner. Lays stubborn white eggs.'
  },
  mystery: {
    id: 'mystery', name: 'Mystery Snail', shell: '#C88A2E', shellDark: '#8A5A17',
    foot: '#E7D2B0', size: 30, coil: 'cone', note: 'Big and slow. Comes up for air at the surface.'
  },
  ramshorn: {
    id: 'ramshorn', name: 'Ramshorn', shell: '#A8453A', shellDark: '#6E2A22',
    foot: '#EAC9B2', size: 18, coil: 'flat', note: 'Flat coil. Population tracks how much you overfeed.'
  },
  trumpet: {
    id: 'trumpet', name: 'Malaysian Trumpet', shell: '#7C6A4A', shellDark: '#4A3E2A',
    foot: '#D6C4A4', size: 16, coil: 'tall', note: 'Burrows by day and turns the substrate over.'
  }
};

export const SNAIL_LIST = Object.values(SNAIL_SPECIES);
