import { useState } from 'react';
import type { GameState } from '../../types/game';
import type { WaterType, WaterLabel, SubstrateId, RockDefId, PlantSpeciesId, EquipmentId } from '../../types/aquarium';
import type { FishSpeciesId } from '../../types/fish';
import { FISH_SPECIES, FISH_LIST } from '../../data/fish';
import { PLANT_LIST } from '../../data/plants';
import { WATER_LIST } from '../../data/water';
import { SUBSTRATE_LIST } from '../../data/substrates';
import { ROCK_LIST } from '../../data/rocks';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { TANKS } from '../../data/tanks';
import { FishBody } from '../aquarium/Fish';
import { PlantIcon } from '../aquarium/Plant';
import { EquipmentIcon } from '../aquarium/Equipment';
import { tankConditions } from '../../lib/conditions';

interface Props {
  state: GameState;
  initialTab?: TabId;
  onBuyWater: (type: WaterType) => void;
  onBuySubstrate: (id: SubstrateId) => void;
  onBuyRock: (id: RockDefId) => void;
  onBuyPlant: (id: PlantSpeciesId) => void;
  onBuyFish: (id: FishSpeciesId) => void;
  onBuyEquipment: (id: EquipmentId) => void;
  onClose: () => void;
}

type TabId = 'water' | 'substrate' | 'rocks' | 'plants' | 'fish' | 'equipment';
export type ShopTab = TabId;

const TABS: { id: TabId; label: string }[] = [
  { id: 'water', label: 'Water' },
  { id: 'substrate', label: 'Soil' },
  { id: 'rocks', label: 'Rocks' },
  { id: 'plants', label: 'Plants' },
  { id: 'fish', label: 'Fish' },
  { id: 'equipment', label: 'Equipment' }
];

interface PendingBuy {
  title: string;
  price: number;
  details: string[];
  contrary: string | null;
  action: () => void;
}

/** The little river/sea pill. */
export function WaterTag({ label, className = '' }: { label: WaterLabel | WaterType | 'any'; className?: string }) {
  const isSalt = label === 'salt' || label === 'Sea';
  const base = `inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ${className}`;
  if (label === 'any') {
    return <span className={`${base} bg-walnut/10 text-walnut-light`}>Any water</span>;
  }
  return (
    <span className={`${base} ${isSalt ? 'bg-[#1D4D6E]/15 text-[#1D4D6E] dark:text-[#8FD3F0]' : 'bg-[#2F7E3F]/15 text-[#2B6E38] dark:text-[#8FE0A0]'}`}>
      {label === 'salt' ? 'Sea' : label === 'fresh' ? 'River' : label}
    </span>
  );
}

function Dots({ value, max = 3 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1" title={`${value}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < value ? 'bg-reed' : 'bg-walnut/15'}`} />
      ))}
    </span>
  );
}

function PhShift({ shift }: { shift: number }) {
  if (shift === 0) return <span className="text-muted">neutral</span>;
  return (
    <span className={shift > 0 ? 'text-[#B4532A] dark:text-[#F0A878]' : 'text-[#2B6E9B] dark:text-[#8FD3F0]'}>
      {shift > 0 ? '+' : ''}{shift.toFixed(1)} pH
    </span>
  );
}

function BuyButton({ label, onClick, disabled = false }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 rounded-md bg-lagoon-dark px-3 py-1.5 text-[12px] font-medium text-shell transition-colors hover:bg-lagoon disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}

export function ShopModal({ state, initialTab = 'water', onBuyWater, onBuySubstrate, onBuyRock, onBuyPlant, onBuyFish, onBuyEquipment, onClose }: Props) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const [pending, setPending] = useState<PendingBuy | null>(null);
  const tank = TANKS[state.aquarium.tank];
  const litres = state.water?.litres ?? 0;
  const cond = tankConditions(state);

  const request = (buy: PendingBuy) => setPending(buy);
  const confirm = () => {
    pending?.action();
    setPending(null);
  };

  const wrongWater = (water: WaterType | 'any'): string | null => {
    if (water === 'any' || !cond.hasWater || water === cond.waterType) return null;
    const mine = cond.waterType === 'salt' ? 'sea' : 'river';
    const theirs = water === 'salt' ? 'sea' : 'river';
    return `This is for ${theirs} water, but your tank is ${mine} water. It may get sick or die. Buy it anyway?`;
  };

  const fishWaterOk = (spp: (typeof FISH_SPECIES)[FishSpeciesId]): 'ok' | 'bad' | 'dry' =>
    cond.hasWater ? (spp.water === cond.waterType ? 'ok' : 'bad') : 'dry';

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-walnut-dark/50 p-4" role="dialog" aria-modal="true" aria-label="Shop" onClick={onClose}>
      <div
        className="report-enter relative flex h-max max-h-[var(--maxh-90)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-walnut/20 bg-paper shadow-tank"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-3 border-b border-walnut/12 px-5 py-3">
          <div>
            <h2 className="font-display text-[20px] text-ink">Aquarium shop</h2>
            <p className="text-[12px] text-muted">
              Water {litres}/{tank.litres}L {state.water ? (state.water.type === 'salt' ? '· Sea' : '· River') : '· dry tank'}
              {state.substrate ? ` · soil ${state.substrate.coverage}%` : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[18px] text-ink tabular-nums">${state.money.toLocaleString()}</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-2.5 py-1 text-[15px] text-muted transition-colors hover:bg-walnut/10 hover:text-ink"
              aria-label="Close shop"
            >
              ✕
            </button>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-walnut/10 px-3 py-2" aria-label="Shop categories">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id); setPending(null); }}
              className={`rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                tab === t.id ? 'bg-lagoon/12 text-lagoon-dark' : 'text-muted hover:bg-walnut/8 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {tab === 'water' && (
            <div className="grid gap-3 md:grid-cols-2">
              {WATER_LIST.map((w) => {
                const suited = FISH_LIST.filter((f) => f.water === w.type);
                const filled = state.water?.type === w.type && litres >= tank.litres;
                const switching = state.water !== null && state.water.type !== w.type;
                const stock = state.fish.length + state.plants.length;
                return (
                  <section key={w.type} className="rounded-lg border border-walnut/12 p-4">
                    <header className="flex items-center gap-2">
                      <h3 className="font-display text-[16px] text-ink">{w.name}</h3>
                      <WaterTag label={w.label} />
                    </header>
                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]">
                      <div><dt className="text-muted">pH</dt><dd className="tabular-nums text-ink">{w.ph} · {w.phRange[0]}–{w.phRange[1]}</dd></div>
                      <div><dt className="text-muted">Dissolved</dt><dd className="text-ink">{w.tdsLabel}</dd></div>
                      <div><dt className="text-muted">Temp</dt><dd className="tabular-nums text-ink">~{w.tempSuggested}°C</dd></div>
                      <div><dt className="text-muted">Adds</dt><dd className="text-ink">{w.unit}L per bucket</dd></div>
                    </dl>
                    <p className="mt-3 text-[13px] leading-relaxed text-walnut-light">{w.note}</p>
                    <p className="mt-2 text-[12px] text-muted">
                      Suits {suited.slice(0, 4).map((f) => f.name).join(', ')}
                      {suited.length > 4 ? ` +${suited.length - 4} more` : ''}
                    </p>
                    <footer className="mt-4 flex items-center justify-between">
                      <span className="text-[12px] text-muted">{filled ? 'Tank is full' : `+${w.unit}L`}</span>
                      <BuyButton
                        label={`$${w.price} · +${w.unit}L`}
                        disabled={filled}
                        onClick={() =>
                          request({
                            title: w.name,
                            price: w.price,
                            details: [`Adds ${w.unit}L (now ${litres}/${tank.litres}L)`, `pH ${w.ph}`, w.tdsLabel],
                            contrary: switching && stock > 0
                              ? `Switching to ${w.name.toLowerCase()} will shock the ${stock} fish/plants already living in ${state.water?.type === 'salt' ? 'sea' : 'river'} water. They are not compatible. Buy anyway?`
                              : null,
                            action: () => onBuyWater(w.type)
                          })
                        }
                      />
                    </footer>
                  </section>
                );
              })}
            </div>
          )}

          {tab === 'substrate' && (
            <div className="grid gap-3 md:grid-cols-2">
              {SUBSTRATE_LIST.map((s) => (
                <section key={s.id} className="rounded-lg border border-walnut/12 p-4">
                  <header className="flex items-center gap-2">
                    <span
                      className="h-5 w-5 shrink-0 rounded-full border border-black/10"
                      style={{ background: `radial-gradient(circle at 35% 35%, ${s.grain}, ${s.base} 70%)` }}
                    />
                    <h3 className="font-display text-[16px] text-ink">{s.name}</h3>
                    <WaterTag label={s.water} />
                  </header>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]">
                    <div><dt className="text-muted">Nutrients</dt><dd><Dots value={s.nutrients} /></dd></div>
                    <div><dt className="text-muted">pH shift</dt><dd><PhShift shift={s.phShift} /></dd></div>
                    <div><dt className="text-muted">Coverage</dt><dd className="text-ink">+{s.bagCoverage}% per bag</dd></div>
                    <div><dt className="text-muted">Now</dt><dd className="text-ink">{state.substrate ? `${state.substrate.coverage}%` : 'empty floor'}</dd></div>
                  </dl>
                  <p className="mt-3 text-[13px] leading-relaxed text-walnut-light">{s.note}</p>
                  <footer className="mt-4 flex items-center justify-between">
                    <span className="text-[12px] text-muted">bag ×{state.substrate && state.substrate.id === s.id ? Math.ceil(state.substrate.coverage / s.bagCoverage) : 0} owned</span>
                    <BuyButton
                      label={`$${s.price} · +${s.bagCoverage}%`}
                      disabled={state.substrate?.coverage === 100}
                      onClick={() =>
                        request({
                          title: s.name,
                          price: s.price,
                          details: [`Covers +${s.bagCoverage}%`, `Nutrients ${s.nutrients}/3`, `pH shift ${s.phShift > 0 ? '+' : ''}${s.phShift}`],
                          contrary: wrongWater(s.water),
                          action: () => onBuySubstrate(s.id)
                        })
                      }
                    />
                  </footer>
                </section>
              ))}
            </div>
          )}

          {tab === 'rocks' && (
            <div className="grid gap-3 md:grid-cols-2">
              {ROCK_LIST.map((r) => (
                <section key={r.id} className="rounded-lg border border-walnut/12 p-4">
                  <header className="flex items-center gap-2">
                    <span className={`h-5 w-5 shrink-0 rounded-full ${r.tone === 'pale' ? 'bg-[#9E948A]' : r.tone === 'dark' ? 'bg-[#5C5952]' : 'bg-[#332F2C]'}`} />
                    <h3 className="font-display text-[16px] text-ink">{r.name}</h3>
                    <WaterTag label={r.water} />
                  </header>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px]">
                    <div><dt className="text-muted">pH shift</dt><dd><PhShift shift={r.phShift} /></dd></div>
                    <div><dt className="text-muted">Hardness</dt><dd><Dots value={r.hardness} /></dd></div>
                    <div><dt className="text-muted">Looks</dt><dd><Dots value={r.aesthetics} /></dd></div>
                    <div><dt className="text-muted">Owned</dt><dd className="text-ink">{state.rocks.filter((x) => x.def === r.id).length}</dd></div>
                  </dl>
                  <p className="mt-3 text-[13px] leading-relaxed text-walnut-light">{r.note}</p>
                  <footer className="mt-4 flex items-center justify-between">
                    <span className="text-[12px] text-muted">{state.rocks.length}/8 pieces placed</span>
                    <BuyButton
                      label={`$${r.price}`}
                      disabled={state.rocks.length >= 8}
                      onClick={() =>
                        request({
                          title: r.name,
                          price: r.price,
                          details: [`pH shift ${r.phShift > 0 ? '+' : ''}${r.phShift}`, `Hardness ${r.hardness}/3`, `Looks ${r.aesthetics}/3`],
                          contrary: wrongWater(r.water),
                          action: () => onBuyRock(r.id)
                        })
                      }
                    />
                  </footer>
                </section>
              ))}
            </div>
          )}

          {tab === 'plants' && (
            <>
              {!state.substrate && (
                <p className="mb-3 rounded-md border border-coral/30 bg-coral/8 px-3 py-2 text-[12px] text-walnut-light">
                  Plants need soil to root in — buy a bag from the Soil shelf first.
                </p>
              )}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PLANT_LIST.map((p) => {
                const ok = cond.hasWater ? (p.water === cond.waterType ? 'ok' : 'bad') : 'dry';
                return (
                  <section key={p.id} className="rounded-lg border border-walnut/12 p-3">
                    <div className="flex gap-3">
                      <div className={`h-16 w-12 shrink-0 ${ok === 'bad' ? 'opacity-50' : ''}`}>
                        <PlantIcon species={p.id} stage="mature" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[15px] text-ink">{p.name}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <WaterTag label={p.water} />
                          {ok === 'bad' && <span className="text-[11px] font-medium text-coral">Wrong water!</span>}
                        </div>
                        <p className="mt-1 text-[12px] text-muted">
                          {p.lifespanDays === null ? 'Everlasting' : `Lasts ${p.lifespanDays} days`} · {p.maxHp} HP
                        </p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {p.values.map((v, i) => (
                        <li key={i} className="flex gap-1.5 text-[12px] text-walnut-light">
                          <span className="text-reed">+</span>{v}
                        </li>
                      ))}
                    </ul>
                    <footer className="mt-3 flex items-center justify-between border-t border-walnut/8 pt-3">
                      <span className={`text-[12px] ${state.substrate ? 'text-muted' : 'font-medium text-coral'}`}>
                        {state.substrate
                          ? (p.effects.nitrate > 0 ? `Nitrate −${p.effects.nitrate}` : 'No nitrate pull')
                          : 'Needs soil first'}
                      </span>
                      <BuyButton
                        label={`$${p.price}`}
                        disabled={state.plants.length >= 20 || !state.substrate}
                        onClick={() =>
                          request({
                            title: p.name,
                            price: p.price,
                            details: [p.water === 'salt' ? 'Sea plant' : 'River plant', p.lifespanDays === null ? 'Everlasting' : `Lives ${p.lifespanDays} days`, `${p.maxHp} HP`],
                            contrary: wrongWater(p.water),
                            action: () => onBuyPlant(p.id)
                          })
                        }
                      />
                    </footer>
                  </section>
                );
              })}
              </div>
            </>
          )}

          {tab === 'fish' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {FISH_LIST.map((spp) => {
                const ok = fishWaterOk(spp);
                const owned = state.fish.filter((f) => f.species === spp.id).length;
                const room = owned >= tank.capacity;
                return (
                  <section key={spp.id} className={`rounded-lg border p-3 ${ok === 'bad' ? 'border-coral/40' : 'border-walnut/12'}`}>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 120 60" className="h-10 w-16 shrink-0" aria-hidden="true">
                        <FishBody species={spp.id} uid={`shop-${spp.id}`} />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[15px] text-ink">{spp.name}</h3>
                        <p className="text-[12px] italic text-muted">{spp.latin}</p>
                      </div>
                      <WaterTag label={spp.water} />
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[12px]">
                      <div><dt className="text-muted">pH</dt><dd className="tabular-nums text-ink">{spp.phRange[0]}–{spp.phRange[1]}</dd></div>
                      <div><dt className="text-muted">Temp</dt><dd className="tabular-nums text-ink">{spp.tempRange[0]}–{spp.tempRange[1]}°C</dd></div>
                    </dl>
                    <p className="mt-2 text-[12px] text-muted">
                      {spp.schooling ? 'Schools — keep 3+ together. ' : ''}
                      {owned > 0 ? `${owned} in this tank. ` : ''}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-walnut-light">{spp.note}</p>
                    <footer className="mt-3 flex items-center justify-between">
                      <span className={`text-[12px] ${ok === 'bad' ? 'text-coral' : ok === 'dry' ? 'text-[#9A7B1E]' : 'text-reed'}`}>
                        {ok === 'bad' ? `Needs ${spp.water === 'salt' ? 'sea' : 'river'} water` : ok === 'dry' ? 'Tank is dry!' : 'Fits your water'}
                      </span>
                      {ok === 'dry' ? (
                        <span className="shrink-0 rounded-md border border-walnut/20 px-3 py-1.5 text-[12px] text-muted">Add water first</span>
                      ) : (
                        <BuyButton
                          label={`$${spp.price}`}
                          disabled={room}
                          onClick={() =>
                            request({
                              title: spp.name,
                              price: spp.price,
                              details: [spp.water === 'salt' ? 'Sea fish' : 'River fish', `pH ${spp.phRange[0]}–${spp.phRange[1]}`, `Temp ${spp.tempRange[0]}–${spp.tempRange[1]}°C`],
                              contrary: ok === 'bad' ? wrongWater(spp.water) : null,
                              action: () => onBuyFish(spp.id)
                            })
                          }
                        />
                      )}
                    </footer>
                  </section>
                );
              })}
            </div>
          )}

          {tab === 'equipment' && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EQUIPMENT_LIST.map((e) => {
                const installed = state.equipment.some((x) => x.def === e.id);
                return (
                  <section key={e.id} className="rounded-lg border border-walnut/12 p-3">
                    <div className="flex gap-3">
                      <div className="h-14 w-14 shrink-0">
                        <EquipmentIcon id={e.id} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[15px] text-ink">{e.name}</h3>
                        <p className="text-[12px] capitalize text-muted">{e.category}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-walnut-light">{e.note}</p>
                    <footer className="mt-3 flex items-center justify-between border-t border-walnut/8 pt-3">
                      <span className="text-[12px] text-muted">{installed ? 'Installed' : 'Not in tank'}</span>
                      {installed ? (
                        <span className="rounded-md bg-reed/10 px-3 py-1.5 text-[12px] font-medium text-reed">Owned</span>
                      ) : (
                        <BuyButton
                          label={`$${e.price}`}
                          onClick={() =>
                            request({
                              title: e.name,
                              price: e.price,
                              details: [e.category, e.note],
                              contrary: null,
                              action: () => onBuyEquipment(e.id)
                            })
                          }
                        />
                      )}
                    </footer>
                  </section>
                );
              })}
            </div>
          )}
        </div>

        {pending && (
          <div className="fixed inset-0 z-[60] grid place-items-center bg-walnut-dark/55 p-4" role="alertdialog" aria-modal="true" aria-label="Confirm purchase" onClick={() => setPending(null)}>
            <div className="report-enter w-full max-w-sm rounded-xl border border-walnut/20 bg-paper shadow-tank" onClick={(e) => e.stopPropagation()}>
              <header className="border-b border-walnut/12 px-5 py-4">
                <h2 className="font-display text-[20px] text-ink">Buy {pending.title}?</h2>
              </header>
              <div className="px-5 py-4">
                <p className="text-[13px] leading-relaxed text-walnut-light">
                  <span className="font-display text-[18px] text-ink">${pending.price}</span>
                  <span className="text-muted"> · </span>
                  {pending.details.filter(Boolean).join(' · ')}
                </p>
                <p className="mt-1 text-[12px] text-muted">Leaves ${(state.money - pending.price).toLocaleString()}</p>
                {pending.contrary && (
                  <p className="mt-3 flex gap-2 rounded-md border border-coral/35 bg-coral/8 px-3 py-2 text-[12px] leading-relaxed text-walnut-light">
                    <span className="text-coral" aria-hidden="true">!</span>
                    {pending.contrary}
                  </p>
                )}
              </div>
              <footer className="flex justify-end gap-2 border-t border-walnut/12 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setPending(null)}
                  className="rounded-md border border-walnut/20 px-4 py-2 text-[13px] text-walnut-light transition-colors hover:border-walnut/45"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className={`rounded-md px-4 py-2 text-[13px] font-medium text-shell transition-colors ${pending.contrary ? 'bg-coral hover:brightness-110' : 'bg-lagoon-dark hover:bg-lagoon'}`}
                >
                  {pending.contrary ? 'I understand — buy anyway' : 'Confirm purchase'}
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}