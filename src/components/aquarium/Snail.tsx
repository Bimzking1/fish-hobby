import { memo } from 'react';
import { SNAIL_SPECIES } from '../../data/snails';
import type { SnailInstance, SnailSpeciesId } from '../../types/aquarium';

/** Shell drawn as a spiral so each coil type reads differently at 20px. */
function shellPath(coil: 'flat' | 'cone' | 'tall', size: number): string {
  const turns = coil === 'flat' ? 2.8 : coil === 'tall' ? 3.4 : 2.4;
  const steps = 46;
  const pitch = coil === 'tall' ? 0.9 : coil === 'flat' ? 0 : 0.42;
  let d = '';
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    const r = size * 0.5 * (1 - t * 0.82);
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r * (coil === 'flat' ? 1 : 0.86) - t * size * pitch;
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return d.trim();
}

export const SnailBody = memo(function SnailBody({ species }: { species: SnailSpeciesId }) {
  const def = SNAIL_SPECIES[species];
  const s = def.size;
  return (
    <g>
      <path d={`M${-s * 0.75},${s * 0.42} q${s * 0.2},${s * 0.2} ${s * 0.7},${s * 0.16} h${s * 0.9} q${s * 0.4},0 ${s * 0.45},${-s * 0.2} z`} fill={def.foot} />
      <path d={`M${-s * 0.72},${s * 0.4} l${-s * 0.3},${-s * 0.34} M${-s * 0.6},${s * 0.42} l${-s * 0.34},${-s * 0.16}`} stroke={def.foot} strokeWidth={s * 0.11} strokeLinecap="round" />
      <circle cx={-s * 0.1} cy={s * 0.06} r={s * 0.52} fill={def.shell} />
      <path d={shellPath(def.coil, s)} transform={`translate(${-s * 0.1} ${s * 0.06})`} fill="none" stroke={def.shellDark} strokeWidth={s * 0.11} strokeLinecap="round" />
      <circle cx={-s * 0.28} cy={-s * 0.14} r={s * 0.16} fill="#FFFFFF" opacity={0.28} />
    </g>
  );
});

export const Snail = memo(function Snail({ snail }: { snail: SnailInstance }) {
  return (
    <g
      className="snail-crawl"
      style={{ animationDelay: `${-(snail.x % 9)}s`, transformOrigin: `${snail.x}px ${snail.y}px` }}
    >
      <g transform={`translate(${snail.x} ${snail.y}) scale(${snail.facing} 1)`}>
        <SnailBody species={snail.species} />
      </g>
    </g>
  );
});

export function SnailLayer({ snails }: { snails: SnailInstance[] }) {
  return (
    <g className="layer-snails">
      {snails.map((s) => (
        <Snail key={s.id} snail={s} />
      ))}
    </g>
  );
}
