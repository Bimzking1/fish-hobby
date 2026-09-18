interface MeterProps { label: string; value: number; previous?: number }

/** Reads worst-case first: the bar colour is the only alarm in the UI. */
function tone(value: number): string {
  if (value >= 85) return 'bg-reed';
  if (value >= 65) return 'bg-[#C9A227]';
  return 'bg-coral';
}

export function Meter({ label, value, previous }: MeterProps) {
  const delta = previous === undefined ? null : value - previous;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] text-walnut-light">{label}</span>
        <span className="font-display text-[15px] text-ink tabular-nums">
          {value}
          {delta !== null && delta !== 0 && (
            <span className={`ml-1 text-[11px] ${delta > 0 ? 'text-reed' : 'text-coral'}`}>
              {delta > 0 ? '+' : ''}{delta}
            </span>
          )}
        </span>
      </div>
      <div className="mt-1 h-[6px] w-full overflow-hidden rounded-full bg-walnut/10">
        <div className={`h-full rounded-full ${tone(value)} transition-[width] duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
