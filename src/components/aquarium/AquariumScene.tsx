import { memo } from 'react';
import type { FoodParticle } from '../../types/aquarium';
import type { GameState } from '../../types/game';
import { Background } from './Background';
import { DecorLayer } from './Decor';
import { Effects } from './Effects';
import { EquipmentLayer } from './Equipment';
import { FishLayer } from './Fish';
import { FoodLayer } from './Food';
import { PlantLayer } from './Plant';
import { SnailLayer } from './Snail';
import { Substrate } from './Substrate';
import { Tank } from './Tank';
import { Water } from './Water';
import { SCENE } from './geometry';

interface Props {
  state: GameState;
  food: FoodParticle[];
}

/**
 * Draw order is the whole trick: far wall, water, hardscape, plants, livestock,
 * then the glass. Each layer is independent — reorder or replace one freely.
 */
export const AquariumScene = memo(function AquariumScene({ state, food }: Props) {
  const { aquarium } = state;
  return (
    <svg
      viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
      className="h-full w-full"
      role="img"
      aria-label={`Aquarium on day ${state.day}`}
    >
      <Tank tank={aquarium.tank}>
        <Background background={aquarium.background} lightsOn={aquarium.lightsOn} />
        <Substrate substrate={aquarium.substrate} mulm={aquarium.mulm} />
        <DecorLayer />
        <PlantLayer plants={state.plants} />
        <EquipmentLayer equipment={state.equipment} />
        <SnailLayer snails={state.snails} />
        <FoodLayer particles={food} />
        <FishLayer fish={state.fish} />
        <Effects algae={aquarium.algae} glassDirt={aquarium.glassDirt} />
        <Water background={aquarium.background} lightsOn={aquarium.lightsOn} />
      </Tank>
    </svg>
  );
});
