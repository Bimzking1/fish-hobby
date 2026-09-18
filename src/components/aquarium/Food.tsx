import { memo } from 'react';
import { FOODS } from '../../data/food';
import type { FoodDef, FoodId, FoodParticle } from '../../types/aquarium';
import { SCENE } from './geometry';

function Particle({ def }: { def: FoodDef }) {
  const s = def.size;
  switch (def.shape) {
    case 'sphere':
      return <circle r={s / 2} fill={def.color} stroke={def.colorDark} strokeWidth={0.8} />;
    case 'grain':
      return <ellipse rx={s / 2} ry={s / 3} fill={def.color} stroke={def.colorDark} strokeWidth={0.6} />;
    case 'cube':
      return <rect x={-s / 2} y={-s / 2} width={s} height={s} rx={1.5} fill={def.color} stroke={def.colorDark} strokeWidth={0.8} />;
    case 'worm':
      return <path d={`M${-s / 2},0 q${s / 4},${-s / 3} ${s / 2},0 q${s / 4},${s / 3} ${s / 2},0`} stroke={def.color} strokeWidth={2} fill="none" strokeLinecap="round" />;
    default:
      return <path d={`M${-s / 2},0 L0,${-s / 2} L${s / 2},${s / 6} L0,${s / 2} Z`} fill={def.color} opacity={0.92} />;
  }
}

/** Menu/inventory swatch. */
export const FoodIcon = memo(function FoodIcon({ food }: { food: FoodId }) {
  const def = FOODS[food];
  return (
    <svg viewBox="-16 -16 32 32" className="h-5 w-5" role="img" aria-label={def.name}>
      <g transform="translate(-6 -4)"><Particle def={def} /></g>
      <g transform="translate(5 2) rotate(24)"><Particle def={def} /></g>
      <g transform="translate(-1 8) rotate(-15)"><Particle def={def} /></g>
    </svg>
  );
});

/** Food falls from the surface to the substrate, then settles as debris. */
export const FoodLayer = memo(function FoodLayer({ particles }: { particles: FoodParticle[] }) {
  return (
    <g className="layer-food">
      {particles.map((p) => {
        const def = FOODS[p.food];
        return (
          <g key={p.id} transform={`translate(${p.x} ${SCENE.surfaceY + 8})`}>
            <g
              className="food-sink"
              style={{
                ['--drop' as string]: `${SCENE.floorY - SCENE.surfaceY - 16}px`,
                ['--spin' as string]: `${p.spin}deg`,
                animationDuration: `${def.sinkSeconds}s`,
                animationDelay: `${p.delay}s`
              }}
            >
              <Particle def={def} />
            </g>
          </g>
        );
      })}
    </g>
  );
});
