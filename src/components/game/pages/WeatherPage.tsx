import type { GameState } from '../../../types/game';
import { predictForecast } from '../../../lib/meteorology';
import { WeatherGlyph } from '../Header';
import { Panel } from '../../ui/Panel';

const LABEL: Record<string, string> = {
  sunny: 'Clear', hot: 'Hot', cloudy: 'Overcast', rain: 'Rain', storm: 'Storm', cold: 'Cold'
};

export function WeatherPage({ state }: { state: GameState }) {
  const forecast = predictForecast(state.forecast, state.day, 5);
  const history = [...state.weatherHistory].reverse();

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Panel title="Forecast" action={<span className="text-[12px] text-muted">next 5 days</span>}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {forecast.map((f, i) => (
            <div key={i} className="rounded-lg border border-walnut/12 p-3 text-center">
              <p className="text-[11px] text-muted">{i === 0 ? 'Today' : `Day ${state.day + i}`}</p>
              <div className="mt-1 flex justify-center text-lagoon">
                <WeatherGlyph weather={f.weather} />
              </div>
              <p className="mt-1 font-display text-[16px] text-ink">{LABEL[f.weather]}</p>
              <p className="text-[13px] text-ink tabular-nums">{f.temperatureC}°C</p>
              <p className="text-[11px] text-muted tabular-nums">{f.humidity}% humidity</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-muted">
          Weather nudges the tank temperature and evaporation. A heater smooths out cold snaps.
        </p>
      </Panel>

      <Panel title="Recorded history" action={<span className="text-[12px] text-muted">{history.length} days</span>}>
        {history.length === 0 ? (
          <p className="text-[13px] text-muted">No days recorded yet — end a day and its weather is logged here.</p>
        ) : (
          <ul className="max-h-[420px] space-y-1.5 overflow-y-auto pr-1 text-[13px]">
            {history.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-2 border-b border-walnut/8 pb-1.5">
                <span className="flex items-center gap-2 text-lagoon"><WeatherGlyph weather={h.weather} /><span className="text-ink">Day {h.day}</span></span>
                <span className="text-muted tabular-nums">{LABEL[h.weather]} · {h.temp}°C · {h.hum}%</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}