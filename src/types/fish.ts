import type { WaterType } from './aquarium';

export type FishSpeciesId =
  | 'guppy' | 'goldfish' | 'betta' | 'neon-tetra'
  | 'molly' | 'platy' | 'angelfish' | 'corydoras'
  | 'clownfish' | 'blue-tang' | 'royal-gramma' | 'firefish';

/** Visual + behavioural state of a single fish. */
export type FishCondition = 'healthy' | 'stressed' | 'sick' | 'fungus' | 'critical' | 'dead';

export type SwimStyle = 'dart' | 'glide' | 'flutter' | 'school' | 'graze' | 'drift';
export type SwimZone = 'top' | 'mid' | 'bottom' | 'any';
export type FishPattern = 'plain' | 'stripes' | 'bands' | 'spots' | 'neon' | 'mottle';

export interface FishPalette { body: string; belly: string; fin: string; accent: string }

/** Parametric silhouette. Paths are drawn in a 100x60 local box, nose at x=0. */
export interface FishShape {
  body: string;
  tail: string;
  dorsal: string;
  anal: string;
  pectoral: string;
  eye: { x: number; y: number; r: number };
}

export interface FishSpecies {
  id: FishSpeciesId;
  name: string;
  latin: string;
  /** Fresh = river fish, salt = sea fish. Must match the tank water or it stresses. */
  water: WaterType;
  /** Preferred pH band. The tank pH is derived from the water base + substrate + rocks. */
  phRange: [number, number];
  /** Preferred Celsius band. Mismatches stress the fish. */
  tempRange: [number, number];
  /** Rendered length in scene units (tank is 1000 wide). */
  length: number;
  palette: FishPalette;
  pattern: FishPattern;
  shape: FishShape;
  swim: SwimStyle;
  /** Seconds for one lap of the tank. Lower is faster. */
  lapSeconds: number;
  schooling: boolean;
  zone: SwimZone;
  finOpacity: number;
  price: number;
  note: string;
}

export interface FishInstance {
  id: string;
  name: string;
  species: FishSpeciesId;
  condition: FishCondition;
  health: number;
  happiness: number;
  ageDays: number;
  /** 0-1, staggers the swim animation. */
  phase: number;
  /** 0-1 depth inside the fish's zone. */
  depth: number;
  scale: number;
}
