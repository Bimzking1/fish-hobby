import type { ReactNode } from 'react';
import { TANKS } from '../../data/tanks';
import type { TankSizeId } from '../../types/aquarium';
import { SCENE } from './geometry';

/** Glass box, rim and cabinet. Children render clipped inside the water box. */
export function Tank({ tank, children }: { tank: TankSizeId; children: ReactNode }) {
  const def = TANKS[tank];
  const inset = def.glassInset;
  const innerW = SCENE.width - inset * 2;

  return (
    <g>
      <defs>
        <clipPath id="tank-clip">
          <rect x={inset} y={12} width={innerW} height={SCENE.height - 12} rx={6} />
        </clipPath>
        <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.3} />
          <stop offset="34%" stopColor="#FFFFFF" stopOpacity={0.04} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.12} />
        </linearGradient>
      </defs>

      <rect x={inset - 10} y={4} width={innerW + 20} height={SCENE.height - 4} rx={10} fill="#2A211B" />
      <g clipPath="url(#tank-clip)">
        <g transform={`translate(${inset} 0) scale(${innerW / SCENE.width} 1)`}>{children}</g>
      </g>
      <rect x={inset} y={12} width={innerW} height={SCENE.height - 12} rx={6} fill="url(#glass-sheen)" pointerEvents="none" />
      <rect x={inset} y={12} width={innerW} height={SCENE.height - 12} rx={6} fill="none" stroke="#1F1913" strokeWidth={2} opacity={0.5} />
      <rect x={inset - 12} y={0} width={innerW + 24} height={22} rx={6} fill="#33281F" />
      <rect x={inset - 12} y={0} width={innerW + 24} height={7} rx={3} fill="#4A3A2C" />
    </g>
  );
}
