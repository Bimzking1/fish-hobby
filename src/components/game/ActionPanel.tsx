import { FOOD_LIST } from '../../data/food';
import type { FoodId } from '../../types/aquarium';
import type { ActionId } from '../../types/game';
import { FoodIcon } from '../aquarium/Food';

const ACTIONS: { id: ActionId; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'water-change', label: 'Change water' },
  { id: 'clean-glass', label: 'Clean glass' },
  { id: 'check-water', label: 'Test water' },
  { id: 'adjust-filter', label: 'Filter' },
  { id: 'adjust-oxygen', label: 'Aeration' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'medicine', label: 'Medicine' },
  { id: 'plants', label: 'Trim plants' },
  { id: 'equipment', label: 'Equipment' }
];

interface Props {
  selectedFood: FoodId;
  onSelectFood: (food: FoodId) => void;
  onAction: (action: ActionId) => void;
  done: ActionId[];
}

export function ActionPanel({ selectedFood, onSelectFood, onAction, done }: Props) {
  return (
    <section className="rounded-lg border border-walnut/12 bg-paper p-4 shadow-panel">
      <div className="flex flex-wrap items-center gap-2 border-b border-walnut/10 pb-3">
        <span className="mr-1 text-[13px] text-walnut-light">Food</span>
        {FOOD_LIST.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelectFood(f.id)}
            title={f.note}
            aria-pressed={selectedFood === f.id}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] transition-colors ${
              selectedFood === f.id
                ? 'border-lagoon bg-lagoon/10 text-lagoon-dark'
                : 'border-walnut/15 text-walnut-light hover:border-walnut/35'
            }`}
          >
            <FoodIcon food={f.id} />
            {f.name}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
        {ACTIONS.map((a) => {
          const isDone = done.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onAction(a.id)}
              aria-pressed={isDone}
              title={isDone ? 'Done today — click to undo' : 'Mark this routine as done'}
              className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-left text-[13px] transition-all active:scale-[0.98] ${
                isDone
                  ? 'border-reed/30 bg-reed/8 text-ink'
                  : 'border-walnut/15 bg-shell/40 text-ink hover:border-walnut/40 hover:bg-shell'
              }`}
            >
              <span>{a.label}</span>
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] transition-colors ${
                  isDone ? 'bg-reed/25 text-reed' : 'border border-walnut/20 text-transparent'
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
