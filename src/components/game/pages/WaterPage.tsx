import type { GameState } from '../../../types/game';
import type { ShopTab } from '../ShopModal';
import { WATER_LIST, WATERS } from '../../../data/water';
import { FISH_LIST } from '../../../data/fish';
import { TANKS } from '../../../data/tanks';
import { tankConditions } from '../../../lib/conditions';
import { Panel } from '../../ui/Panel';
import { PageBar } from '../PageBar';

export function WaterPage({ state, onOpenShop, onEndDay }: { state: GameState; onOpenShop: (tab: ShopTab) => void; onEndDay: () => void }) {
  const cond = tankConditions(state);
  const tank = TANKS[state.aquarium.tank];
  const def = state.water ? WATERS[state.water.type] : null;
  const suited = def ? FISH_LIST.filter((f) => f.water === def.type) : [];

  return (
    <div className="space-y-4">
      <PageBar title="Water" onEndDay={onEndDay} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-4">
        <Panel
          title="Your water"
          action={
            <button
              type="button"
              onClick={() => onOpenShop('water')}
              className="rounded-md bg-lagoon-dark px-3 py-1.5 text-[12px] font-medium text-shell transition-colors hover:bg-lagoon"
            >
              Buy water
            </button>
          }
        >
          {state.water && def ? (
            <>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-[22px] text-ink">{def.name}</span>
                <span className="text-[13px] text-muted">{state.water.type === 'salt' ? 'Sea' : 'River'}</span>
              </div>
              <div className="mt-4 h-[8px] w-full overflow-hidden rounded-full bg-walnut/10">
                <div className="h-full rounded-full bg-[#3E97A3]" style={{ width: `${Math.min(100, Math.round(cond.litresPct * 100))}%` }} />
              </div>
              <p className="mt-1.5 text-[12px] text-muted tabular-nums">{cond.litres}/{tank.litres}L filled</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
                <div><dt className="text-muted">pH</dt><dd className="text-ink tabular-nums">{cond.effectivePh.toFixed(1)} <span className="text-muted">(base {def.ph})</span></dd></div>
                <div><dt className="text-muted">Dissolved</dt><dd className="text-ink">{def.tdsLabel}</dd></div>
                <div><dt className="text-muted">Suggested temp</dt><dd className="text-ink tabular-nums">~{def.tempSuggested}°C</dd></div>
                <div><dt className="text-muted">Current temp</dt><dd className="text-ink tabular-nums">{Math.round(cond.temperature)}°C</dd></div>
              </dl>
              <p className="mt-3 text-[13px] leading-relaxed text-walnut-light">{def.note}</p>
            </>
          ) : (
            <div>
              <p className="font-display text-[20px] text-ink">The tank is dry</p>
              <p className="mt-1 text-[13px] text-walnut-light">Pour water first — it decides which fish and plants you can keep. Buy it 20L at a time.</p>
            </div>
          )}
        </Panel>

        <Panel title="Water types compared">
          <div className="grid gap-3 sm:grid-cols-2">
            {WATER_LIST.map((w) => (
              <div key={w.type} className="rounded-lg border border-walnut/12 p-3">
                <p className="font-display text-[15px] text-ink">{w.name} · {w.label}</p>
                <ul className="mt-2 space-y-1 text-[12px] text-walnut-light">
                  <li>pH {w.ph} ({w.phRange[0]}–{w.phRange[1]})</li>
                  <li>{w.tdsLabel}</li>
                  <li>{w.unit}L · ${w.price} per bucket</li>
                </ul>
                <p className="mt-2 text-[12px] text-muted">{w.note}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Fish your water suits">
        {suited.length ? (
          <ul className="space-y-1.5 text-[13px]">
            {suited.map((f) => (
              <li key={f.id} className="flex justify-between">
                <span className="text-ink">{f.name}</span>
                <span className="text-muted tabular-nums">pH {f.phRange[0]}–{f.phRange[1]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] text-muted">Add water and this list fills in with the species that will thrive.</p>
        )}
      </Panel>
      </div>
    </div>
  );
}