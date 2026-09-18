import type { GameState, WeatherId } from '../../types/game';

const WEATHER_LABEL: Record<WeatherId, string> = {
  sunny: 'Clear', hot: 'Hot', cloudy: 'Overcast', rain: 'Rain', storm: 'Storm', cold: 'Cold'
};

function WeatherGlyph({ weather }: { weather: WeatherId }) {
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

export function Header({ state }: { state: GameState }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-walnut/15 pb-4">
      <div>
        <h1 className="font-display text-[28px] leading-none text-ink">Aquarium Keeper</h1>
        <p className="mt-1.5 text-[13px] text-muted">Day {state.day} · {state.fish.length} fish · {state.aquarium.temperatureC}°C</p>
      </div>
      <dl className="flex items-end gap-8">
        <div>
          <dt className="text-[12px] text-muted">Money</dt>
          <dd className="font-display text-[20px] text-ink tabular-nums">${state.money.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-[12px] text-muted">Today</dt>
          <dd className="flex items-center gap-1.5 font-display text-[20px] text-ink">
            <span className="text-lagoon"><WeatherGlyph weather={state.forecast.weather} /></span>
            {state.forecast.temperatureC}°C
            <span className="text-[13px] font-normal text-muted">{WEATHER_LABEL[state.forecast.weather]}</span>
          </dd>
        </div>
      </dl>
    </header>
  );
}
