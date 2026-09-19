export type TankSizeId = 'small' | 'medium' | 'large';
export type BackgroundId =
  | 'clean-blue' | 'dark' | 'tropical' | 'river'
  | 'deep' | 'planted' | 'minimal' | 'stone';
export type SubstrateId = 'fine-sand' | 'gravel' | 'dark-gravel' | 'soil';

/** The two worlds: river fish + grass plants (fresh), sea fish + coral (salt). */
export type WaterType = 'fresh' | 'salt';

export type PlantSpeciesId =
  | 'java-fern' | 'anubias' | 'amazon-sword' | 'vallisneria'
  | 'java-moss' | 'hornwort' | 'duckweed' | 'coral' | 'seaweed';
export type PlantStage = 'young' | 'growing' | 'mature' | 'overgrown' | 'wilting' | 'dead';
export type PlantForm = 'fern' | 'rosette' | 'ribbon' | 'moss' | 'feather' | 'floating' | 'anemone' | 'kelp';

export interface PlantValues {
  oxygen: number;
  /** Pulls nitrates out of the water. */
  nitrate: number;
  /** Aura that nudges fish health / plant health up. */
  health: number;
  aesthetics: number;
}

export interface PlantSpecies {
  id: PlantSpeciesId;
  name: string;
  form: PlantForm;
  water: WaterType;
  palette: { leaf: string; leafDark: string; stem: string };
  /** Height in scene units at the mature stage. */
  height: number;
  spread: number;
  leaves: number;
  /** 0-100 hit points the plant is born with. */
  maxHp: number;
  /** null = lasts forever as long as conditions are right. */
  lifespanDays: number | null;
  price: number;
  /** Human-readable perks shown in the shop. */
  values: string[];
  /** Daily per-plant ecosystem nudges. */
  effects: PlantValues;
  note: string;
}

export interface PlantInstance {
  id: string;
  species: PlantSpeciesId;
  stage: PlantStage;
  /** Current HP, from 0..maxHp (the species maximum). Drives decay + dying. */
  health: number;
  /** Days a timed plant has left. null for everlasting plants. */
  daysLeft: number | null;
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
  capacity: number;
  glassInset: number;
}

/** A bottle / bucket of water you pour into the tank. Water is metered in litres. */
export interface WaterDef {
  type: WaterType;
  name: string;
  label: WaterLabel;
  ph: number;
  phRange: [number, number];
  tdsLabel: string;
  tempSuggested: number;
  /** Litres added per purchase. */
  unit: number;
  price: number;
  note: string;
}

export type WaterLabel = 'River' | 'Sea';

export interface WaterState {
  type: WaterType;
  /** Filled below the tank's rated litres. */
  litres: number;
}

/** Substrate is bought bag by bag. Each bag covers `bagCoverage` percent. */
export interface SubstrateDef {
  id: SubstrateId;
  name: string;
  water: WaterType | 'any';
  base: string;
  shade: string;
  grain: string;
  /** Grain radius in scene units. */
  grainSize: number;
  density: number;
  bagCoverage: number;
  /** 0-3 nutrient richness for rooted plants. */
  nutrients: number;
  /** Shifts tank pH by this amount. */
  phShift: number;
  price: number;
  note: string;
}

export interface SubstrateState {
  id: SubstrateId;
  /** 0-100 percent of the floor covered. */
  coverage: number;
}

export type RockDefId =
  | 'river-stone' | 'slate' | 'lava-rock' | 'limestone'
  | 'seiryu' | 'coral-rubble' | 'driftwood' | 'cave';
export type RockArt = 'rock' | 'driftwood' | 'cave';
export type RockTone = 'pale' | 'dark' | 'coal';

export interface RockDef {
  id: RockDefId;
  name: string;
  water: WaterType | 'any';
  /** Shifts tank pH. */
  phShift: number;
  /** 0-3 hardness/calcium release. */
  hardness: number;
  /** 0-3 looks. */
  aesthetics: number;
  art: RockArt;
  tone: RockTone;
  price: number;
  note: string;
}

export interface RockInstance {
  id: string;
  def: RockDefId;
  x: number;
  y: number;
  scale: number;
  seed: number;
}

export interface AquariumState {
  tank: TankSizeId;
  background: BackgroundId;
  lightsOn: boolean;
  /** 0-1 visual accumulation layers. */
  algae: number;
  mulm: number;
  glassDirt: number;
  temperatureC: number;
}