import type { GameState } from '../../../types/game';
import type { ShopTab } from '../ShopModal';
import { TANKS } from '../../../data/tanks';
import { tankConditions } from '../../../lib/conditions';
import { Panel } from '../../ui/Panel';
import { FishPanel } from '../FishPanel';

export function FishPage({
  state,
  onOpenShop,
  onSell,
  onDispose
}: {
  state: GameState;
  onOpenShop: (tab: ShopTab) => void;
  onSell: (id: string) => void;
  onDispose: (id: string) => void;
}) {
  const tank = TANKS[state.aquarium.tank];
  const cond = tankConditions(state);
  return (
    <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
      <div className="space-y-4">
        <Panel title="Add fish">
          <p className="text-[13px] leading-relaxed text-walnut-light">
            {state.fish.length}/{tank.capacity} in the {tank.name.toLowerCase()} tank.
            {cond.hasWater
              ? ` It holds ${cond.waterType === 'salt' ? 'sea' : 'river'} water, so only matching species thrive.`
              : ' The tank is dry — fish cannot be added until you pour water.'}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onOpenShop('fish')}
              className="rounded-md bg-lagoon-dark px-3 py-2 text-[13px] font-medium text-shell transition-colors hover:bg-lagoon"
            >
              Open shop
            </button>
            <button
              type="button"
              onClick={() => onOpenShop('fish')}
              className="rounded-md border border-walnut/20 px-3 py-2 text-[13px] text-walnut-light transition-colors hover:border-walnut/45"
            >
              Browse catalogue
            </button>
          </div>
        </Panel>
      </div>
      <FishPanel title="Your fish" fish={state.fish} onSell={onSell} onDispose={onDispose} />
    </div>
  );
}