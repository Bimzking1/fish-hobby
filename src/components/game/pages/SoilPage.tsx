import type { GameState } from '../../../types/game';
import type { ShopTab } from '../ShopModal';
import { SUBSTRATE_LIST, SUBSTRATES } from '../../../data/substrates';
import { PLANT_LIST } from '../../../data/plants';
import { Panel } from '../../ui/Panel';
import { PageBar } from '../PageBar';

function Dots({ value, max = 3 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < value ? 'bg-reed' : 'bg-walnut/15'}`} />
      ))}
    </span>
  );
}

export function SoilPage({ state, onOpenShop, onEndDay }: { state: GameState; onOpenShop: (tab: ShopTab) => void; onEndDay: () => void }) {
  const current = state.substrate ? SUBSTRATES[state.substrate.id] : null;
  const rootFeeders = PLANT_LIST.filter((p) => p.effects.nitrate >= 2);

  return (
    <div className="space-y-4">
      <PageBar title="Soil" onEndDay={onEndDay} />
      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
      <div className="space-y-4">
        <Panel
          title="Your substrate"
          action={
            <button
              type="button"
              onClick={() => onOpenShop('substrate')}
              className="rounded-md bg-lagoon-dark px-3 py-1.5 text-[12px] font-medium text-shell transition-colors hover:bg-lagoon"
            >
              Buy soil
            </button>
          }
        >
          {current && state.substrate ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="h-7 w-7 rounded-full border border-black/10" style={{ background: `radial-gradient(circle at 35% 35%, ${current.grain}, ${current.base} 70%)` }} />
                <span className="font-display text-[18px] text-ink">{current.name}</span>
              </div>
              <div className="mt-4 h-[8px] w-full overflow-hidden rounded-full bg-walnut/10">
                <div className="h-full rounded-full bg-[#A58B62]" style={{ width: `${state.substrate.coverage}%` }} />
              </div>
              <p className="mt-1.5 text-[12px] text-muted tabular-nums">{state.substrate.coverage}% of the floor covered</p>
              <dl className="mt-4 space-y-2 text-[13px]">
                <div className="flex justify-between"><dt className="text-muted">Nutrients</dt><dd><Dots value={current.nutrients} /></dd></div>
                <div className="flex justify-between"><dt className="text-muted">pH shift</dt><dd className="text-ink tabular-nums">{current.phShift > 0 ? '+' : ''}{current.phShift}</dd></div>
              </dl>
              <p className="mt-3 text-[13px] leading-relaxed text-walnut-light">{current.note}</p>
              {current.water !== 'any' && state.water && current.water !== state.water.type && (
                <p className="mt-3 rounded-md border border-coral/35 bg-coral/8 px-3 py-2 text-[12px] text-walnut-light">
                  This substrate is for {current.water} water, but the tank is {state.water.type}.
                </p>
              )}
            </>
          ) : (
            <p className="text-[13px] text-walnut-light">No substrate yet. Soil gives rooted plants nutrients and gently changes pH. Each bag covers 25% of the floor.</p>
          )}
        </Panel>

        <Panel title="What substrate does">
          <ul className="space-y-2 text-[13px] text-walnut-light">
            <li><span className="text-ink">Nutrients</span> feed rooted plants; floating plants ignore them.</li>
            <li><span className="text-ink">pH shift</span> changes the water chemistry — aquasoil lowers it.</li>
            <li><span className="text-ink">Coverage</span> starts at 0%; stack bags to 100%.</li>
          </ul>
        </Panel>
      </div>

      <Panel title="Shop shelves">
        <div className="grid gap-3 sm:grid-cols-2">
          {SUBSTRATE_LIST.map((s) => (
            <div key={s.id} className="rounded-lg border border-walnut/12 p-3">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full border border-black/10" style={{ background: `radial-gradient(circle at 35% 35%, ${s.grain}, ${s.base} 70%)` }} />
                <p className="font-display text-[15px] text-ink">{s.name}</p>
                <span className="rounded bg-walnut/10 px-1.5 py-0.5 text-[11px] text-walnut-light">{s.water === 'any' ? 'Any water' : s.water === 'fresh' ? 'River' : 'Sea'}</span>
              </div>
              <ul className="mt-2 space-y-1 text-[12px] text-walnut-light">
                <li>+{s.bagCoverage}% coverage · ${s.price}/bag</li>
                <li>Nutrients {s.nutrients}/3 · pH {s.phShift > 0 ? '+' : ''}{s.phShift}</li>
              </ul>
              <p className="mt-2 text-[12px] text-muted">{s.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-muted">
          Root feeders that want rich soil: {rootFeeders.map((p) => p.name).join(', ')}.
        </p>
      </Panel>
      </div>
    </div>
  );
}