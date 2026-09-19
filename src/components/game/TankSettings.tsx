import { BACKGROUND_LIST } from '../../data/backgrounds';
import { TANK_LIST } from '../../data/tanks';
import type { AquariumState, BackgroundId, TankSizeId } from '../../types/aquarium';
import { Dropdown } from '../ui/Dropdown';
import { Panel } from '../ui/Panel';

interface Props {
  aquarium: AquariumState;
  onChange: (changes: Partial<AquariumState>) => void;
}

/** Cosmetic setup only — the actual build happens in the shop. */
export function TankSettings({ aquarium, onChange }: Props) {
  return (
    <Panel title="Tank setup">
      <div className="grid gap-3 sm:grid-cols-2">
        <Dropdown<TankSizeId>
          label="Tank size"
          value={aquarium.tank}
          onChange={(tank) => onChange({ tank })}
          options={TANK_LIST.map((t) => ({ value: t.id, label: t.name, hint: `${t.litres}L` }))}
        />
        <Dropdown<BackgroundId>
          label="Background"
          value={aquarium.background}
          onChange={(background) => onChange({ background })}
          options={BACKGROUND_LIST.map((b) => ({ value: b.id, label: b.name }))}
        />
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-walnut-light sm:col-span-2">
          <input
            type="checkbox"
            checked={aquarium.lightsOn}
            onChange={(e) => onChange({ lightsOn: e.target.checked })}
            className="h-4 w-4 accent-[#1D6B77]"
          />
          Lights on
        </label>
      </div>
    </Panel>
  );
}