import type { GameState } from '../types/game';
import { createInitialState } from '../data/initialState';

export const SAVE_VERSION = 1;
const STORAGE_KEY = 'aquarium-keeper:autosave';

export interface SaveFile {
  version: number;
  savedAt: string;
  game: Pick<GameState, 'day' | 'money' | 'metrics' | 'forecast' | 'selectedFood' | 'care'>;
  tank: GameState['aquarium'];
  fish: GameState['fish'];
  plants: GameState['plants'];
  snails: GameState['snails'];
  equipment: GameState['equipment'];
  inventory: GameState['inventory'];
  achievements: GameState['achievements'];
}

export function toSaveFile(state: GameState): SaveFile {
  const { day, money, metrics, forecast, selectedFood, care } = state;
  return {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    game: { day, money, metrics, forecast, selectedFood, care },
    tank: state.aquarium,
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
  const file = data as Partial<SaveFile>;
  if (file.version !== SAVE_VERSION || !file.game || !file.tank) return null;
  const base = createInitialState();
  return {
    ...base,
    ...file.game,
    aquarium: file.tank,
    fish: file.fish ?? base.fish,
    plants: file.plants ?? base.plants,
    snails: file.snails ?? base.snails,
    equipment: file.equipment ?? base.equipment,
    inventory: file.inventory ?? base.inventory,
    achievements: file.achievements ?? base.achievements
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
