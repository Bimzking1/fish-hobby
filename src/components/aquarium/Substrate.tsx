import { memo } from 'react';
import { SUBSTRATES } from '../../data/substrates';
import type { SubstrateId } from '../../types/aquarium';
import { mulberry32, range } from '../../lib/rng';
import { SCENE, bedSurface } from './geometry';

/**
 * The substrate bed. It fills from the bottom of the tank upward: a single bag
 * (25% coverage) is a thin layer on the glass, and the top surface rises toward
 * SCENE.floorY as you add more. Rocks and rooted plants sit on bedSurface.
 */
export const Substrate = memo(function Substrate({ id, coverage, mulm }: { id: SubstrateId; coverage: number; mulm: number }) {
  const def = SUBSTRATES[id];
  const rand = mulberry32(id.length * 977 + 13);
  const top = bedSurface(coverage);
  const grains = Array.from({ length: Math.round(def.density * (0.25 + 0.75 * (coverage / 100))) }, () => ({
    x: range(rand, 0, SCENE.width),
    y: range(rand, top + 8, SCENE.height - 6),
    r: range(rand, def.grainSize * 0.5, def.grainSize),
    light: rand() > 0.5
  }));
  const debris = Array.from({ length: Math.round(mulm * 70) }, () => ({
    x: range(rand, 10, SCENE.width - 10),
    y: range(rand, top - 2, top + 16),
    r: range(rand, 1.2, 3.4)
  }));

  return (
    <g className="layer-substrate">
      <path
        d={`M0,${top} C${SCENE.width * 0.18},${top - 18} ${SCENE.width * 0.42},${top + 8} ${SCENE.width * 0.6},${top - 8} C${SCENE.width * 0.78},${top - 20} ${SCENE.width * 0.92},${top + 6} ${SCENE.width},${top - 4} L${SCENE.width},${SCENE.height} L0,${SCENE.height} Z`}
        fill={def.base}
      />
      <path
        d={`M0,${top + 26} C${SCENE.width * 0.3},${top + 14} ${SCENE.width * 0.6},${top + 42} ${SCENE.width},${top + 22} L${SCENE.width},${SCENE.height} L0,${SCENE.height} Z`}
        fill={def.shade}
        opacity={0.55}
      />
      <g>
        {grains.map((g, i) => (
          <circle key={i} cx={g.x} cy={g.y} r={g.r} fill={g.light ? def.grain : def.shade} opacity={0.8} />
        ))}
      </g>
      <g fill="#4A3B2A" opacity={0.42}>
        {debris.map((d, i) => (
          <ellipse key={i} cx={d.x} cy={d.y} rx={d.r * 1.6} ry={d.r} />
        ))}
      </g>
    </g>
  );
});