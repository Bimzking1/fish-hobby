import { memo } from 'react';
import { mulberry32, range } from '../../lib/rng';
import { SCENE } from './geometry';

/** Algae film, glass grime and drifting particles — the "time passing" layer. */
export const Effects = memo(function Effects({ algae, glassDirt }: { algae: number; glassDirt: number }) {
  const rand = mulberry32(4242);
  const patches = Array.from({ length: Math.round(algae * 26) }, () => ({
    x: range(rand, 20, SCENE.width - 20),
    y: range(rand, SCENE.surfaceY + 30, SCENE.floorY),
    r: range(rand, 8, 26)
  }));
  const smears = Array.from({ length: Math.round(glassDirt * 14) }, () => ({
    x: range(rand, 0, SCENE.width),
    y: range(rand, SCENE.surfaceY, SCENE.floorY),
    w: range(rand, 40, 120),
    h: range(rand, 10, 34)
  }));
  const motes = Array.from({ length: 22 }, (_, i) => ({
    x: range(rand, 10, SCENE.width - 10),
    y: range(rand, SCENE.surfaceY + 20, SCENE.floorY - 20),
    r: range(rand, 0.8, 2),
    d: 7 + (i % 6)
  }));

  return (
    <g className="layer-effects" pointerEvents="none">
      <g fill="#4E7A3A" opacity={0.3}>
        {patches.map((p, i) => (
          <ellipse key={i} cx={p.x} cy={p.y} rx={p.r} ry={p.r * 0.6} />
        ))}
      </g>
      <g fill="#8FA08A" opacity={0.2}>
        {smears.map((s, i) => (
          <ellipse key={i} cx={s.x} cy={s.y} rx={s.w / 2} ry={s.h / 2} />
        ))}
      </g>
      <g fill="#FFFFFF" opacity={0.3}>
        {motes.map((m, i) => (
          <circle key={i} className="mote-drift" cx={m.x} cy={m.y} r={m.r} style={{ animationDuration: `${m.d}s`, animationDelay: `${-i * 0.7}s` }} />
        ))}
      </g>
    </g>
  );
});
