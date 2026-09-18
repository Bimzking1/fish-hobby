import { memo } from 'react';
import { mulberry32, range } from '../../lib/rng';
import { SCENE } from './geometry';

interface RockProps { x: number; y: number; size: number; tone: 'pale' | 'dark' | 'coal'; seed: number }

const ROCK_TONES = {
  pale: { fill: '#9E948A', shade: '#7B7269', light: '#BDB3A6' },
  dark: { fill: '#5C5952', shade: '#403E39', light: '#767268' },
  coal: { fill: '#332F2C', shade: '#1D1B19', light: '#4A4541' }
} as const;

/** Angular boulder built from a seeded polygon so no two rocks repeat. */
export const Rock = memo(function Rock({ x, y, size, tone, seed }: RockProps) {
  const rand = mulberry32(seed);
  const palette = ROCK_TONES[tone];
  const points = Array.from({ length: 8 }, (_, i) => {
    const a = Math.PI + (i / 7) * Math.PI;
    const r = size * range(rand, 0.72, 1);
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r * 0.78).toFixed(1)}`;
  }).join(' ');

  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={2} rx={size * 1.05} ry={size * 0.2} fill="#000" opacity={0.18} />
      <polygon points={points} fill={palette.fill} />
      <polygon points={points} fill={palette.shade} opacity={0.5} transform="translate(6 4) scale(0.9)" />
      <path d={`M${-size * 0.5},${-size * 0.35} L${-size * 0.1},${-size * 0.62} L${size * 0.25},${-size * 0.3}`} stroke={palette.light} strokeWidth={2} fill="none" opacity={0.7} />
    </g>
  );
});

export const Driftwood = memo(function Driftwood({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0,0 C20,-14 44,-18 70,-40 C86,-54 96,-76 104,-96 C96,-72 92,-50 74,-32 C58,-16 28,-4 4,6 Z" fill="#5A4130" />
      <path d="M30,-10 C46,-24 56,-46 58,-70 C62,-48 54,-24 40,-8 Z" fill="#6E5039" />
      <path d="M62,-44 C76,-52 92,-56 104,-52 C90,-46 76,-40 66,-34 Z" fill="#48331F" />
    </g>
  );
});

export const Cave = memo(function Cave({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-52,0 C-50,-42 -26,-64 0,-64 C26,-64 50,-42 52,0 Z" fill="#6B6257" />
      <path d="M-22,0 C-22,-26 -10,-36 0,-36 C10,-36 22,-26 22,0 Z" fill="#191614" />
      <path d="M-52,0 C-50,-42 -26,-64 0,-64 C10,-64 20,-60 28,-52 C10,-56 -20,-46 -32,-16 Z" fill="#847A6D" opacity={0.6} />
    </g>
  );
});

/** Static hardscape arrangement. Swap freely — nothing else depends on it. */
export function DecorLayer() {
  const floor = SCENE.floorY;
  return (
    <g className="layer-decor">
      <Rock x={148} y={floor + 14} size={54} tone="dark" seed={11} />
      <Rock x={206} y={floor + 20} size={30} tone="pale" seed={23} />
      <Cave x={812} y={floor + 16} scale={0.9} />
      <Driftwood x={560} y={floor + 10} scale={1.05} />
      <Rock x={430} y={floor + 22} size={22} tone="coal" seed={41} />
      <Rock x={690} y={floor + 18} size={18} tone="pale" seed={57} />
      <Rock x={92} y={floor + 24} size={16} tone="coal" seed={67} />
    </g>
  );
}
