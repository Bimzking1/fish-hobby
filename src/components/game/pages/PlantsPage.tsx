import type { GameState } from '../../../types/game';
import type { ShopTab } from '../ShopModal';
import { tankConditions } from '../../../lib/conditions';
import { Panel } from '../../ui/Panel';
import { PageBar } from '../PageBar';
import { PlantsPanel } from '../PlantsPanel';

export function PlantsPage({
  state,
  onOpenShop,
  onRemove,
  onEndDay
}: {
  state: GameState;
  onOpenShop: (tab: ShopTab) => void;
  onRemove: (id: string) => void;
  onEndDay: () => void;
}) {
  const cond = tankConditions(state);
  return (
    <div className="space-y-4">
      <PageBar title="Plants" onEndDay={onEndDay} />
      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-4">
          <Panel title="Add plants">
            <p className="text-[13px] leading-relaxed text-walnut-light">
              {state.plants.length}/20 planted. Plants clean nitrates, add oxygen and shelter.
              {cond.hasWater
                ? cond.waterType === 'salt'
                  ? ' This is a sea tank, so salt-water plants suit it.'
                  : ' This is a river tank, so fresh-water plants suit it.'
                : ' The tank is dry, so plants cannot grow until you pour water.'}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenShop('plants')}
                className="rounded-md bg-lagoon-dark px-3 py-2 text-[13px] font-medium text-shell transition-colors hover:bg-lagoon"
              >
                Open shop
              </button>
              <button
                type="button"
                onClick={() => onOpenShop('plants')}
                className="rounded-md border border-walnut/20 px-3 py-2 text-[13px] text-walnut-light transition-colors hover:border-walnut/45"
              >
                Browse catalogue
              </button>
            </div>
          </Panel>
        </div>
        <PlantsPanel title="Your plants" plants={state.plants} onRemove={onRemove} />
      </div>
    </div>
  );
}