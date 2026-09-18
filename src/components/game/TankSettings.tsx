import { BACKGROUND_LIST, SUBSTRATE_LIST } from '../../data/backgrounds';
import { TANK_LIST } from '../../data/tanks';
import type { AquariumState, BackgroundId, SubstrateId, TankSizeId } from '../../types/aquarium';
import { Panel } from '../ui/Panel';

interface Props {
  aquarium: AquariumState;
  onChange: (changes: Partial<AquariumState>) => void;
}

const selectClass =
  'w-full rounded-md border border-walnut/18 bg-shell/50 px-2.5 py-2 text-[13px] text-ink focus:border-lagoon focus:outline-none';

/** Swapping any of these proves the asset layers are independent. */
export function TankSettings({ aquarium, onChange }: Props) {
  return (
    <Panel title="Tank setup">
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <label className="block">
          <span className="mb-1 block text-[12px] text-muted">Tank</span>
          <select className={selectClass} value={aquarium.tank} onChange={(e) => onChange({ tank: e.target.value as TankSizeId })}>
            {TANK_LIST.map((t) => (
              <option key={t.id} value={t.id}>{t.name} · {t.litres}L</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] text-muted">Background</span>
          <select className={selectClass} value={aquarium.background} onChange={(e) => onChange({ background: e.target.value as BackgroundId })}>
            {BACKGROUND_LIST.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] text-muted">Substrate</span>
          <select className={selectClass} value={aquarium.substrate} onChange={(e) => onChange({ substrate: e.target.value as SubstrateId })}>
            {SUBSTRATE_LIST.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
      </div>
    </Panel>
  );
}
