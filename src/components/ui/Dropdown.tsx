import { useEffect, useRef, useState } from 'react';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface Props<T extends string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label?: string;
  disabled?: boolean;
}

/** A themed select — native <select> menus can't be styled, so this replaces it. */
export function Dropdown<T extends string>({ value, options, onChange, label, disabled = false }: Props<T>) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      {label && <span className="mb-1 block text-[12px] text-muted">{label}</span>}
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-walnut/18 bg-shell/50 px-2.5 py-2 text-left text-[13px] text-ink transition-colors hover:border-walnut/35 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="truncate">{selected?.label ?? '—'}</span>
          {selected?.hint && <span className="shrink-0 text-[11px] text-muted">{selected.hint}</span>}
        </span>
        <svg viewBox="0 0 12 12" className={`h-3 w-3 shrink-0 text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="M2 4.2 6 8.2 10 4.2" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="menu-enter absolute left-0 right-0 z-30 mt-1 max-h-64 overflow-y-auto rounded-md border border-walnut/18 bg-paper p-1 shadow-panel"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                  o.value === value ? 'bg-lagoon/12 text-lagoon-dark' : 'text-walnut-light hover:bg-walnut/8 hover:text-ink'
                }`}
              >
                <span className="truncate">{o.label}</span>
                {o.hint && <span className="shrink-0 text-[11px] text-muted">{o.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}