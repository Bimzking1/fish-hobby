import { memo } from 'react';
import { FISH_SPECIES } from '../../data/fish';
import type { FishCondition, FishInstance, FishPattern, FishSpecies, FishSpeciesId } from '../../types/fish';
import { lerp, zoneBand, SCENE } from './geometry';

/** Every condition is a pure visual modifier — no simulation lives here. */
const CONDITION_STYLE: Record<FishCondition, {
  filter: string;
  opacity: number;
  speed: number;
  tilt: number;
  finBeat: number;
}> = {
  healthy: { filter: 'none', opacity: 1, speed: 1, tilt: 0, finBeat: 1 },
  stressed: { filter: 'saturate(0.7) brightness(0.88)', opacity: 0.97, speed: 1.5, tilt: 0, finBeat: 1.5 },
  sick: { filter: 'saturate(0.42) brightness(1.06)', opacity: 0.92, speed: 2.1, tilt: 4, finBeat: 2.1 },
  fungus: { filter: 'saturate(0.5) brightness(0.98)', opacity: 0.94, speed: 2.3, tilt: 6, finBeat: 2.3 },
  critical: { filter: 'saturate(0.28) brightness(0.92)', opacity: 0.88, speed: 3.4, tilt: 14, finBeat: 3.2 },
  dead: { filter: 'saturate(0.12) brightness(0.9)', opacity: 0.72, speed: 0, tilt: 180, finBeat: 0 }
};

function Pattern({ species, pattern, clipId }: { species: FishSpecies; pattern: FishPattern; clipId: string }) {
  const { accent } = species.palette;
  switch (pattern) {
    case 'stripes':
      return (
        <g clipPath={`url(#${clipId})`} fill={accent} opacity={0.5}>
          <path d="M16,0 L28,0 L20,60 L8,60 Z" />
          <path d="M40,0 L52,0 L44,60 L32,60 Z" />
          <path d="M62,0 L72,0 L64,60 L54,60 Z" />
        </g>
      );
    case 'bands':
      return (
        <g clipPath={`url(#${clipId})`} fill={accent} opacity={0.34}>
          <rect x="46" y="0" width="12" height="60" />
          <rect x="66" y="0" width="8" height="60" />
        </g>
      );
    case 'neon':
      return (
        <g clipPath={`url(#${clipId})`}>
          <rect x="4" y="24" width="72" height="5" fill="#4FE3F5" opacity={0.95} />
          <rect x="34" y="31" width="46" height="6" fill={accent} opacity={0.9} />
        </g>
      );
    case 'spots':
      return (
        <g clipPath={`url(#${clipId})`} fill={accent} opacity={0.55}>
          <circle cx="42" cy="26" r="5" />
          <circle cx="56" cy="33" r="4" />
          <circle cx="66" cy="24" r="3.4" />
          <circle cx="30" cy="35" r="3" />
        </g>
      );
    case 'mottle':
      return (
        <g clipPath={`url(#${clipId})`} fill={accent} opacity={0.3}>
          <ellipse cx="34" cy="22" rx="14" ry="6" />
          <ellipse cx="58" cy="35" rx="16" ry="7" />
          <ellipse cx="70" cy="22" rx="9" ry="5" />
        </g>
      );
    default:
      return null;
  }
}

interface FishProps {
  /** Species-only rendering for shop rows and the stocking list. */
  species: FishSpeciesId;
  condition?: FishCondition;
  /** Local-box id suffix; must be unique per rendered fish. */
  uid: string;
  finBeatSeconds?: number;
}

/** The fish itself, drawn in its own 100x60 box. Position is the caller's job. */
export const FishBody = memo(function FishBody({ species, condition = 'healthy', uid, finBeatSeconds = 1.1 }: FishProps) {
  const def = FISH_SPECIES[species];
  const { shape, palette } = def;
  const mods = CONDITION_STYLE[condition];
  const clipId = `fish-clip-${uid}`;
  const bellyId = `fish-belly-${uid}`;
  const beat = mods.finBeat === 0 ? 0 : finBeatSeconds / mods.finBeat;

  return (
    <g style={{ filter: mods.filter, opacity: mods.opacity }}>
      <defs>
        <clipPath id={clipId}>
          <path d={shape.body} />
        </clipPath>
        <linearGradient id={bellyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.body} />
          <stop offset="62%" stopColor={palette.body} />
          <stop offset="100%" stopColor={palette.belly} />
        </linearGradient>
      </defs>

      <g fill={palette.fin} opacity={def.finOpacity}>
        <path className="fin-beat" style={beat ? { animationDuration: `${beat * 1.2}s` } : undefined} d={shape.tail} />
        <path d={shape.dorsal} />
        <path d={shape.anal} />
      </g>

      <path d={shape.body} fill={`url(#${bellyId})`} />
      <Pattern species={def} pattern={def.pattern} clipId={clipId} />
      <path d={shape.body} fill="none" stroke={palette.accent} strokeOpacity={0.28} strokeWidth={1.4} />

      <path
        className="fin-beat"
        style={beat ? { animationDuration: `${beat}s` } : undefined}
        d={shape.pectoral}
        fill={palette.fin}
        opacity={def.finOpacity * 0.9}
      />

      {condition === 'fungus' && (
        <g clipPath={`url(#${clipId})`} fill="#F2F0EA" opacity={0.85}>
          <circle cx="26" cy="24" r="6" />
          <circle cx="33" cy="30" r="4.5" />
          <circle cx="62" cy="34" r="5" />
        </g>
      )}

      <circle cx={shape.eye.x} cy={shape.eye.y} r={shape.eye.r} fill="#FBF8F2" />
      <circle cx={shape.eye.x + 0.6} cy={shape.eye.y} r={shape.eye.r * 0.58} fill="#1A1714" />
      {condition !== 'dead' && (
        <circle cx={shape.eye.x - 0.8} cy={shape.eye.y - 1} r={shape.eye.r * 0.22} fill="#FFFFFF" />
      )}
    </g>
  );
});

/** A fish placed and animated inside the scene. */
export const SwimmingFish = memo(function SwimmingFish({ fish }: { fish: FishInstance }) {
  const def = FISH_SPECIES[fish.species];
  const mods = CONDITION_STYLE[fish.condition];
  const dead = fish.condition === 'dead';
  const [top, bottom] = zoneBand(def.zone);
  const y = dead ? SCENE.surfaceY + 20 : lerp(top, bottom, fish.depth);
  const scale = (def.length / 100) * fish.scale;
  const travel = SCENE.width - def.length - 90;
  const startX = 50 + fish.phase * travel * 0.9;
  const lapSeconds = def.lapSeconds * (mods.speed === 0 ? 1 : mods.speed);

  return (
    <g
      className={dead ? undefined : 'fish-lap'}
      style={{
        ['--x0' as string]: `${startX}px`,
        ['--lap' as string]: `${travel - startX + 50}px`,
        animationDuration: `${lapSeconds}s`,
        animationDelay: `${-fish.phase * lapSeconds}s`,
        transform: dead ? `translateX(${startX}px)` : undefined
      }}
    >
      <g transform={`translate(0 ${y})`}>
        <g className={dead ? 'fish-float' : 'fish-bob'} style={{ animationDuration: `${lapSeconds / 3.5}s` }}>
          <g transform={`scale(${scale}) translate(0 -30) rotate(${mods.tilt} 50 30)`}>
            <FishBody species={fish.species} condition={fish.condition} uid={fish.id} />
          </g>
        </g>
      </g>
    </g>
  );
});

export function FishLayer({ fish }: { fish: FishInstance[] }) {
  return (
    <g className="layer-fish">
      {fish.map((f) => (
        <SwimmingFish key={f.id} fish={f} />
      ))}
    </g>
  );
}
