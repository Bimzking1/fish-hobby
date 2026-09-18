import { memo } from 'react';
import { PLANT_SPECIES, PLANT_STAGE_STYLE } from '../../data/plants';
import type { PlantInstance, PlantSpecies, PlantSpeciesId, PlantStage } from '../../types/aquarium';
import { mulberry32, range } from '../../lib/rng';
import { SCENE } from './geometry';

/** A single leaf, base at (0,0), tip at (0,-length) before rotation. */
function leaf(length: number, width: number, bend: number): string {
  const tipX = bend;
  const tipY = -length;
  return `M0,0 C${-width},${-length * 0.35} ${tipX - width * 0.7},${-length * 0.78} ${tipX},${tipY} C${tipX + width * 0.7},${-length * 0.78} ${width},${-length * 0.35} 0,0 Z`;
}

function ribbon(length: number, width: number, bend: number): string {
  return `M${-width / 2},0 C${-width / 2 + bend * 0.2},${-length * 0.5} ${bend - width},${-length * 0.85} ${bend},${-length} C${bend + width * 0.6},${-length * 0.85} ${width / 2},${-length * 0.4} ${width / 2},0 Z`;
}

function PlantShape({ species, seed, droop }: { species: PlantSpecies; seed: number; droop: number }) {
  const rand = mulberry32(seed);
  const { palette, height, spread, leaves, form } = species;

  if (form === 'moss') {
    const tufts = Array.from({ length: leaves }, () => ({
      x: range(rand, -spread / 2, spread / 2),
      y: range(rand, -height * 0.9, 0),
      r: range(rand, 5, 11),
      dark: rand() > 0.55
    }));
    return (
      <g>
        {tufts.map((t, i) => (
          <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.dark ? palette.leafDark : palette.leaf} opacity={0.92} />
        ))}
      </g>
    );
  }

  if (form === 'feather') {
    const stems = Array.from({ length: leaves }, (_, i) => {
      const lean = range(rand, -18, 18) + (i - leaves / 2) * 4;
      const len = height * range(rand, 0.68, 1);
      return { lean, len, whorls: Math.round(len / 22) };
    });
    return (
      <g>
        {stems.map((s, i) => (
          <g key={i} transform={`rotate(${s.lean + droop * 0.4})`}>
            <path d={`M0,0 C${s.lean * 0.2},${-s.len * 0.5} ${s.lean * 0.5},${-s.len * 0.8} ${s.lean * 0.6},${-s.len}`} stroke={palette.stem} strokeWidth={2.4} fill="none" strokeLinecap="round" />
            {Array.from({ length: s.whorls }, (_, w) => {
              const y = -(w + 1) * (s.len / (s.whorls + 1));
              const x = s.lean * 0.6 * (-y / s.len);
              return (
                <g key={w} transform={`translate(${x} ${y})`}>
                  <path d={`M0,0 L-13,-7 M0,0 L-9,5 M0,0 L13,-7 M0,0 L9,5 M0,0 L0,-11`} stroke={palette.leaf} strokeWidth={1.9} strokeLinecap="round" fill="none" />
                </g>
              );
            })}
          </g>
        ))}
      </g>
    );
  }

  const blades = Array.from({ length: leaves }, (_, i) => {
    const t = leaves === 1 ? 0.5 : i / (leaves - 1);
    const angle = (t - 0.5) * (form === 'ribbon' ? 34 : 118) + range(rand, -6, 6);
    const len = height * range(rand, 0.66, 1);
    const width = form === 'ribbon' ? 11 : form === 'rosette' ? 22 : 16;
    const bend = range(rand, -12, 12) + droop * (form === 'ribbon' ? 1.6 : 0.8);
    return { angle, len, width, bend, dark: i % 3 === 0 };
  });

  return (
    <g>
      {blades.map((b, i) => (
        <g key={i} transform={`rotate(${b.angle + droop * 0.5})`}>
          <path
            d={form === 'ribbon' ? ribbon(b.len, b.width, b.bend) : leaf(b.len, b.width, b.bend)}
            fill={b.dark ? palette.leafDark : palette.leaf}
          />
          <path
            d={`M0,0 C${b.bend * 0.3},${-b.len * 0.5} ${b.bend * 0.8},${-b.len * 0.8} ${b.bend},${-b.len}`}
            stroke={palette.leafDark}
            strokeOpacity={0.45}
            strokeWidth={1.1}
            fill="none"
          />
        </g>
      ))}
    </g>
  );
}

/** Species preview for menus — draws upright in a 120x260 box. */
export const PlantIcon = memo(function PlantIcon({ species, stage = 'mature' }: { species: PlantSpeciesId; stage?: PlantStage }) {
  const def = PLANT_SPECIES[species];
  const style = PLANT_STAGE_STYLE[stage];
  return (
    <svg viewBox="-60 -270 120 280" role="img" aria-label={def.name} className="h-full w-full">
      <g style={{ filter: `saturate(${style.saturation})`, opacity: style.opacity }} transform={`scale(${style.scale})`}>
        <PlantShape species={def} seed={7} droop={style.droop} />
      </g>
    </svg>
  );
});

export const Plant = memo(function Plant({ plant }: { plant: PlantInstance }) {
  const def = PLANT_SPECIES[plant.species];
  const style = PLANT_STAGE_STYLE[plant.stage];
  const x = SCENE.wallX + 40 + plant.x * (SCENE.width - SCENE.wallX * 2 - 80);
  const floating = def.form === 'floating';
  const y = floating ? SCENE.surfaceY + 10 : SCENE.floorY + 6;

  return (
    <g
      className={floating ? 'plant-float' : 'plant-sway'}
      style={{ animationDuration: `${6 + (plant.seed % 5)}s`, animationDelay: `${-(plant.seed % 7)}s`, transformOrigin: `${x}px ${y}px` }}
    >
      <g transform={`translate(${x} ${y}) scale(${style.scale * plant.scale})`} style={{ filter: `saturate(${style.saturation})`, opacity: style.opacity }}>
        {floating ? (
          <g>
            {Array.from({ length: def.leaves }, (_, i) => {
              const rand = mulberry32(plant.seed + i);
              return (
                <ellipse
                  key={i}
                  cx={range(rand, -def.spread, def.spread)}
                  cy={range(rand, -6, 6)}
                  rx={range(rand, 5, 9)}
                  ry={range(rand, 3, 5)}
                  fill={i % 3 === 0 ? def.palette.leafDark : def.palette.leaf}
                />
              );
            })}
          </g>
        ) : (
          <PlantShape species={def} seed={plant.seed} droop={style.droop} />
        )}
      </g>
    </g>
  );
});

export function PlantLayer({ plants }: { plants: PlantInstance[] }) {
  return (
    <g className="layer-plants">
      {plants.map((p) => (
        <Plant key={p.id} plant={p} />
      ))}
    </g>
  );
}
