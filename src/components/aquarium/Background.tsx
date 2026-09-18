import { memo } from 'react';
import { BACKGROUNDS } from '../../data/backgrounds';
import type { BackgroundId } from '../../types/aquarium';
import { mulberry32, range } from '../../lib/rng';
import { SCENE } from './geometry';

function Silhouette({ kind, color }: { kind: string; color: string }) {
  const rand = mulberry32(kind.length * 31 + 7);
  if (kind === 'none') return null;
  if (kind === 'haze') {
    return <rect x={0} y={SCENE.surfaceY} width={SCENE.width} height={SCENE.floorY - SCENE.surfaceY} fill={color} opacity={0.18} />;
  }
  if (kind === 'rocks') {
    return (
      <g fill={color} opacity={0.32}>
        <path d={`M0,${SCENE.floorY} L120,${SCENE.floorY - 210} L250,${SCENE.floorY} Z`} />
        <path d={`M180,${SCENE.floorY} L330,${SCENE.floorY - 150} L470,${SCENE.floorY} Z`} />
        <path d={`M640,${SCENE.floorY} L790,${SCENE.floorY - 240} L960,${SCENE.floorY} Z`} />
      </g>
    );
  }
  if (kind === 'roots') {
    return (
      <g stroke={color} strokeWidth={9} fill="none" opacity={0.28} strokeLinecap="round">
        <path d={`M80,${SCENE.surfaceY} C120,190 60,300 110,${SCENE.floorY}`} />
        <path d={`M300,${SCENE.surfaceY} C260,200 330,320 290,${SCENE.floorY}`} />
        <path d={`M720,${SCENE.surfaceY} C770,210 690,330 740,${SCENE.floorY}`} />
      </g>
    );
  }
  const reeds = Array.from({ length: 16 }, () => ({
    x: range(rand, 0, SCENE.width),
    h: range(rand, 140, 330),
    bend: range(rand, -30, 30)
  }));
  return (
    <g stroke={color} strokeWidth={7} fill="none" opacity={0.26} strokeLinecap="round">
      {reeds.map((r, i) => (
        <path key={i} d={`M${r.x},${SCENE.floorY} C${r.x + r.bend * 0.3},${SCENE.floorY - r.h * 0.5} ${r.x + r.bend},${SCENE.floorY - r.h * 0.8} ${r.x + r.bend * 1.2},${SCENE.floorY - r.h}`} />
      ))}
    </g>
  );
}

/** Far wall + water body. Swapping the id changes nothing else in the scene. */
export const Background = memo(function Background({ background, lightsOn }: { background: BackgroundId; lightsOn: boolean }) {
  const def = BACKGROUNDS[background];
  const wallId = `wall-${def.id}`;
  const waterId = `water-${def.id}`;

  return (
    <g className="layer-background">
      <defs>
        <linearGradient id={wallId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={def.wall[0]} />
          <stop offset="100%" stopColor={def.wall[1]} />
        </linearGradient>
        <linearGradient id={waterId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={def.water[0]} />
          <stop offset="55%" stopColor={def.water[1]} />
          <stop offset="100%" stopColor={def.water[2]} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={SCENE.width} height={SCENE.height} fill={`url(#${wallId})`} />
      <rect x={0} y={SCENE.surfaceY} width={SCENE.width} height={SCENE.height - SCENE.surfaceY} fill={`url(#${waterId})`} opacity={0.94} />
      <Silhouette kind={def.silhouette} color={def.water[2]} />
      {!lightsOn && (
        <rect x={0} y={0} width={SCENE.width} height={SCENE.height} fill="#0A1622" opacity={0.46} />
      )}
    </g>
  );
});
