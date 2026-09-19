import type { GameState, WeatherId } from '../../types/game';
import { TANKS } from '../../data/tanks';
import { tankConditions } from '../../lib/conditions';

const WEATHER_LABEL: Record<WeatherId, string> = {
  sunny: 'Clear', hot: 'Hot', cloudy: 'Overcast', rain: 'Rain', storm: 'Storm', cold: 'Cold'
};

export function WeatherGlyph({ weather }: { weather: WeatherId }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      {weather === 'rain' || weather === 'storm' ? (
        <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
          <path d="M6 14a4 4 0 0 1 .6-7.9A5 5 0 0 1 17 7a3.5 3.5 0 0 1 .4 7H6Z" />
          <path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3" />
        </g>
      ) : weather === 'cloudy' ? (
        <path d="M6 16a4 4 0 0 1 .6-7.9A5 5 0 0 1 17 9a3.5 3.5 0 0 1 .4 7H6Z" fill="none" stroke="currentColor" strokeWidth={1.6} />
      ) : (
        <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </g>
      )}
    </svg>
  );
}

/** A coloured fact pill so the summary reads at a glance. */
function Chip({ label, value, tone }: { label?: string; value: string; tone: 'day' | 'fresh' | 'salt' | 'dry' | 'fish' | 'plants' | 'temp' }) {
  const tones: Record<string, string> = {
    day: 'border-lagoon/30 bg-lagoon/10 text-lagoon-dark',
    fresh: 'border-[#1D6B77]/30 bg-[#1D6B77]/10 text-[#14606C] dark:text-[#7FD6E2]',
    salt: 'border-[#2E5FA3]/30 bg-[#2E5FA3]/10 text-[#2E5FA3] dark:text-[#9CC0F5]',
    dry: 'border-coral/35 bg-coral/10 text-coral',
    fish: 'border-[#B4641E]/30 bg-[#B4641E]/10 text-[#9A5416] dark:text-[#F0B478]',
    plants: 'border-reed/30 bg-reed/10 text-reed',
    temp: 'border-[#C4653A]/30 bg-[#C4653A]/10 text-[#A8522C] dark:text-[#F0A878]'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium ${tones[tone]}`}>
      {label && <span className="opacity-70">{label}</span>}
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

interface Props {
  state: GameState;
  onShop: () => void;
  onToggleTheme: () => void;
  onHome: () => void;
}

export function Header({ state, onShop, onToggleTheme, onHome }: Props) {
  const tankL = TANKS[state.aquarium.tank].litres;
  const cond = tankConditions(state);
  const litres = state.water?.litres ?? 0;

  return (
    <header className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3 border-b border-walnut/15 pb-4">
      <div className="min-w-0">
        <h1 className="font-display text-[26px] leading-none text-ink">Aquarium Keeper</h1>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <Chip tone="day" value={`Day ${state.day}`} />
          {state.water ? (
            <Chip tone={state.water.type} value={`${litres}/${tankL}L · ${state.water.type === 'salt' ? 'Sea' : 'River'}`} />
          ) : (
            <Chip tone="dry" value="No water" />
          )}
          <Chip tone="fish" value={`${state.fish.length} fish`} />
          <Chip tone="plants" value={`${state.plants.length} plants`} />
          <Chip tone="temp" value={`${Math.round(cond.temperature)}°C`} />
          {cond.hasWater && (
            <span className="text-[12px] text-muted tabular-nums">pH {cond.effectivePh.toFixed(1)}</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <dl className="flex items-end gap-5">
          <div>
            <dt className="text-[11px] text-muted">Money</dt>
            <dd className="font-display text-[20px] text-ink tabular-nums">${state.money.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-muted">Today</dt>
            <dd className="flex items-center gap-1.5 font-display text-[18px] text-ink">
              <span className="text-lagoon"><WeatherGlyph weather={state.forecast.weather} /></span>
              {state.forecast.temperatureC}°C
              <span className="text-[12px] font-normal text-muted">{WEATHER_LABEL[state.forecast.weather]}</span>
            </dd>
          </div>
        </dl>

<div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onShop}
              className="rounded-md bg-lagoon-dark px-3.5 py-2 text-[13px] font-medium text-shell transition-colors hover:bg-lagoon"
            >
              Shop
            </button>
            <button
              type="button"
              onClick={onHome}
              className="rounded-md border border-walnut/20 p-2 text-walnut-light transition-colors hover:border-walnut/45"
              aria-label="Back to title"
              title="Back to title"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11.5 12 4l8 7.5" />
                  <path d="M6.5 10v9.5h11V10" />
                </g>
              </svg>
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="rounded-md border border-walnut/20 px-3 py-2 text-[13px] text-walnut-light transition-colors hover:border-walnut/45"
              aria-label="Toggle dark mode"
            >
              {state.theme === 'dark' ? '☀' : '🌙'}
            </button>
          </div>
      </div>
    </header>
  );
}