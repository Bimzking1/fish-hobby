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

export function FishPanel({ title = 'Stocking', fish, onSell, onDispose }: {
  title?: string;
  fish: FishInstance[];
  onSell: (id: string) => void;
  onDispose: (id: string) => void;
}) {
  return (
    <Panel title={title} action={<span className="text-[12px] text-muted">{fish.length} fish</span>}>
      <ul className="max-h-[300px] divide-y divide-walnut/8 overflow-y-auto pr-1 lg:max-h-[360px]">
        {fish.length === 0 && (
          <li className="py-3 text-[13px] text-muted">No fish yet. Browse the catalogue in the shop — it stocks river and sea species.</li>
        )}
        {fish.map((f) => {
          const species = FISH_SPECIES[f.species];
          const dead = f.condition === 'dead' || f.health <= 0;
          return (
            <li key={f.id} className="flex items-center gap-3 py-2">
              <svg viewBox="0 0 110 60" className="h-8 w-14 shrink-0" aria-hidden="true">
                <FishBody species={f.species} condition={f.condition} uid={`row-${f.id}`} />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] text-ink">{f.name}</p>
                <p className="truncate text-[12px] text-muted">
                  {species.name} · {species.water === 'salt' ? 'Sea' : 'River'} · {Math.round(f.health)}%
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[12px] ${CONDITION_CLASS[f.condition]}`}>{CONDITION_TEXT[f.condition]}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => onSell(f.id)}
                    className="rounded border border-walnut/15 px-1.5 py-0.5 text-[11px] text-walnut-light transition-colors hover:border-walnut/40"
                    title={dead ? 'No value — dispose instead' : `Sell for ${Math.round(species.price * 0.5)}`}
                  >
                    Sell
                  </button>
                  <button
                    type="button"
                    onClick={() => onDispose(f.id)}
                    className="rounded border border-walnut/15 px-1.5 py-0.5 text-[11px] text-muted transition-colors hover:border-coral/50 hover:text-coral"
                    title="Remove from the tank"
                  >
                    Dispose
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}