export type TankSizeId = 'small' | 'medium' | 'large';
export type BackgroundId =
  | 'clean-blue' | 'dark' | 'tropical' | 'river'
  | 'deep' | 'planted' | 'minimal' | 'stone';
export type SubstrateId = 'fine-sand' | 'gravel' | 'dark-gravel' | 'soil';

export type PlantSpeciesId =
  | 'java-fern' | 'anubias' | 'amazon-sword' | 'vallisneria'
  | 'java-moss' | 'hornwort' | 'duckweed';
export type PlantStage = 'young' | 'growing' | 'mature' | 'overgrown' | 'wilting' | 'dead';
export type PlantForm = 'fern' | 'rosette' | 'ribbon' | 'moss' | 'feather' | 'floating';

export interface PlantSpecies {
  id: PlantSpeciesId;
  name: string;
  form: PlantForm;
  palette: { leaf: string; leafDark: string; stem: string };
  /** Height in scene units at the mature stage. */
  height: number;
  spread: number;
  leaves: number;
  note: string;
}

export interface PlantInstance {
  id: string;
  species: PlantSpeciesId;
  stage: PlantStage;
  health: number;
  /** 0-1 across the tank floor. */
  x: number;
  scale: number;
  seed: number;
}

export type SnailSpeciesId = 'nerite' | 'mystery' | 'ramshorn' | 'trumpet';
export type SnailSurface = 'glass' | 'substrate' | 'plant';

export interface SnailSpecies {
  id: SnailSpeciesId;
  name: string;
  shell: string;
  shellDark: string;
  foot: string;
  size: number;
  coil: 'flat' | 'cone' | 'tall';
  note: string;
}

export interface SnailInstance {
  id: string;
  species: SnailSpeciesId;
  surface: SnailSurface;
  x: number;
  y: number;
  facing: 1 | -1;
}

export type EquipmentCategory = 'filtration' | 'oxygen' | 'temperature' | 'lighting' | 'cleaning' | 'other';
export type EquipmentId =
  | 'internal-filter' | 'sponge-filter' | 'hob-filter' | 'canister-filter'
  | 'air-pump' | 'air-stone' | 'oxygen-regulator' | 'bubble-diffuser'
  | 'heater' | 'thermometer' | 'cooling-fan'
  | 'aquarium-lamp' | 'led-bar'
  | 'algae-scraper' | 'gravel-vacuum' | 'glass-cleaner'
  | 'co2-diffuser' | 'circulation-pump' | 'feeding-ring';
/** Where the asset physically attaches inside the scene. */
export type EquipmentMount = 'back-wall' | 'glass-left' | 'glass-right' | 'substrate' | 'rim' | 'toolbox';

export interface EquipmentDef {
  id: EquipmentId;
  name: string;
  category: EquipmentCategory;
  mount: EquipmentMount;
  price: number;
  note: string;
}

export interface EquipmentInstance {
  id: string;
  def: EquipmentId;
  installed: boolean;
  powered: boolean;
  /** 0-1 along the mount surface. */
  position: number;
  wear: number;
}

export type FoodId = 'flakes' | 'pellets' | 'granules' | 'frozen' | 'live';

export interface FoodDef {
  id: FoodId;
  name: string;
  shape: 'flake' | 'sphere' | 'grain' | 'cube' | 'worm';
  color: string;
  colorDark: string;
  sinkSeconds: number;
  size: number;
  note: string;
}

export interface FoodParticle {
  id: string;
  food: FoodId;
  x: number;
  delay: number;
  spin: number;
}

export interface TankDef {
  id: TankSizeId;
  name: string;
  litres: number;
  glassInset: number;
  capacity: number;
}

export interface AquariumState {
  tank: TankSizeId;
  background: BackgroundId;
  substrate: SubstrateId;
  lightsOn: boolean;
  /** 0-1 visual accumulation layers. */
  algae: number;
  mulm: number;
  glassDirt: number;
  temperatureC: number;
}
