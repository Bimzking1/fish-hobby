import { CHANGELOG } from '../../data/changelog';

/** The "What's new" modal. */
export function ChangelogModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-walnut-dark/50 p-4" role="dialog" aria-modal="true" aria-label="Changelog" onClick={onClose}>
      <div className="report-enter flex max-h-[80vh] w-full max-w-lg flex-col rounded-xl border border-walnut/20 bg-paper shadow-tank" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-walnut/12 px-6 py-4">
          <div>
            <h2 className="font-display text-[22px] text-ink">Changelog</h2>
            <p className="text-[12px] text-muted">Aquarium Keeper — what changed between versions.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2.5 py-1 text-[15px] text-muted transition-colors hover:bg-walnut/10 hover:text-ink"
            aria-label="Close changelog"
          >
            ✕
          </button>
        </header>
        <div className="overflow-y-auto px-6 py-4">
          <ol className="space-y-6">
            {CHANGELOG.map((entry) => (
              <li key={entry.version} className="border-l-2 border-walnut/15 pl-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-[16px] text-ink">{entry.title}</h3>
                  <span className="rounded bg-lagoon/10 px-1.5 py-0.5 font-mono text-[11px] text-lagoon-dark">v{entry.version}</span>
                  <time className="text-[12px] text-muted">{entry.date}</time>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-walnut-light">
                      <span className="text-lagoon" aria-hidden="true">›</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}