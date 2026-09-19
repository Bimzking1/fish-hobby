import type { FoodId, FoodParticle } from '../../../types/aquarium';
import type { ActionId, GameState } from '../../../types/game';
import { AquariumScene } from '../../aquarium/AquariumScene';
import { ActionPanel } from '../ActionPanel';
import { ForecastPanel } from '../ForecastPanel';
import { PageBar } from '../PageBar';
import { TankSettings } from '../TankSettings';
import type { AquariumState } from '../../../types/aquarium';
import { MetricsStrip } from '../../ui/MetricsStrip';

interface Props {
  state: GameState;
  food: FoodParticle[];
  onAction: (action: ActionId) => void;
  onSelectFood: (food: FoodId) => void;
  onRequestEndDay: () => void;
  onAquariumChange: (changes: Partial<AquariumState>) => void;
}

export function TankPage({ state, food, onAction, onSelectFood, onRequestEndDay, onAquariumChange }: Props) {
  return (
    <div className="space-y-4">
      <PageBar title="Tank" onEndDay={onRequestEndDay} />
      <div className="overflow-hidden rounded-xl shadow-tank">
        <AquariumScene state={state} food={food} />
      </div>

      <MetricsStrip state={state} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <ActionPanel
          selectedFood={state.selectedFood}
          onSelectFood={onSelectFood}
          onAction={onAction}
          done={state.care.map((c) => c.action)}
        />
        <ForecastPanel forecast={state.forecast} onRequestEndDay={onRequestEndDay} />
        <TankSettings aquarium={state.aquarium} onChange={onAquariumChange} />
      </div>
    </div>
  );
}