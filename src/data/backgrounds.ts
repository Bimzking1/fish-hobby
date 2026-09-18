import type { BackgroundId, SubstrateId } from '../types/aquarium';

export interface BackgroundDef {
  id: BackgroundId;
  name: string;
  /** Top-to-bottom water gradient stops. */
  water: [string, string, string];
  /** Far wall behind the water. */
  wall: [string, string];
  /** Light shaft + surface caustic tint. */
  light: string;
  /** Silhouette layer drawn against the back wall. */
  silhouette: 'none' | 'reeds' | 'rocks' | 'roots' | 'haze';
  note: string;
}

export const BACKGROUNDS: Record<BackgroundId, BackgroundDef> = {
  'clean-blue': { id: 'clean-blue', name: 'Clean blue', water: ['#7FD3E4', '#3E9FBC', '#1C6B8A'], wall: ['#BCE7F0', '#6FB9D2'], light: '#FFFFFF', silhouette: 'none', note: 'Bright display water.' },
  dark: { id: 'dark', name: 'Dark', water: ['#2A4E5C', '#16323E', '#0A1D25'], wall: ['#16323E', '#08151B'], light: '#9FE3F2', silhouette: 'haze', note: 'Colours pop against black.' },
  tropical: { id: 'tropical', name: 'Tropical', water: ['#8FDCD0', '#3FA8A4', '#1C6F73'], wall: ['#A9E6D8', '#4C9E97'], light: '#FFF4CE', silhouette: 'reeds', note: 'Warm and planted.' },
  river: { id: 'river', name: 'River', water: ['#A8C98E', '#5F9469', '#33613F'], wall: ['#C3D9A6', '#77A277'], light: '#FFF0BC', silhouette: 'roots', note: 'Green tinted, driftwood tannins.' },
  deep: { id: 'deep', name: 'Deep water', water: ['#3D6FA8', '#1E4576', '#0C2246'], wall: ['#2B5588', '#0A1B38'], light: '#BFD9FF', silhouette: 'haze', note: 'Cool, quiet, low light.' },
  planted: { id: 'planted', name: 'Natural planted', water: ['#9FD9B4', '#4FA377', '#25664C'], wall: ['#B7E2BF', '#5C9B77'], light: '#FFF8D6', silhouette: 'reeds', note: 'Dense green, the classic aquascape.' },
  minimal: { id: 'minimal', name: 'Minimalist', water: ['#E4EFF0', '#C2D9DE', '#97B9C2'], wall: ['#F1F5F4', '#D2E1E2'], light: '#FFFFFF', silhouette: 'none', note: 'Pale and gallery-like.' },
  stone: { id: 'stone', name: 'Stone', water: ['#AFC0C4', '#78929A', '#4A6068'], wall: ['#9AA7A8', '#5B6A6E'], light: '#EFF6F7', silhouette: 'rocks', note: 'Grey hardscape backdrop.' }
};

export const BACKGROUND_LIST = Object.values(BACKGROUNDS);

export interface SubstrateDef {
  id: SubstrateId;
  name: string;
  base: string;
  shade: string;
  grain: string;
  /** Grain radius in scene units. */
  grainSize: number;
  density: number;
  note: string;
}

export const SUBSTRATES: Record<SubstrateId, SubstrateDef> = {
  'fine-sand': { id: 'fine-sand', name: 'Fine sand', base: '#E3D3AE', shade: '#C8B389', grain: '#F2E7CB', grainSize: 1.6, density: 160, note: 'Soft on barbels. Waste sits on top where you can see it.' },
  gravel: { id: 'gravel', name: 'Gravel', base: '#C4B49A', shade: '#9C8A70', grain: '#DCCDB2', grainSize: 4.4, density: 110, note: 'Classic. Traps debris between the stones.' },
  'dark-gravel': { id: 'dark-gravel', name: 'Dark gravel', base: '#4E4A45', shade: '#332F2C', grain: '#6B655D', grainSize: 4.8, density: 110, note: 'Makes fish colour up. Hides mulm a little too well.' },
  soil: { id: 'soil', name: 'Aquasoil', base: '#3B322B', shade: '#241E19', grain: '#4C4137', grainSize: 3.2, density: 130, note: 'Feeds root plants, clouds if you dig in it.' }
};

export const SUBSTRATE_LIST = Object.values(SUBSTRATES);
