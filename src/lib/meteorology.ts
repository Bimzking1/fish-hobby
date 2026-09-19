import type { Forecast, WeatherId } from '../types/game';
import { mulberry32, range } from './rng';

/**
 * A tiny weather model. Given today's forecast and a seed number, it decides
 * tomorrow's weather. Everything is deterministic: the seed comes from the day
 * counter, so the same day always produces the same forecast (and the weather
 * page can show a stable 5-day prediction).
 */

const TEMP_BASE: Record<WeatherId, number> = {
  sunny: 28, hot: 33, cloudy: 24, rain: 22, storm: 24, cold: 14
};

const HUM_BASE: Record<WeatherId, number> = {
  sunny: 55, hot: 48, cloudy: 66, rain: 84, storm: 80, cold: 62
};

/** Weighted next-weather possibilities for each weather. */
const TRANSITIONS: Record<WeatherId, [WeatherId, number][]> = {
  sunny: [['sunny', 2], ['cloudy', 2], ['hot', 1]],
  hot: [['hot', 1], ['sunny', 2], ['storm', 1]],
  cloudy: [['cloudy', 2], ['rain', 2], ['sunny', 1]],
  rain: [['rain', 2], ['cloudy', 2], ['storm', 1]],
  storm: [['storm', 1], ['rain', 2], ['cloudy', 1]],
  cold: [['cold', 1], ['cloudy', 2], ['sunny', 1]]
};

export function nextForecast(current: Forecast, seed: number): Forecast {
  const rng = mulberry32(seed);
  const pool = TRANSITIONS[current.weather];
  const total = pool.reduce((sum, [, w]) => sum + w, 0);
  let draw = range(rng, 0, total);
  let weather: WeatherId = pool[0][0];
  for (const [id, w] of pool) {
    draw -= w;
    if (draw <= 0) { weather = id; break; }
  }
  const temp = Math.round(clampNum(TEMP_BASE[weather] + range(rng, -2, 2), 14, 36));
  const humidity = Math.round(clampNum(HUM_BASE[weather] + range(rng, -6, 6), 20, 98));
  return { weather, temperatureC: temp, humidity, impacts: impactsOf(weather, temp) };
}

export function impactsOf(weather: WeatherId, temp: number): Forecast['impacts'] {
  const drift = Math.abs(temp - 25);
  return [
    {
      label: 'Temperature stress',
      level: temp < 18 && weather === 'cold' ? 'high' : drift >= 5 ? 'medium' : 'low'
    },
    {
      label: 'Evaporation',
      level: weather === 'hot' ? 'high' : temp >= 28 ? 'medium' : weather === 'rain' ? 'low' : 'low'
    },
    {
      label: 'Algae risk',
      level: weather === 'hot' || weather === 'sunny' ? 'medium' : 'low'
    }
  ];
}

/** The 5 upcoming days, starting from today's forecast. Stable per day. */
export function predictForecast(current: Forecast, fromDay: number, ahead = 5): Forecast[] {
  const out: Forecast[] = [current];
  let next = current;
  for (let i = 1; i < ahead; i += 1) {
    next = nextForecast(next, fromDay * 31 + i * 991);
    out.push(next);
  }
  return out;
}

function clampNum(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}