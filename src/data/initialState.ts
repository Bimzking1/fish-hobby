import type { GameState, Theme } from '../types/game';

/**
 * Day 1, empty tank. Nothing to start with — the player builds the whole
 * ecosystem from the shop: water first, then substrate, rocks, plants, fish.
 */
export function createInitialState(
  opts: { started?: boolean; theme?: Theme } = {}
): GameState {
  return {
    started: opts.started ?? true,
    theme: opts.theme ?? 'dark',
    day: 1,
    money: 300,
    metrics: { fishHealth: 0, waterQuality: 0, plantHealth: 0, stability: 0, aesthetics: 5 },
    aquarium: {
      tank: 'large',
      background: 'clean-blue',
      lightsOn: true,
      algae: 0,
      mulm: 0,
      glassDirt: 0,
      temperatureC: 25
    },
    water: null,
    substrate: null,
    rocks: [],
    fish: [],
    plants: [],
    snails: [],
    equipment: [],
    inventory: [],
    achievements: [
      { id: 'a1', name: 'Wet start', description: 'Pour your first litres of water.', unlockedOnDay: null },
      { id: 'a2', name: 'Beat the odds', description: 'Keep every fish alive for 10 days.', unlockedOnDay: null },
      { id: 'a3', name: 'Aquascaper', description: 'Keep six plants above half health.', unlockedOnDay: null }
    ],
    forecast: {
      weather: 'sunny',
      temperatureC: 29,
      humidity: 60,
      impacts: [
        { label: 'Temperature stress', level: 'low' },
        { label: 'Evaporation', level: 'low' },
        { label: 'Algae risk', level: 'low' }
      ]
    },
    selectedFood: 'flakes',
    care: [],
    finance: [],
    weatherHistory: []
  };
}