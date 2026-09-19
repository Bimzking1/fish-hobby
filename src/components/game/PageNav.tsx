import type { GameState } from '../../types/game';

export type PageId = 'tank' | 'water' | 'soil' | 'plants' | 'fish' | 'finance' | 'weather';

const PAGES: { id: PageId; label: string }[] = [
  { id: 'tank', label: 'Tank' },
  { id: 'water', label: 'Water' },
  { id: 'soil', label: 'Soil' },
  { id: 'plants', label: 'Plants' },
  { id: 'fish', label: 'Fish' },
  { id: 'finance', label: 'Finance' },
  { id: 'weather', label: 'Weather' }
];

export function PageNav({ page, state, onPage }: { page: PageId; state: GameState; onPage: (page: PageId) => void }) {
  const badge: Partial<Record<PageId, number>> = {
    plants: state.plants.length,
    fish: state.fish.length
  };

  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1" aria-label="Pages">
      {PAGES.map((p) => {
        const active = p.id === page;
        return (
          <button
            key={p.id}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => onPage(p.id)}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors ${
              active
                ? 'bg-lagoon-dark text-shell'
                : 'border border-walnut/15 text-walnut-light hover:border-walnut/40 hover:text-ink'
            }`}
          >
            {p.label}
            {badge[p.id] !== undefined && (
              <span className={`rounded-full px-1.5 text-[11px] tabular-nums ${active ? 'bg-white/20' : 'bg-walnut/10 text-muted'}`}>
                {badge[p.id]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}