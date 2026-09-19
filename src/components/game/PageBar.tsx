export function PageBar({ title, onEndDay }: { title: string; onEndDay: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-display text-[18px] leading-none text-ink">{title}</h2>
      <button
        type="button"
        onClick={onEndDay}
        className="rounded-md bg-lagoon-dark px-3.5 py-2 text-[13px] font-medium text-shell transition-colors hover:bg-lagoon"
      >
        End day
      </button>
    </div>
  );
}