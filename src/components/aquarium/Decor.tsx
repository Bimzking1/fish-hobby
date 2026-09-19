import { memo } from 'react';
import type { RockInstance, RockTone } from '../../types/aquarium';
import { SCENE } from './geometry';

const TONES: Record<RockTone, { base: string; hi: string }> = {
  pale: { base: '#A69B8E', hi: '#C9BEB0' },
  dark: { base: '#5A564F', hi: '#7A756C' },
  coal: { base: '#3A3733', hi: '#57524C' }
};

/** Deterministic -0.5..0.5 jitter from a seed. */
function j(seed: number, i: number): number {
  return (((seed * (i + 3) * 31) % 100) / 100 - 0.5);
}

function Rock({ x, y, size, tone, seed }: { x: number; y: number; size: number; tone: RockTone; seed: number }) {
  const c = TONES[tone];
  const pts = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2;
    const r = size * (0.65 + 0.35 * (0.5 + j(seed, i)));
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * (r * 0.78);
    return `${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(' ');
  const e = j(seed, 2) * 5;
  return (
    <g>
      <polygon points={pts} fill={c.base} stroke="#00000022" strokeWidth={1.2} />
      <polygon points={`${x - size * 0.5},${y - size * 0.1} ${x - size * 0.15},${y - size * 0.42} ${x + size * 0.2},${y - size * 0.28}`} fill={c.hi} opacity={0.5} />
      <ellipse cx={x + e} cy={y + size * 0.42} rx={size * 0.7} ry={5.5} fill="#000000" opacity={0.18} />
    </g>
  );
}

function Driftwood({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-52,-14 C-30,-30 -6,-26 16,-16 C34,-8 50,-10 60,-4 L56,-2 C46,-6 32,-4 16,-10 C-2,-16 -24,-12 -46,-8 Z" fill="#8A6D4B" stroke="#6B5236" strokeWidth={1.4} />
      <path d="M16,-16 C34,-8 50,-10 60,-4" stroke="#A98C66" strokeWidth={2.4} fill="none" opacity={0.7} />
      <path d="M-40,-6 C-46,2 -44,8 -40,14 M30,-8 C32,2 28,10 32,16" stroke="#7C6244" strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={4} cy={14} rx={34} ry={5} fill="#000000" opacity={0.2} />
    </g>
  );
}

function Cave({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={-6} rx={48} ry={34} fill="#3B332C" />
      <ellipse cx={0} cy={2} rx={38} ry={26} fill="#171310" />
      <path d="M-52,-4 A48 34 0 0 1 52,-4 L52,6 L-52,6 Z" fill="#4B4239" />
      <path d="M-52,-4 C-20,-22 20,-22 52,-4" stroke="#5E5448" strokeWidth={4} fill="none" />
      <ellipse cx={0} cy={7} rx={40} ry={6} fill="#000000" opacity={0.35} />
    </g>
  );
}

/** Hardscape, all of it purchased piece by piece. It sits on the substrate
 *  surface, so it rises and falls with the soil coverage. */
export const DecorLayer = memo(function DecorLayer({ rocks, surface }: { rocks: RockInstance[]; surface: number }) {
  return (
    <g className="layer-decor">
      {rocks.map((r) => {
        const key = `decor-${r.def}-${r.id}`;
        const y = surface + (r.y - SCENE.floorY);
        if (r.def === 'driftwood') {
          return <Driftwood key={key} x={r.x} y={y} scale={r.scale} />;
        }
        if (r.def === 'cave') {
          return <Cave key={key} x={r.x} y={y} scale={r.scale} />;
        }
        const tone = r.def === 'lava-rock' ? 'coal' : r.def === 'slate' ? 'dark' : 'pale';
        return <Rock key={key} x={r.x} y={y} size={26 * r.scale} tone={tone} seed={r.seed} />;
      })}
      {rocks.length === 0 && (
        <text x={SCENE.width / 2} y={SCENE.floorY - 40} textAnchor="middle" fill="#8A8A88" opacity={0.5} fontSize={16}>
          Dry, empty tank — add water and hardscape from the shop.
        </text>
      )}
    </g>
  );
});