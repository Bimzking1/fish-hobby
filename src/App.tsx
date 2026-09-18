import { AquariumScene } from './components/aquarium/AquariumScene';
import { ActionPanel } from './components/game/ActionPanel';
import { AquariumStatus } from './components/game/AquariumStatus';
import { DailyReport } from './components/game/DailyReport';
import { FishPanel } from './components/game/FishPanel';
import { ForecastPanel } from './components/game/ForecastPanel';
import { Header } from './components/game/Header';
import { SaveLoad } from './components/game/SaveLoad';
import { TankSettings } from './components/game/TankSettings';
import { useGame } from './lib/useGame';

export default function App() {
  const { state, food, report, notice, runAction, endDay, patch, replace, setReport, flash } = useGame();

  return (
    <div className="min-h-screen bg-shell text-ink">
      <div className="mx-auto max-w-[1440px] px-4 py-5 lg:px-8 lg:py-7">
        <Header state={state} />

        <main className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl shadow-tank">
              <AquariumScene state={state} food={food} />
            </div>
            <ActionPanel
              selectedFood={state.selectedFood}
              onSelectFood={(selectedFood) => patch({ selectedFood })}
              onAction={runAction}
              done={state.care.map((c) => c.action)}
            />
          </div>

          <aside className="space-y-4">
            <AquariumStatus metrics={state.metrics} />
            <ForecastPanel forecast={state.forecast} onEndDay={endDay} />
            <FishPanel fish={state.fish} />
            <TankSettings aquarium={state.aquarium} onChange={(changes) => patch({ aquarium: { ...state.aquarium, ...changes } })} />
          </aside>
        </main>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-walnut/15 pt-4">
          <p className="text-[12px] text-muted">Autosaves to this browser after every change.</p>
          <SaveLoad state={state} onLoad={replace} onNotice={flash} />
        </footer>
      </div>

      {notice && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-walnut px-4 py-2 text-[13px] text-shell shadow-panel">
          {notice}
        </div>
      )}

      {report && <DailyReport report={report} onClose={() => setReport(null)} />}
    </div>
  );
}
