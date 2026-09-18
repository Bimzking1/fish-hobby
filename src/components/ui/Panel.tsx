import type { ReactNode } from 'react';

export function Panel({ title, action, children, className = '' }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-walnut/12 bg-paper shadow-panel ${className}`}>
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-walnut/10 px-4 py-2.5">
          <h2 className="font-display text-[15px] text-ink">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}
