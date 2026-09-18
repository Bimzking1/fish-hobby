import type { DailyReport, GameState, MetricId, Metrics } from '../types/game';
import { clamp } from '../components/aquarium/geometry';

/**
 * STUB. The whole day-to-day model lives behind this one function so the next
 * agent can replace the body without touching any component.
 *
 * Contract: pure. Takes the state at the end of a day, returns the next day's
 * state plus the report the UI shows. No randomness that isn't seeded here.
 */
export function endDay(state: GameState): { state: GameState; report: DailyReport } {
  const before: Metrics = { ...state.metrics };
  const fed = state.care.some((c) => c.action === 'feed');
  const cleaned = state.care.some((c) => c.action === 'clean-glass' || c.action === 'water-change');

  const drift: Record<MetricId, number> = {
    fishHealth: fed ? 1 : -3,
    waterQuality: cleaned ? 4 : -3,
    plantHealth: state.aquarium.lightsOn ? 2 : -2,
    stability: cleaned ? 1 : -2,
    aesthetics: cleaned ? 3 : -2
  };

  const after = Object.fromEntries(
    (Object.keys(before) as MetricId[]).map((k) => [k, Math.round(clamp(before[k] + drift[k]))])
  ) as Metrics;

  const lines: DailyReport['lines'] = [
    { tone: fed ? 'good' : 'bad', text: fed ? 'Fish were fed and stayed active.' : 'Nobody was fed today.' },
    { tone: after.plantHealth >= before.plantHealth ? 'good' : 'warn', text: after.plantHealth >= before.plantHealth ? 'Plants put on new growth.' : 'Plants lost a little colour.' },
    { tone: cleaned ? 'good' : 'warn', text: cleaned ? 'Maintenance kept nitrate in check.' : 'Nitrate crept up overnight.' },
    { tone: state.aquarium.algae > 0.3 ? 'warn' : 'good', text: state.aquarium.algae > 0.3 ? 'Algae spread on the back glass.' : 'Glass stayed clear.' }
  ];

  const earnings = 80;

  return {
    state: {
      ...state,
      day: state.day + 1,
      money: state.money + earnings,
      metrics: after,
      care: [],
      aquarium: {
        ...state.aquarium,
        algae: clamp(state.aquarium.algae + (cleaned ? -0.1 : 0.05), 0, 1),
        mulm: clamp(state.aquarium.mulm + (cleaned ? -0.12 : 0.04), 0, 1),
        glassDirt: clamp(state.aquarium.glassDirt + (cleaned ? -0.15 : 0.03), 0, 1)
      }
    },
    report: { fromDay: state.day, toDay: state.day + 1, lines, before, after, earnings }
  };
}
