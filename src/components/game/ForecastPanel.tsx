import type { Forecast, RiskLevel } from '../../types/game';
import { Panel } from '../ui/Panel';

const RISK_CLASS: Record<RiskLevel, string> = {
  low: 'text-reed',
  medium: 'text-[#9A7B1E]',
  high: 'text-coral'
};

const RISK_TEXT: Record<RiskLevel, string> = { low: 'Low', medium: 'Medium', high: 'High' };

export function ForecastPanel({ forecast, onEndDay }: { forecast: Forecast; onEndDay: () => void }) {
  return (
    <Panel title="Tomorrow">
      <dl className="space-y-1.5 text-[13px]">
        <div className="flex justify-between"><dt className="text-walnut-light">Temperature</dt><dd className="tabular-nums text-ink">{forecast.temperatureC}°C</dd></div>
        <div className="flex justify-between"><dt className="text-walnut-light">Humidity</dt><dd className="tabular-nums text-ink">{forecast.humidity}%</dd></div>
      </dl>
      <div className="mt-3 border-t border-walnut/10 pt-3">
        <p className="mb-2 text-[12px] text-muted">What it does to the tank</p>
        <ul className="space-y-1.5 text-[13px]">
          {forecast.impacts.map((impact) => (
            <li key={impact.label} className="flex justify-between">
              <span className="text-walnut-light">{impact.label}</span>
              <span className={RISK_CLASS[impact.level]}>{RISK_TEXT[impact.level]}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={onEndDay}
        className="mt-4 w-full rounded-md bg-lagoon-dark px-4 py-3 font-display text-[15px] text-shell transition-colors hover:bg-lagoon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
      >
        End day
      </button>
    </Panel>
  );
}
