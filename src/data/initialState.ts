import type { GameState } from '../types/game';

/** Starting tank. The next agent can replace this with a real new-game builder. */
export function createInitialState(): GameState {
  return {
    day: 42,
    money: 1240,
    metrics: { fishHealth: 94, waterQuality: 91, plantHealth: 88, stability: 93, aesthetics: 86 },
    aquarium: {
      tank: 'large',
      background: 'planted',
      substrate: 'gravel',
      lightsOn: true,
      algae: 0.22,
      mulm: 0.3,
      glassDirt: 0.18,
      temperatureC: 26
    },
    fish: [
      { id: 'f1', name: 'Blue', species: 'neon-tetra', condition: 'healthy', health: 96, happiness: 92, ageDays: 120, phase: 0.05, depth: 0.42, scale: 1 },
      { id: 'f2', name: 'Pip', species: 'neon-tetra', condition: 'healthy', health: 94, happiness: 90, ageDays: 118, phase: 0.12, depth: 0.5, scale: 0.96 },
      { id: 'f3', name: 'Dot', species: 'neon-tetra', condition: 'stressed', health: 78, happiness: 61, ageDays: 96, phase: 0.2, depth: 0.58, scale: 0.94 },
      { id: 'f4', name: 'Milo', species: 'guppy', condition: 'healthy', health: 92, happiness: 88, ageDays: 210, phase: 0.34, depth: 0.3, scale: 1 },
      { id: 'f5', name: 'Sunny', species: 'platy', condition: 'healthy', health: 90, happiness: 85, ageDays: 160, phase: 0.55, depth: 0.46, scale: 1 },
      { id: 'f6', name: 'Luna', species: 'betta', condition: 'sick', health: 64, happiness: 52, ageDays: 300, phase: 0.68, depth: 0.36, scale: 1 },
      { id: 'f7', name: 'Ash', species: 'molly', condition: 'healthy', health: 88, happiness: 84, ageDays: 240, phase: 0.78, depth: 0.62, scale: 1 },
      { id: 'f8', name: 'Kite', species: 'angelfish', condition: 'healthy', health: 91, happiness: 80, ageDays: 400, phase: 0.45, depth: 0.5, scale: 1 },
      { id: 'f9', name: 'Scout', species: 'corydoras', condition: 'healthy', health: 93, happiness: 87, ageDays: 190, phase: 0.6, depth: 0.7, scale: 1 },
      { id: 'f10', name: 'Nub', species: 'corydoras', condition: 'fungus', health: 58, happiness: 44, ageDays: 150, phase: 0.86, depth: 0.8, scale: 0.95 },
      { id: 'f11', name: 'Comet', species: 'goldfish', condition: 'healthy', health: 89, happiness: 82, ageDays: 520, phase: 0.24, depth: 0.55, scale: 1 }
    ],
    plants: [
      { id: 'p1', species: 'amazon-sword', stage: 'mature', health: 92, x: 0.08, scale: 1, seed: 3 },
      { id: 'p2', species: 'vallisneria', stage: 'overgrown', health: 88, x: 0.2, scale: 1, seed: 11 },
      { id: 'p3', species: 'java-fern', stage: 'mature', health: 90, x: 0.36, scale: 1, seed: 19 },
      { id: 'p4', species: 'anubias', stage: 'growing', health: 84, x: 0.5, scale: 1, seed: 27 },
      { id: 'p5', species: 'java-moss', stage: 'mature', health: 80, x: 0.62, scale: 1, seed: 33 },
      { id: 'p6', species: 'hornwort', stage: 'growing', health: 86, x: 0.78, scale: 1, seed: 41 },
      { id: 'p7', species: 'vallisneria', stage: 'wilting', health: 48, x: 0.9, scale: 0.9, seed: 47 },
      { id: 'p8', species: 'duckweed', stage: 'mature', health: 76, x: 0.3, scale: 1, seed: 53 },
      { id: 'p9', species: 'duckweed', stage: 'young', health: 70, x: 0.72, scale: 1, seed: 59 }
    ],
    snails: [
      { id: 's1', species: 'nerite', surface: 'glass', x: 180, y: 300, facing: 1 },
      { id: 's2', species: 'mystery', surface: 'substrate', x: 620, y: 508, facing: -1 },
      { id: 's3', species: 'ramshorn', surface: 'glass', x: 860, y: 240, facing: 1 },
      { id: 's4', species: 'trumpet', surface: 'substrate', x: 320, y: 516, facing: 1 }
    ],
    equipment: [
      { id: 'e1', def: 'heater', installed: true, powered: true, position: 0, wear: 0.2 },
      { id: 'e2', def: 'thermometer', installed: true, powered: true, position: 0.6, wear: 0 },
      { id: 'e3', def: 'hob-filter', installed: true, powered: true, position: 0.86, wear: 0.35 },
      { id: 'e4', def: 'air-stone', installed: true, powered: true, position: 0.24, wear: 0.1 },
      { id: 'e5', def: 'led-bar', installed: true, powered: true, position: 0.5, wear: 0.05 },
      { id: 'e6', def: 'co2-diffuser', installed: true, powered: true, position: 0.2, wear: 0.1 },
      { id: 'e7', def: 'circulation-pump', installed: true, powered: true, position: 0.9, wear: 0.15 },
      { id: 'e8', def: 'feeding-ring', installed: true, powered: false, position: 0.3, wear: 0 },
      { id: 'e9', def: 'gravel-vacuum', installed: true, powered: false, position: 0, wear: 0 },
      { id: 'e10', def: 'algae-scraper', installed: true, powered: false, position: 0, wear: 0 }
    ],
    inventory: [
      { id: 'i1', name: 'Flake food', qty: 12 },
      { id: 'i2', name: 'Frozen bloodworm', qty: 4 },
      { id: 'i3', name: 'Water conditioner', qty: 2 },
      { id: 'i4', name: 'Antifungal treatment', qty: 1 }
    ],
    achievements: [
      { id: 'a1', name: 'First month', description: 'Keep the tank running for 30 days.', unlockedOnDay: 30 },
      { id: 'a2', name: 'Cycled', description: 'Hold water quality above 90 for a week.', unlockedOnDay: 38 },
      { id: 'a3', name: 'Aquascaper', description: 'Grow six plants to mature.', unlockedOnDay: null }
    ],
    forecast: {
      weather: 'hot',
      temperatureC: 29,
      humidity: 78,
      impacts: [
        { label: 'Temperature stress', level: 'medium' },
        { label: 'Evaporation', level: 'high' },
        { label: 'Algae risk', level: 'medium' }
      ]
    },
    selectedFood: 'flakes',
    care: []
  };
}
