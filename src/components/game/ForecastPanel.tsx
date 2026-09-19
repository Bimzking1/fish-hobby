import type { Forecast, RiskLevel } from '../../types/game';
import { Panel } from '../ui/Panel';

const RISK_CLASS: Record<RiskLevel, string> = {
  low: 'text-reed',
  medium: 'text-[#9A7B1E]',
  high: 'text-coral'
};

const RISK_TEXT: Record<RiskLevel, string> = { low: 'Low', medium: 'Medium', high: 'High' };

const WEATHER_LABEL: Record<Forecast['weather'], string> = {
  sunny: 'Clear', hot: 'Hot', cloudy: 'Overcast', rain: 'Rain', storm: 'Storm', cold: 'Cold'
};

export function ForecastPanel({ forecast, onRequestEndDay }: { forecast: Forecast; onRequestEndDay: () => void }) {
  return (
    <Panel title="Tomorrow">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[18px] text-ink">{WEATHER_LABEL[forecast.weather]}</span>
        <span className="text-[13px] text-ink tabular-nums">
          {forecast.temperatureC}°C <span className="text-muted">· {forecast.humidity}%</span>
        </span>
      </div>
      <ul className="mt-3 space-y-1.5 text-[13px]">
        {forecast.impacts.map((impact) => (
          <li key={impact.label} className="flex justify-between">
            <span className="text-walnut-light">{impact.label}</span>
            <span className={RISK_CLASS[impact.level]}>{RISK_TEXT[impact.level]}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onRequestEndDay}
        className="mt-4 w-full rounded-md bg-lagoon-dark px-4 py-3 font-display text-[15px] text-shell transition-colors hover:bg-lagoon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
      >
        End day
      </button>
      <p className="mt-2 text-center text-[11px] text-muted">You'll get a summary and a confirmation first.</p>
    </Panel>
  );
}