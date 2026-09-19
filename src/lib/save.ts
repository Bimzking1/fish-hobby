import type { GameState } from '../types/game';
import { createInitialState } from '../data/initialState';

export const SAVE_VERSION = 3;
const STORAGE_KEY = 'aquarium-keeper:autosave';

export interface SaveFile {
  version: number;
  savedAt: string;
  game: Pick<GameState, 'started' | 'theme' | 'day' | 'money' | 'metrics' | 'forecast' | 'selectedFood' | 'care' | 'finance' | 'weatherHistory'>;
  tank: GameState['aquarium'];
  water: GameState['water'];
  substrate: GameState['substrate'];
  rocks: GameState['rocks'];
  fish: GameState['fish'];
  plants: GameState['plants'];
  snails: GameState['snails'];
  equipment: GameState['equipment'];
  inventory: GameState['inventory'];
  achievements: GameState['achievements'];
}

export function toSaveFile(state: GameState): SaveFile {
  const { started, theme, day, money, metrics, forecast, selectedFood, care, finance, weatherHistory } = state;
  return {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    game: { started, theme, day, money, metrics, forecast, selectedFood, care, finance, weatherHistory },
    tank: state.aquarium,
    water: state.water,
    substrate: state.substrate,
    rocks: state.rocks,
    fish: state.fish,
    plants: state.plants,
    snails: state.snails,
    equipment: state.equipment,
    inventory: state.inventory,
    achievements: state.achievements
  };
}

/** Unknown or newer saves fall back to a fresh tank rather than crashing. */
export function fromSaveFile(data: unknown): GameState | null {
  if (typeof data !== 'object' || data === null) return null;
  const file = data as Record<string, unknown>;
  const version = typeof file.version === 'number' ? file.version : 0;
  if (version < 2 || version > SAVE_VERSION) return null;
  if (typeof file.game !== 'object' || file.game === null) return null;
  const game = file.game as Partial<SaveFile['game']>;
  const base = createInitialState();
  return {
    ...base,
    ...game,
    aquarium: (file.tank as GameState['aquarium']) ?? base.aquarium,
    water: (file.water as GameState['water']) ?? base.water,
    substrate: (file.substrate as GameState['substrate']) ?? base.substrate,
    rocks: (file.rocks as GameState['rocks']) ?? base.rocks,
    fish: (file.fish as GameState['fish']) ?? base.fish,
    plants: (file.plants as GameState['plants']) ?? base.plants,
    snails: (file.snails as GameState['snails']) ?? base.snails,
    equipment: (file.equipment as GameState['equipment']) ?? base.equipment,
    inventory: (file.inventory as GameState['inventory']) ?? base.inventory,
    achievements: (file.achievements as GameState['achievements']) ?? base.achievements,
    // v3 fields — v2 saves just start empty.
    finance: (game.finance as GameState['finance']) ?? [],
    weatherHistory: (game.weatherHistory as GameState['weatherHistory']) ?? []
  };
}

export function saveToLocalStorage(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSaveFile(state)));
  } catch {
    /* storage can be full or blocked; autosave is best effort */
  }
}

export function loadFromLocalStorage(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? fromSaveFile(JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function downloadSave(state: GameState): string {
  const name = `aquarium-save-day-${state.day}.json`;
  const blob = new Blob([JSON.stringify(toSaveFile(state), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
  return name;
}

export async function readSaveFile(file: File): Promise<GameState | null> {
  try {
    return fromSaveFile(JSON.parse(await file.text()) as unknown);
  } catch {
    return null;
  }
}