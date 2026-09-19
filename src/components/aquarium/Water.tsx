import { memo } from 'react';
import { BACKGROUNDS } from '../../data/backgrounds';
import type { BackgroundId } from '../../types/aquarium';
import { SCENE, waterSurface, bedSurface } from './geometry';

/**
 * The body of water. `level` is the fraction of the tank that is filled
 * (0..1), so 20L in a 200L tank draws the waterline low over the bed instead
 * of a full tank. Water only renders when there is some in the tank.
 */
export const Water = memo(function Water({ background, lightsOn, level }: { background: BackgroundId; lightsOn: boolean; level: number }) {
  const def = BACKGROUNDS[background];
  const surfaceY = waterSurface(level);
  const bodyH = bedSurface(1) + 40 - surfaceY;
  const shaftBottom = Math.min(SCENE.floorY, surfaceY + 340);
  const uid = `water-body-${background}`;
  return (
    <g className="layer-water" pointerEvents="none">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.05" stopColor={def.water[0]} />
          <stop offset="0.5" stopColor={def.water[1]} />
          <stop offset="1" stopColor={def.water[2]} />
        </linearGradient>
      </defs>
      <rect x={0} y={surfaceY} width={SCENE.width} height={bodyH} fill={`url(#${uid})`} opacity={0.5} />
      <rect x={0} y={surfaceY} width={SCENE.width} height={14} fill={def.light} opacity={0.16} />
      <path
        className="water-surface"
        d={`M0,${surfaceY} C160,${surfaceY - 8} 320,${surfaceY + 8} 500,${surfaceY} C680,${surfaceY - 8} 840,${surfaceY + 8} 1000,${surfaceY}`}
        stroke={def.light}
        strokeWidth={3}
        fill="none"
        opacity={0.55}
      />
      {lightsOn && (
        <g className="light-shafts" opacity={0.16}>
          <path d={`M120,${surfaceY} L250,${shaftBottom} L170,${shaftBottom} L70,${surfaceY} Z`} fill={def.light} />
          <path d={`M420,${surfaceY} L560,${shaftBottom} L470,${shaftBottom} L370,${surfaceY} Z`} fill={def.light} />
          <path d={`M760,${surfaceY} L880,${shaftBottom} L800,${shaftBottom} L710,${surfaceY} Z`} fill={def.light} />
        </g>
      )}
    </g>
  );
});