import { useEffect, useState } from 'react';
import { useGame } from './lib/useGame';
import { SplashScreen } from './components/game/SplashScreen';
import { ChangelogModal } from './components/game/ChangelogModal';
import { ShopModal, type ShopTab } from './components/game/ShopModal';
import { EndDayConfirm } from './components/game/EndDayConfirm';
import { HomeConfirm } from './components/game/HomeConfirm';
import { DailyReport } from './components/game/DailyReport';
import { Header } from './components/game/Header';
import { PageNav, type PageId } from './components/game/PageNav';
import { Toast } from './components/game/Toast';
import { SaveLoad } from './components/game/SaveLoad';
import { TankPage } from './components/game/pages/TankPage';
import { WaterPage } from './components/game/pages/WaterPage';
import { SoilPage } from './components/game/pages/SoilPage';
import { PlantsPage } from './components/game/pages/PlantsPage';
import { FishPage } from './components/game/pages/FishPage';
import { FinancePage } from './components/game/pages/FinancePage';
import { WeatherPage } from './components/game/pages/WeatherPage';

export default function App() {
  const game = useGame();
  const { state, food, report, notice, noticeKind } = game;
  const [page, setPage] = useState<PageId>('tank');
  const [shopTab, setShopTab] = useState<ShopTab | null>(null);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [endConfirm, setEndConfirm] = useState(false);
  const [homeConfirm, setHomeConfirm] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Scale the whole UI to the screen: 100% up to ~1600px, then step up so a
  // big monitor gets the equivalent of ~125% browser zoom automatically.
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      const zoom = w >= 1900 ? 1.25 : w >= 1800 ? 1.18 : w >= 1680 ? 1.1 : 1;
      document.documentElement.style.setProperty('zoom', String(zoom));
      const el = document.documentElement.style;
      el.setProperty('--maxh-88', `${Math.round(88 / zoom)}vh`);
      el.setProperty('--maxh-90', `${Math.round(90 / zoom)}vh`);
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  if (!state.started) {
    return (
      <>
        <SplashScreen
          theme={state.theme}
          canLoad={game.hasSave}
          onNew={game.startNewGame}
          onLoad={game.loadGame}
          onShowChangelog={() => setChangelogOpen(true)}
          onToggleTheme={game.toggleTheme}
        />
        {changelogOpen && <ChangelogModal onClose={() => setChangelogOpen(false)} />}
      </>
    );
  }

  const openShop = (tab: ShopTab) => setShopTab(tab);

  return (
    <div className="min-h-screen bg-shell text-ink">
      <div className="mx-auto max-w-[1500px] px-4 py-4 lg:px-7 lg:py-5">
        <Header state={state} onShop={() => openShop('water')} onToggleTheme={game.toggleTheme} onHome={() => setHomeConfirm(true)} />

        <div className="mt-3">
          <PageNav page={page} state={state} onPage={setPage} />
        </div>

        <main className="mt-4">
          {page === 'tank' && (
            <TankPage
              state={state}
              food={food}
              onAction={game.runAction}
              onSelectFood={(selectedFood) => game.patch({ selectedFood })}
              onRequestEndDay={() => setEndConfirm(true)}
              onAquariumChange={game.setAquarium}
            />
          )}
          {page === 'water' && <WaterPage state={state} onOpenShop={openShop} onEndDay={() => setEndConfirm(true)} />}
          {page === 'soil' && <SoilPage state={state} onOpenShop={openShop} onEndDay={() => setEndConfirm(true)} />}
          {page === 'plants' && <PlantsPage state={state} onOpenShop={openShop} onRemove={game.removePlant} onEndDay={() => setEndConfirm(true)} />}
          {page === 'fish' && <FishPage state={state} onOpenShop={openShop} onSell={game.sellFish} onDispose={game.disposeFish} />}
          {page === 'finance' && <FinancePage state={state} />}
          {page === 'weather' && <WeatherPage state={state} />}
        </main>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-walnut/15 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setChangelogOpen(true)}
              className="text-[12px] text-muted transition-colors hover:text-ink"
            >
              What's new
            </button>
            <span className="text-[12px] text-muted">Autosaves to this browser after every change.</span>
          </div>
          <SaveLoad state={state} onLoad={game.replace} onNotice={game.flash} />
        </footer>
      </div>

      {notice && <Toast message={notice} kind={noticeKind} onClose={game.dismissNotice} />}

      {report && <DailyReport report={report} onClose={() => game.setReport(null)} />}

      {endConfirm && (
        <EndDayConfirm
          state={state}
          onClose={() => setEndConfirm(false)}
          onConfirm={() => {
            setEndConfirm(false);
            game.endDay();
          }}
        />
      )}

      {homeConfirm && (
        <HomeConfirm
          onClose={() => setHomeConfirm(false)}
          onConfirm={() => {
            setHomeConfirm(false);
            game.backToSplash();
          }}
        />
      )}

      {shopTab && (
        <ShopModal
          state={state}
          initialTab={shopTab}
          onBuyWater={game.buyWater}
          onBuySubstrate={game.buySubstrate}
          onBuyRock={game.buyRock}
          onBuyPlant={game.buyPlant}
          onBuyFish={game.buyFish}
          onBuyEquipment={game.buyEquipment}
          onClose={() => setShopTab(null)}
        />
      )}
      {changelogOpen && <ChangelogModal onClose={() => setChangelogOpen(false)} />}
    </div>
  );
}