import type { Theme } from '../../types/game';
import { FISH_LIST } from '../../data/fish';
import { FishBody } from '../aquarium/Fish';

interface Props {
  theme: Theme;
  canLoad: boolean;
  onNew: () => void;
  onLoad: () => void;
  onShowChangelog: () => void;
  onToggleTheme: () => void;
}

/** Full-screen entry: New Game or Continue. Nothing runs until the player picks. */
export function SplashScreen({ theme, canLoad, onNew, onLoad, onShowChangelog, onToggleTheme }: Props) {
  return (
    <div className="min-h-screen grid place-items-center bg-shell px-4 text-ink">
      <div className="w-full max-w-md text-center">
        <button
          type="button"
          onClick={onToggleTheme}
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-walnut/15 px-3 py-1.5 text-[13px] text-walnut-light transition-colors hover:border-walnut/40"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
        </button>

        <div className="mx-auto mb-6 flex h-28 items-center justify-center gap-2">
          {[FISH_LIST[0], FISH_LIST[2], FISH_LIST[8], FISH_LIST[10], FISH_LIST[4]].map((s, i) => (
            <svg key={s.id} viewBox="0 0 110 60" className={i % 2 === 0 ? 'h-20 w-28 -scale-x-100' : 'h-16 w-24'} aria-hidden="true">
              <FishBody species={s.id} uid={`splash-${s.id}`} />
            </svg>
          ))}
        </div>

        <h1 className="font-display text-5xl leading-tight">Aquarium Keeper</h1>
        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
          Build a tank the way a hobbyist does — pour the water, lay the soil, pick the
          species, and keep every heartbeat in it healthy in <em>their</em> world.
        </p>

        <div className="mx-auto mt-8 grid max-w-xs gap-3">
          <button
            type="button"
            onClick={onNew}
            className="rounded-lg bg-lagoon-dark px-5 py-3 font-display text-[16px] text-shell transition-colors hover:bg-lagoon"
          >
            New game
          </button>
          <button
            type="button"
            onClick={onLoad}
            disabled={!canLoad}
            className="rounded-lg border border-walnut/20 px-5 py-3 font-display text-[15px] text-walnut-light transition-colors hover:border-walnut/45 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue{!canLoad ? ' — no save yet' : ''}
          </button>
          <button
            type="button"
            onClick={onShowChangelog}
            className="rounded-lg px-5 py-2 text-[13px] text-muted transition-colors hover:text-ink"
          >
            What's new
          </button>
        </div>
      </div>
    </div>
  );
}