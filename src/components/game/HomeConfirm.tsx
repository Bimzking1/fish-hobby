export function HomeConfirm({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-walnut-dark/55 p-4" role="dialog" aria-modal="true" aria-label="Back to title" onClick={onClose}>
      <div className="report-enter w-full max-w-sm rounded-xl border border-walnut/20 bg-paper shadow-tank" onClick={(e) => e.stopPropagation()}>
        <header className="border-b border-walnut/12 px-5 py-4">
          <h2 className="font-display text-[20px] text-ink">Return to title?</h2>
        </header>
        <div className="px-5 py-4">
          <p className="text-[13px] leading-relaxed text-walnut-light">
            Your tank is autosaved — you can pick it up again from the title screen any time.
          </p>
        </div>
        <footer className="flex justify-end gap-2 border-t border-walnut/12 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-walnut/20 px-4 py-2 text-[13px] text-walnut-light transition-colors hover:border-walnut/45"
          >
            Stay here
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-lagoon-dark px-4 py-2 font-display text-[14px] text-shell transition-colors hover:bg-lagoon"
          >
            Go to title
          </button>
        </footer>
      </div>
    </div>
  );
}