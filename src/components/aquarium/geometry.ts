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

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}
