import { memo } from 'react';
import { SUBSTRATES } from '../../data/backgrounds';
import type { SubstrateId } from '../../types/aquarium';
import { mulberry32, range } from '../../lib/rng';
import { SCENE } from './geometry';

/** Substrate bed plus the mulm that settles on top of it over time. */
export const Substrate = memo(function Substrate({ substrate, mulm }: { substrate: SubstrateId; mulm: number }) {
  const def = SUBSTRATES[substrate];
  const rand = mulberry32(substrate.length * 977 + 13);
  const top = SCENE.floorY;
  const grains = Array.from({ length: def.density }, () => ({
    x: range(rand, 0, SCENE.width),
    y: range(rand, top + 6, SCENE.height - 6),
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
        d={`M0,${top + 26} C${SCENE.width * 0.18},${top - 14} ${SCENE.width * 0.42},${top + 4} ${SCENE.width * 0.6},${top - 6} C${SCENE.width * 0.78},${top - 16} ${SCENE.width * 0.9},${top + 8} ${SCENE.width},${top - 2} L${SCENE.width},${SCENE.height} L0,${SCENE.height} Z`}
        fill={def.base}
      />
      <path
        d={`M0,${top + 44} C${SCENE.width * 0.3},${top + 18} ${SCENE.width * 0.6},${top + 48} ${SCENE.width},${top + 26} L${SCENE.width},${SCENE.height} L0,${SCENE.height} Z`}
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
