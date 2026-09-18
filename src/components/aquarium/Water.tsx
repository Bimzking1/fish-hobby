import { memo } from 'react';
import { BACKGROUNDS } from '../../data/backgrounds';
import type { BackgroundId } from '../../types/aquarium';
import { SCENE } from './geometry';

/** Surface line, light shafts and the slow caustic wobble over everything. */
export const Water = memo(function Water({ background, lightsOn }: { background: BackgroundId; lightsOn: boolean }) {
  const def = BACKGROUNDS[background];
  return (
    <g className="layer-water" pointerEvents="none">
      <path
        className="water-surface"
        d={`M0,${SCENE.surfaceY} C160,${SCENE.surfaceY - 8} 320,${SCENE.surfaceY + 8} 500,${SCENE.surfaceY} C680,${SCENE.surfaceY - 8} 840,${SCENE.surfaceY + 8} 1000,${SCENE.surfaceY}`}
        stroke={def.light}
        strokeWidth={3}
        fill="none"
        opacity={0.6}
      />
      <rect x={0} y={SCENE.surfaceY} width={SCENE.width} height={16} fill={def.light} opacity={0.14} />
      {lightsOn && (
        <g className="light-shafts" opacity={0.18}>
          <path d={`M120,${SCENE.surfaceY} L250,${SCENE.floorY} L170,${SCENE.floorY} L70,${SCENE.surfaceY} Z`} fill={def.light} />
          <path d={`M420,${SCENE.surfaceY} L560,${SCENE.floorY} L470,${SCENE.floorY} L370,${SCENE.surfaceY} Z`} fill={def.light} />
          <path d={`M760,${SCENE.surfaceY} L880,${SCENE.floorY} L800,${SCENE.floorY} L710,${SCENE.surfaceY} Z`} fill={def.light} />
        </g>
      )}
    </g>
  );
});
