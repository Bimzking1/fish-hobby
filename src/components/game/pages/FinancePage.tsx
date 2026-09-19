import { useState } from 'react';
import type { GameState } from '../../../types/game';
import { Dropdown } from '../../ui/Dropdown';
import { Panel } from '../../ui/Panel';

const PAGE_SIZE = 20;
type SortKey = 'newest' | 'price-asc' | 'price-desc';
type DayValue = 'all' | (string & {});

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' }
];

export function FinancePage({ state }: { state: GameState }) {
  const [query, setQuery] = useState('');
  const [day, setDay] = useState<DayValue>('all');
  const [sort, setSort] = useState<SortKey>('newest');
  const [page, setPage] = useState(0);

  const allDays = Array.from(new Set(state.finance.map((e) => e.day))).sort((a, b) => a - b);
  const dayOptions: { value: DayValue; label: string }[] = [
    { value: 'all', label: 'All days' },
    ...allDays.map((d) => ({ value: `d-${d}`, label: `Day ${d}` }))
  ];

  const q = query.trim().toLowerCase();
  const filtered = state.finance.filter(
    (e) => (day === 'all' || e.day === Number(String(day).slice(2))) && (!q || e.note.toLowerCase().includes(q))
  );

  const rows = filtered.slice().sort((a, b) => {
    if (sort === 'price-asc') return a.amount - b.amount;
    if (sort === 'price-desc') return b.amount - a.amount;
    return b.day - a.day || 0;
  });

  const income = filtered.filter((e) => e.amount > 0).reduce((s, e) => s + e.amount, 0);
  const spent = filtered.filter((e) => e.amount < 0).reduce((s, e) => s + e.amount, 0);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const clamped = Math.min(page, totalPages - 1);
  const visible = rows.slice(clamped * PAGE_SIZE, clamped * PAGE_SIZE + PAGE_SIZE);

  const goTo = (p: number) => setPage(Math.min(Math.max(0, p), totalPages - 1));

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="space-y-4">
        <Panel title="Balance">
          <p className="font-display text-[30px] text-ink tabular-nums">${state.money.toLocaleString()}</p>
          <dl className="mt-3 space-y-2 text-[13px]">
            <div className="flex justify-between"><dt className="text-muted">Total earned</dt><dd className="text-reed tabular-nums">+${income.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Total spent</dt><dd className="text-coral tabular-nums">−${Math.abs(spent).toLocaleString()}</dd></div>
            <div className="flex justify-between border-t border-walnut/10 pt-2"><dt className="text-walnut-light">Net (filtered)</dt><dd className="text-ink tabular-nums">${(income + spent).toLocaleString()}</dd></div>
          </dl>
          <p className="mt-3 text-[12px] text-muted">Daily earnings are paid when you end the day: $130 + $6 per fish.</p>
        </Panel>
      </div>

      <Panel title="Ledger" action={<span className="text-[12px] text-muted">{rows.length} entries</span>}>
        {state.finance.length === 0 ? (
          <p className="text-[13px] text-muted">Nothing bought or sold yet. Spend something in the shop and it shows up here.</p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="sm:col-span-1">
                <span className="mb-1 block text-[12px] text-muted">Find</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(0); }}
                  placeholder="Search an item…"
                  className="w-full rounded-md border border-walnut/18 bg-shell/50 px-2.5 py-2 text-[13px] text-ink placeholder:text-muted/70 focus:border-lagoon/60 focus:outline-none"
                />
              </label>
              <Dropdown<DayValue>
                label="Day"
                value={day}
                onChange={(v) => { setDay(v); setPage(0); }}
                options={dayOptions}
              />
              <Dropdown<SortKey>
                label="Sort by price"
                value={sort}
                onChange={(v) => { setSort(v); setPage(0); }}
                options={SORT_OPTIONS}
              />
            </div>

            <div className="mt-3 max-h-[480px] overflow-y-auto">
              <table className="w-full text-[13px]">
                <thead className="sticky top-0 bg-paper text-left text-[11px] uppercase tracking-wide text-muted">
                  <tr>
                    <th className="py-1.5 pr-3 font-medium">Day</th>
                    <th className="py-1.5 pr-3 font-medium">What</th>
                    <th className="py-1.5 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-walnut/8">
                  {visible.map((e, i) => (
                    <tr key={`${e.day}-${i}`}>
                      <td className="py-1.5 pr-3 text-muted tabular-nums">{e.day}</td>
                      <td className="py-1.5 pr-3 text-ink">{e.note}</td>
                      <td className={`py-1.5 text-right tabular-nums ${e.amount >= 0 ? 'text-reed' : 'text-coral'}`}>
                        {e.amount >= 0 ? '+' : '−'}${Math.abs(e.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[12px] text-muted">
                Page {clamped + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(clamped - 1)}
                  disabled={clamped === 0}
                  className="rounded-md border border-walnut/20 px-3 py-1.5 text-[12px] text-walnut-light transition-colors hover:border-walnut/45 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => goTo(clamped + 1)}
                  disabled={clamped >= totalPages - 1}
                  className="rounded-md border border-walnut/20 px-3 py-1.5 text-[12px] text-walnut-light transition-colors hover:border-walnut/45 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}