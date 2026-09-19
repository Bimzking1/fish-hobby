import { Meter } from '../ui/Meter';
import type { DailyReport as Report, MetricId } from '../../types/game';

const ROWS: [MetricId, string][] = [
  ['fishHealth', 'Fish health'],
  ['waterQuality', 'Water quality'],
  ['plantHealth', 'Plant health'],
  ['stability', 'Stability'],
  ['aesthetics', 'Aesthetics']
];

const TONE_MARK = { good: '✓', warn: '!', bad: '×' } as const;
const TONE_CLASS = { good: 'text-reed', warn: 'text-[#9A7B1E]', bad: 'text-coral' } as const;

export function DailyReport({ report, onClose }: { report: Report; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-walnut-dark/45 p-4" role="dialog" aria-modal="true" aria-label="Daily report" onClick={onClose}>
      <div className="report-enter w-full max-w-md rounded-xl border border-walnut/20 bg-paper shadow-tank" onClick={(e) => e.stopPropagation()}>
        <header className="border-b border-walnut/12 px-6 py-4">
          <p className="text-[12px] text-muted">Day {report.fromDay} to day {report.toDay}</p>
          <h2 className="font-display text-[22px] text-ink">Overnight</h2>
        </header>
        <div className="px-6 py-4">
          <ul className="space-y-2">
            {report.lines.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] text-ink">
                <span className={`mt-[1px] ${TONE_CLASS[line.tone]}`} aria-hidden="true">{TONE_MARK[line.tone]}</span>
                {line.text}
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-3 border-t border-walnut/10 pt-4">
            {ROWS.map(([key, label]) => (
              <Meter key={key} label={label} value={report.after[key]} previous={report.before[key]} />
            ))}
          </div>
          <p className="mt-4 font-display text-[16px] text-reed">+${report.earnings}</p>
        </div>
        <footer className="border-t border-walnut/12 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="w-full rounded-md bg-walnut px-4 py-2.5 text-[14px] text-shell transition-colors hover:bg-walnut-light"
          >
            Continue
          </button>
        </footer>
      </div>
    </div>
  );
}
