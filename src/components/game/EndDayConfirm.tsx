import type { ActionId, GameState } from '../../types/game';
import { FISH_SPECIES } from '../../data/fish';
import { PLANT_SPECIES } from '../../data/plants';
import { TANKS } from '../../data/tanks';
import { tankConditions } from '../../lib/conditions';

const ROUTINES: { id: ActionId; label: string }[] = [
  { id: 'feed', label: 'Feed the fish' },
  { id: 'water-change', label: 'Change part of the water' },
  { id: 'clean-glass', label: 'Clean the glass' },
  { id: 'check-water', label: 'Test the water' },
  { id: 'adjust-filter', label: 'Check the filter' },
  { id: 'adjust-oxygen', label: 'Check aeration' },
  { id: 'lighting', label: 'Set the lighting' },
  { id: 'plants', label: 'Trim the plants' },
  { id: 'medicine', label: 'Dose medicine if needed' },
  { id: 'equipment', label: 'Service equipment' }
];

export function EndDayConfirm({ state, onConfirm, onClose }: { state: GameState; onConfirm: () => void; onClose: () => void }) {
  const cond = tankConditions(state);
  const done = new Set(state.care.map((c) => c.action));
  const missing = ROUTINES.filter((r) => !done.has(r.id));
  const earnings = 130 + state.fish.length * 6;
  const tank = TANKS[state.aquarium.tank];

  const warnings: string[] = [];
  if (!cond.hasWater) warnings.push('The tank is dry — every fish would be lost overnight. Add water in the shop.');
  else {
    if (cond.litresPct < 0.5) warnings.push(`Only ${cond.litres}/${tank.litres}L of water — fish get stressed below half.`);
    const wrongWater = state.fish.filter((f) => FISH_SPECIES[f.species].water !== cond.waterType);
    if (wrongWater.length) warnings.push(`${wrongWater.length} fish are in the wrong water (${wrongWater.slice(0, 3).map((f) => f.name).join(', ')}).`);
    const wrongPlants = state.plants.filter((p) => p.health > 0 && PLANT_SPECIES[p.species].water !== cond.waterType);
    if (wrongPlants.length) warnings.push(`${wrongPlants.length} plants are in the wrong water and will wither.`);
    const phIssues = state.fish.filter((f) => cond.effectivePh < FISH_SPECIES[f.species].phRange[0] || cond.effectivePh > FISH_SPECIES[f.species].phRange[1]);
    if (phIssues.length) warnings.push(`pH ${cond.effectivePh.toFixed(1)} is outside the comfort range for ${phIssues.length} fish.`);
    const tempIssues = state.fish.filter((f) => cond.temperature < FISH_SPECIES[f.species].tempRange[0] || cond.temperature > FISH_SPECIES[f.species].tempRange[1]);
    if (tempIssues.length) warnings.push(`${Math.round(cond.temperature)}°C is outside the comfort range for ${tempIssues.length} fish.`);
    if (state.fish.length > tank.capacity) warnings.push(`Overstocked: ${state.fish.length} fish in a ${tank.capacity}-fish tank.`);
  }
  if (state.fish.length > 0 && !done.has('feed')) warnings.push('You have not fed the fish today.');

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-walnut-dark/55 p-4" role="dialog" aria-modal="true" aria-label="End day" onClick={onClose}>
      <div className="report-enter flex max-h-[var(--maxh-88)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-walnut/20 bg-paper shadow-tank" onClick={(e) => e.stopPropagation()}>
        <header className="border-b border-walnut/12 px-5 py-4">
          <h2 className="font-display text-[20px] text-ink">End day {state.day}?</h2>
          <p className="text-[12px] text-muted">A quick look at what you have and haven't done before the night runs.</p>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {ROUTINES.map((r) => {
              const ok = done.has(r.id);
              return (
                <div key={r.id} className="flex items-center gap-2 text-[13px]">
                  <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${ok ? 'bg-reed/20 text-reed' : 'bg-walnut/10 text-muted'}`}>
                    {ok ? '✓' : '·'}
                  </span>
                  <span className={ok ? 'text-ink' : 'text-muted'}>{r.label}</span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-[12px] text-muted">
            {missing.length === 0 ? 'Every routine is done. Nice.' : `${missing.length} routine${missing.length === 1 ? '' : 's'} still open — you can still go back.`}
          </p>

          {warnings.length > 0 && (
            <ul className="mt-4 space-y-2 rounded-lg border border-coral/30 bg-coral/8 p-3">
              {warnings.map((w, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-walnut-light">
                  <span className="text-coral" aria-hidden="true">!</span>
                  {w}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-[13px] text-walnut-light">
            Tonight's earnings: <span className="text-ink tabular-nums">+${earnings}</span>
            <span className="text-muted"> (base $130 + $6 × {state.fish.length} fish)</span>
          </p>
        </div>

        <footer className="flex justify-end gap-2 border-t border-walnut/12 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-walnut/20 px-4 py-2 text-[13px] text-walnut-light transition-colors hover:border-walnut/45"
          >
            Not yet
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-lagoon-dark px-4 py-2 font-display text-[14px] text-shell transition-colors hover:bg-lagoon"
          >
            End day & sleep
          </button>
        </footer>
      </div>
    </div>
  );
}