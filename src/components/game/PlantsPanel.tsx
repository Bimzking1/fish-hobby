import type { PlantInstance } from '../../types/aquarium';
import { PLANT_SPECIES } from '../../data/plants';
import { PlantIcon } from '../aquarium/Plant';
import { Panel } from '../ui/Panel';

function hpTone(ratio: number): string {
  if (ratio <= 0) return 'bg-walnut/30';
  if (ratio < 0.4) return 'bg-coral';
  if (ratio < 0.7) return 'bg-[#C9A227]';
  return 'bg-reed';
}

export function PlantsPanel({ title = 'Plants', plants, onRemove }: { title?: string; plants: PlantInstance[]; onRemove: (id: string) => void }) {
  const live = plants.filter((p) => p.health > 0).length;
  return (
    <Panel title={title} action={<span className="text-[12px] text-muted">{live} alive</span>}>
      <ul className="max-h-[240px] divide-y divide-walnut/8 overflow-y-auto pr-1">
        {plants.length === 0 && (
          <li className="py-3 text-[13px] text-muted">No plants yet. Open the shop and browse the catalogue — every plant lists its water and its lifespan.</li>
        )}
        {plants.map((p) => {
          const def = PLANT_SPECIES[p.species];
          const ratio = def.maxHp > 0 ? p.health / def.maxHp : 0;
          const dead = ratio <= 0;
          return (
            <li key={p.id} className="flex items-center gap-3 py-2">
              <div className={`h-12 w-9 shrink-0 ${dead ? 'opacity-45' : ''}`}>
                <PlantIcon species={p.species} stage={dead ? 'dead' : 'mature'} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] text-ink">{def.name}</p>
                <p className="truncate text-[12px] text-muted">
                  {def.water === 'salt' ? 'Sea' : 'River'}
                  {p.daysLeft !== null ? ` · ${p.daysLeft}d left` : ''}
                  {dead ? ' · dead' : ''}
                </p>
                <div className="mt-1 h-[5px] w-full overflow-hidden rounded-full bg-walnut/10">
                  <div className={`h-full rounded-full ${hpTone(ratio)}`} style={{ width: `${Math.round(ratio * 100)}%` }} />
                </div>
              </div>
              {dead && (
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  className="rounded border border-walnut/15 px-2 py-1 text-[11px] text-muted transition-colors hover:border-coral/50 hover:text-coral"
                >
                  Remove
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}