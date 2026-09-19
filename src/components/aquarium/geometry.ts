/** One shared coordinate system for every asset in the scene. */
export const SCENE = {
  width: 1000,
  height: 600,
  /** Water surface line. */
  surfaceY: 46,
  /** Top of the substrate mound. */
  floorY: 512,
  /** Inner glass margin. */
  wallX: 18
} as const;

export const WATER_TOP = SCENE.surfaceY;
export const WATER_BOTTOM = SCENE.floorY;

/** Vertical band a fish is allowed to swim in, as scene y values. */
export function zoneBand(zone: 'top' | 'mid' | 'bottom' | 'any'): [number, number] {
  switch (zone) {
    case 'top': return [WATER_TOP + 34, WATER_TOP + 150];
    case 'mid': return [WATER_TOP + 110, WATER_BOTTOM - 150];
    case 'bottom': return [WATER_BOTTOM - 110, WATER_BOTTOM - 26];
    default: return [WATER_TOP + 60, WATER_BOTTOM - 70];
  }
}

/**
 * Where the substrate bed tops out, by coverage. More soil raises the bed —
 * it fills from the bottom of the tank upward — so anything that stands in the
 * soil (rocks, rooted plants) sits on this line and rises with it:
 *   0% -> bare glass (deepest line), 100% -> full bed (SCENE.floorY).
 */
export function bedSurface(coverage: number): number {
  return SCENE.floorY + 24 - (24 * coverage) / 100;
}

/** The current waterline, by how full the tank is (0..1). */
export function waterSurface(level: number): number {
  return lerp(SCENE.floorY, SCENE.surfaceY, clamp(level, 0, 1));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}
