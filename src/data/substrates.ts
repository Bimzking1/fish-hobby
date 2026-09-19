import type { SubstrateDef, SubstrateId } from '../types/aquarium';

/**
 * Substrate (soil/sand/gravel) is sold by the bag. Each bag covers a set
 * percentage of the floor, so a full tank needs several purchases. It also
 * reports what it gives you: nutrients for rooted plants and a pH shift.
 */
export const SUBSTRATES: Record<SubstrateId, SubstrateDef> = {
  'fine-sand': {
    id: 'fine-sand', name: 'Fine sand', water: 'any',
    base: '#E3D3AE', shade: '#C8B389', grain: '#F2E7CB', grainSize: 1.6, density: 160,
    bagCoverage: 25, nutrients: 1, phShift: 0, price: 22,
    note: 'Soft on barbels. Corydoras love it. Waste sits on top where you can see it.'
  },
  gravel: {
    id: 'gravel', name: 'Gravel', water: 'any',
    base: '#C4B49A', shade: '#9C8A70', grain: '#DCCDB2', grainSize: 4.4, density: 110,
    bagCoverage: 25, nutrients: 0, phShift: 0, price: 18,
    note: 'Classic. Traps debris between the stones, neutral pH.'
  },
  'dark-gravel': {
    id: 'dark-gravel', name: 'Dark gravel', water: 'any',
    base: '#4E4A45', shade: '#332F2C', grain: '#6B655D', grainSize: 4.8, density: 110,
    bagCoverage: 25, nutrients: 0, phShift: 0, price: 21,
    note: 'Makes fish colour up. Hides mulm a little too well.'
  },
  soil: {
    id: 'soil', name: 'Aquasoil', water: 'fresh',
    base: '#3B322B', shade: '#241E19', grain: '#4C4137', grainSize: 3.2, density: 130,
    bagCoverage: 25, nutrients: 3, phShift: -0.3, price: 34,
    note: 'Rich root nutrition, gently lowers pH. Clouds if you dig it in. Fresh-water only.'
  }
};

export const SUBSTRATE_LIST = Object.values(SUBSTRATES);