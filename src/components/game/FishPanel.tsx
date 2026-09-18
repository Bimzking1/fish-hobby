import { FISH_SPECIES } from '../../data/fish';
import type { FishCondition, FishInstance } from '../../types/fish';
import { FishBody } from '../aquarium/Fish';
import { Panel } from '../ui/Panel';

const CONDITION_TEXT: Record<FishCondition, string> = {
  healthy: 'Healthy', stressed: 'Stressed', sick: 'Sick', fungus: 'Fungus', critical: 'Critical', dead: 'Dead'
};

const CONDITION_CLASS: Record<FishCondition, string> = {
  healthy: 'text-reed',
  stressed: 'text-[#9A7B1E]',
  sick: 'text-coral',
  fungus: 'text-coral',
  critical: 'text-[#A32F1E]',
  dead: 'text-muted'
};

export function FishPanel({ fish }: { fish: FishInstance[] }) {
  return (
    <Panel title="Stocking" action={<span className="text-[12px] text-muted">{fish.length} fish</span>}>
      <ul className="max-h-[320px] divide-y divide-walnut/8 overflow-y-auto pr-1 lg:max-h-[380px]">
        {fish.map((f) => {
          const species = FISH_SPECIES[f.species];
          return (
            <li key={f.id} className="flex items-center gap-3 py-2">
              <svg viewBox="0 0 110 60" className="h-8 w-14 shrink-0" aria-hidden="true">
                <FishBody species={f.species} condition={f.condition} uid={`row-${f.id}`} />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] text-ink">{f.name}</p>
                <p className="truncate text-[12px] text-muted">{species.name}</p>
              </div>
              <span className={`text-[12px] ${CONDITION_CLASS[f.condition]}`}>{CONDITION_TEXT[f.condition]}</span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
