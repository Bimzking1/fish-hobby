import type { ReactNode } from 'react';
import type { NoticeKind } from '../../types/game';

const KIND: Record<NoticeKind, { accent: string; ring: string; icon: ReactNode }> = {
  info: {
    accent: '#1D6B77',
    ring: 'border-lagoon/30',
    icon: (
      <path d="M12 8h0M12 11v6" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" />
    )
  },
  success: {
    accent: '#3F6B54',
    ring: 'border-reed/30',
    icon: <path d="M7 12.5 10.5 16 17 8.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  },
  warning: {
    accent: '#C9A227',
    ring: 'border-[#C9A227]/35',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
        <path d="M12 8.5v5" />
        <circle cx="12" cy="16.6" r="0.6" fill="currentColor" stroke="none" />
      </g>
    )
  },
  danger: {
    accent: '#C4653A',
    ring: 'border-coral/35',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
        <path d="M9 9l6 6M15 9l-6 6" />
      </g>
    )
  },
  money: {
    accent: '#B4851E',
    ring: 'border-[#B4851E]/35',
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
        <path d="M12 7v10M14.5 9.2c-.6-1-1.6-1.5-2.7-1.5-1.5 0-2.6.8-2.6 2.1 0 1.4 1.2 1.9 2.7 2.3 1.6.4 2.9.9 2.9 2.3 0 1.3-1.2 2.2-2.9 2.2-1.3 0-2.4-.5-3-1.6" />
      </g>
    )
  }
};

function keywordIcon(message: string): ReactNode | null {
  const m = message.toLowerCase();
  if (m.includes('feed') || m.includes('fed')) {
    return <path d="M6 14c2-4 6-6 10-6-1 4-4 7-8 7l-2 2z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />;
  }
  if (m.includes('water') || m.includes('litre')) {
    return <path d="M12 5c3 4 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5 5-9Z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />;
  }
  if (m.includes('glass') || m.includes('clean')) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        <path d="M7 17 15 9" />
        <path d="M15 6l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" fill="currentColor" stroke="none" />
      </g>
    );
  }
  if (m.includes('medicine') || m.includes('dose')) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        <path d="M12 8v8M8 12h8" />
      </g>
    );
  }
  if (m.includes('light')) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        <circle cx="12" cy="12" r="3.4" />
        <path d="M12 5v1.6M12 17.4V19M5 12h1.6M17.4 12H19" />
      </g>
    );
  }
  return null;
}

/** A themed toast. The accent bar (and icon) reflects what just happened. */
export function Toast({ message, kind, onClose }: { message: string; kind: NoticeKind; onClose: () => void }) {
  const style = KIND[kind];
  const icon = keywordIcon(message) ?? style.icon;
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[90] flex w-[min(360px,calc(100vw-2rem))] justify-end">
      <button
        type="button"
        onClick={onClose}
        className={`toast-enter pointer-events-auto flex w-full items-start gap-3 rounded-lg border ${style.ring} bg-paper/95 px-3.5 py-3 text-left shadow-panel backdrop-blur transition-transform hover:-translate-y-0.5`}
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${style.accent}22`, color: style.accent }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">{icon}</svg>
        </span>
        <span className="min-w-0 flex-1 text-[13px] leading-relaxed text-ink">{message}</span>
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: style.accent }} />
      </button>
    </div>
  );
}