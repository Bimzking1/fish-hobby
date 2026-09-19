import { memo } from 'react';
import type { FoodParticle } from '../../types/aquarium';
import type { GameState } from '../../types/game';
import { TANKS } from '../../data/tanks';
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
import { SCENE, bedSurface, waterSurface } from './geometry';

interface Props {
  state: GameState;
  food: FoodParticle[];
}

/**
 * Draw order is the whole trick: far wall, water, hardscape, plants, livestock,
 * then the glass. Each layer is independent — reorder or replace one freely.
 * A day-1 tank renders the far wall and nothing else until it's built up.
 */
export const AquariumScene = memo(function AquariumScene({ state, food }: Props) {
  const { aquarium } = state;
  const hasWater = state.water !== null;
  const surface = state.substrate ? bedSurface(state.substrate.coverage) : SCENE.floorY;
  const level = hasWater ? state.water!.litres / TANKS[state.aquarium.tank].litres : 0;
  const bound: [number, number] | undefined = hasWater ? [waterSurface(level) + 8, surface - 8] : undefined;

  return (
    <svg
      viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
      className="h-full w-full"
      role="img"
      aria-label={`Aquarium on day ${state.day}`}
    >
      <Tank tank={aquarium.tank}>
        <Background background={aquarium.background} lightsOn={aquarium.lightsOn} />
        {state.substrate && <Substrate id={state.substrate.id} coverage={state.substrate.coverage} mulm={aquarium.mulm} />}
        {state.rocks.length > 0 && <DecorLayer rocks={state.rocks} surface={surface} />}
        {state.plants.length > 0 && <PlantLayer plants={state.plants} surface={surface} />}
        <EquipmentLayer equipment={state.equipment} />
        {state.snails.length > 0 && <SnailLayer snails={state.snails} />}
        {hasWater && <FoodLayer particles={food} />}
        {state.fish.length > 0 && <FishLayer fish={state.fish} bound={bound} />}
        {hasWater && <Effects algae={aquarium.algae} glassDirt={aquarium.glassDirt} />}
        {hasWater && <Water background={aquarium.background} lightsOn={aquarium.lightsOn} level={level} />}
      </Tank>
    </svg>
  );
});