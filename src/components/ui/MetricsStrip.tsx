import type { GameState, Metrics } from '../../types/game';
import { TANKS } from '../../data/tanks';
import { tankConditions } from '../../lib/conditions';

const LABELS: [keyof Metrics, string][] = [
  ['fishHealth', 'Fish'],
  ['waterQuality', 'Water'],
  ['plantHealth', 'Plants'],
  ['stability', 'Balance'],
  ['aesthetics', 'Looks']
];

function tone(value: number): string {
  if (value >= 70) return 'bg-reed';
  if (value >= 40) return 'bg-[#C9A227]';
  return 'bg-coral';
}

/** One thin row — replaces the old tall stacked status panel. */
export function MetricsStrip({ state }: { state: GameState }) {
  const tank = TANKS[state.aquarium.tank].litres;
  const cond = tankConditions(state);

  return (
    <div className="grid gap-x-4 gap-y-2 rounded-lg border border-walnut/12 bg-paper px-4 py-2.5 shadow-panel sm:grid-cols-3 lg:grid-cols-8">
      <div className="min-w-0">
        <p className="text-[11px] text-muted">Water</p>
        <p className="truncate text-[13px] text-ink tabular-nums">{cond.litres}/{tank}L</p>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted">Soil</p>
        <p className="truncate text-[13px] text-ink tabular-nums">{state.substrate ? `${state.substrate.coverage}%` : '—'}</p>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted">Temp</p>
        <p className="truncate text-[13px] text-ink tabular-nums">{Math.round(cond.temperature)}°C</p>
      </div>
      {LABELS.map(([key, label]) => (
        <div key={key} className="min-w-0">
          <div className="flex items-baseline justify-between gap-1">
            <p className="truncate text-[11px] text-muted">{label}</p>
            <p className="text-[12px] text-ink tabular-nums">{state.metrics[key]}</p>
          </div>
          <div className="mt-1 h-[4px] w-full overflow-hidden rounded-full bg-walnut/10">
            <div className={`h-full rounded-full transition-[width] duration-700 ${tone(state.metrics[key])}`} style={{ width: `${state.metrics[key]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}