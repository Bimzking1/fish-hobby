import { memo } from 'react';
import { EQUIPMENT } from '../../data/equipment';
import type { EquipmentId, EquipmentInstance } from '../../types/aquarium';
import { SCENE } from './geometry';

const STEEL = '#B9BDBB';
const CASE = '#2F3336';
const CASE_LIGHT = '#484D50';

function BubbleColumn({ count, spread, height, size = 3.6 }: { count: number; spread: number; height: number; size?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          className="bubble-rise"
          cx={((i * 37) % spread) - spread / 2}
          cy={0}
          r={size * (0.6 + ((i * 13) % 7) / 10)}
          fill="#FFFFFF"
          opacity={0.6}
          style={{
            ['--rise' as string]: `${height}px`,
            animationDuration: `${2.6 + (i % 5) * 0.4}s`,
            animationDelay: `${-(i % 9) * 0.45}s`
          }}
        />
      ))}
    </g>
  );
}

/** Each piece draws around its own origin; the mount decides where that lands. */
function Piece({ id, powered }: { id: EquipmentId; powered: boolean }) {
  switch (id) {
    case 'heater':
      return (
        <g>
          <rect x={-9} y={0} width={18} height={150} rx={9} fill="#D9E3E6" opacity={0.55} stroke={STEEL} strokeWidth={1.5} />
          <rect x={-9} y={0} width={18} height={26} rx={8} fill={CASE} />
          <rect x={-3} y={30} width={6} height={104} rx={3} fill="#C96A3C" />
          <circle cx={0} cy={13} r={3} fill={powered ? '#F05A3C' : '#6C6F70'} className={powered ? 'pulse-soft' : undefined} />
        </g>
      );
    case 'thermometer':
      return (
        <g>
          <rect x={-6} y={0} width={12} height={92} rx={6} fill="#EAF1F2" opacity={0.7} stroke={STEEL} strokeWidth={1.2} />
          <rect x={-1.6} y={12} width={3.2} height={62} fill="#C03A32" />
          <circle cx={0} cy={80} r={5} fill="#C03A32" />
        </g>
      );
    case 'air-stone':
      return (
        <g>
          <rect x={-22} y={-9} width={44} height={14} rx={5} fill="#6E7B7E" />
          <rect x={-22} y={-9} width={44} height={5} rx={2.5} fill="#8E9A9C" />
          <path d="M0,-9 C2,-30 -6,-52 -4,-74" stroke="#C8CFCB" strokeWidth={3} fill="none" opacity={0.75} />
          {powered && <g transform="translate(0 -12)"><BubbleColumn count={14} spread={40} height={SCENE.floorY - SCENE.surfaceY - 40} /></g>}
        </g>
      );
    case 'bubble-diffuser':
      return (
        <g>
          <rect x={-90} y={-7} width={180} height={12} rx={5} fill="#5F6B6E" />
          {powered && <g transform="translate(0 -10)"><BubbleColumn count={26} spread={170} height={SCENE.floorY - SCENE.surfaceY - 50} size={2.6} /></g>}
        </g>
      );
    case 'sponge-filter':
      return (
        <g>
          <rect x={-20} y={-58} width={40} height={58} rx={12} fill="#6D7F72" />
          <rect x={-20} y={-58} width={40} height={58} rx={12} fill="none" stroke="#4E5B52" strokeWidth={2} />
          <rect x={-5} y={-92} width={10} height={40} rx={4} fill={CASE_LIGHT} />
          {powered && <g transform="translate(0 -92)"><BubbleColumn count={8} spread={14} height={SCENE.floorY - SCENE.surfaceY - 130} size={3} /></g>}
        </g>
      );
    case 'internal-filter':
      return (
        <g>
          <rect x={-18} y={-150} width={36} height={150} rx={8} fill={CASE} />
          <rect x={-12} y={-140} width={24} height={40} rx={4} fill={CASE_LIGHT} />
          <path d="M-12,-118 h24 M-12,-108 h24 M-12,-98 h24" stroke="#7E8487" strokeWidth={3} />
          <circle cx={0} cy={-158} r={4} fill={powered ? '#5BD1A0' : '#6C6F70'} />
        </g>
      );
    case 'circulation-pump':
      return (
        <g>
          <circle cx={0} cy={0} r={22} fill={CASE} />
          <circle cx={0} cy={0} r={13} fill={CASE_LIGHT} />
          <g className={powered ? 'spin-slow' : undefined} style={{ transformOrigin: '0px 0px' }}>
            <path d="M0,-11 L5,0 L0,11 L-5,0 Z" fill="#9AA1A3" />
            <path d="M-11,0 L0,-5 L11,0 L0,5 Z" fill="#9AA1A3" />
          </g>
        </g>
      );
    case 'co2-diffuser':
      return (
        <g>
          <circle cx={0} cy={0} r={16} fill="#D8E6E4" opacity={0.6} stroke={STEEL} strokeWidth={1.5} />
          <circle cx={0} cy={4} r={10} fill="#A9C4C0" opacity={0.7} />
          <path d="M0,-16 C2,-40 -4,-60 -2,-84" stroke="#C8CFCB" strokeWidth={2.5} fill="none" opacity={0.7} />
          {powered && <g transform="translate(0 -6)"><BubbleColumn count={18} spread={22} height={SCENE.floorY - SCENE.surfaceY - 120} size={1.8} /></g>}
        </g>
      );
    case 'hob-filter':
      return (
        <g>
          <rect x={-46} y={-64} width={92} height={64} rx={6} fill={CASE} />
          <rect x={-40} y={-56} width={80} height={16} rx={4} fill={CASE_LIGHT} />
          <path d="M-30,0 C-30,26 -18,34 0,36 L34,36 L34,26 L4,26 C-12,24 -20,16 -20,0 Z" fill={CASE} />
          {powered && <path d="M34,26 C40,40 40,52 36,62" stroke="#DCEFF3" strokeWidth={5} fill="none" opacity={0.55} strokeLinecap="round" />}
        </g>
      );
    case 'canister-filter':
      return (
        <g>
          <path d="M-6,0 C-6,60 -10,120 -8,180" stroke="#8C9694" strokeWidth={7} fill="none" opacity={0.8} />
          <path d="M18,0 C18,60 22,120 20,180" stroke="#8C9694" strokeWidth={7} fill="none" opacity={0.8} />
          <rect x={-16} y={172} width={22} height={26} rx={4} fill={CASE} />
          <rect x={10} y={172} width={22} height={26} rx={4} fill={CASE} />
        </g>
      );
    case 'led-bar':
    case 'aquarium-lamp':
      return (
        <g>
          <rect x={-190} y={-18} width={380} height={18} rx={6} fill={id === 'led-bar' ? '#3A3F42' : '#4A3B2E'} />
          {powered && <rect x={-182} y={-4} width={364} height={5} rx={2.5} fill="#FFF3C6" opacity={0.95} />}
        </g>
      );
    case 'cooling-fan':
      return (
        <g>
          <rect x={-26} y={-26} width={52} height={52} rx={6} fill={CASE} />
          <g className={powered ? 'spin-fast' : undefined} style={{ transformOrigin: '0px 0px' }}>
            <path d="M0,-18 C8,-12 8,-4 0,0 C-8,-4 -8,-12 0,-18 Z" fill="#9AA1A3" />
            <path d="M18,0 C12,8 4,8 0,0 C4,-8 12,-8 18,0 Z" fill="#9AA1A3" />
            <path d="M0,18 C-8,12 -8,4 0,0 C8,4 8,12 0,18 Z" fill="#9AA1A3" />
            <path d="M-18,0 C-12,-8 -4,-8 0,0 C-4,8 -12,8 -18,0 Z" fill="#9AA1A3" />
          </g>
        </g>
      );
    case 'feeding-ring':
      return (
        <g>
          <ellipse cx={0} cy={0} rx={34} ry={11} fill="none" stroke="#CFC6B4" strokeWidth={5} />
          <ellipse cx={0} cy={0} rx={34} ry={11} fill="#FFFFFF" opacity={0.08} />
        </g>
      );
    case 'air-pump':
    case 'oxygen-regulator':
      return (
        <g>
          <rect x={-26} y={-20} width={52} height={40} rx={6} fill={CASE} />
          <circle cx={0} cy={0} r={9} fill={CASE_LIGHT} />
          <circle cx={0} cy={0} r={3.4} fill={powered ? '#5BD1A0' : '#6C6F70'} />
        </g>
      );
    default:
      return (
        <g>
          <rect x={-18} y={-10} width={36} height={20} rx={4} fill={CASE_LIGHT} />
        </g>
      );
  }
}

function mountTransform(mount: string, position: number): string {
  const inner = SCENE.width - SCENE.wallX * 2;
  switch (mount) {
    case 'glass-left': return `translate(${SCENE.wallX + 34 + position * 40} ${SCENE.surfaceY + 20})`;
    case 'glass-right': return `translate(${SCENE.width - SCENE.wallX - 48 - position * 40} ${SCENE.surfaceY + 150})`;
    case 'substrate': return `translate(${SCENE.wallX + 60 + position * (inner - 120)} ${SCENE.floorY + 6})`;
    case 'rim': return `translate(${SCENE.wallX + 60 + position * (inner - 120)} ${SCENE.surfaceY - 6})`;
    case 'back-wall': return `translate(${SCENE.wallX + 40 + position * (inner - 80)} ${SCENE.surfaceY + 10})`;
    default: return 'translate(-999 -999)';
  }
}

/** Only installed, in-tank equipment renders. Toolbox items stay in the UI. */
export const EquipmentLayer = memo(function EquipmentLayer({ equipment }: { equipment: EquipmentInstance[] }) {
  return (
    <g className="layer-equipment">
      {equipment
        .filter((e) => e.installed && EQUIPMENT[e.def].mount !== 'toolbox')
        .map((e) => (
          <g key={e.id} transform={mountTransform(EQUIPMENT[e.def].mount, e.position)}>
            <Piece id={e.def} powered={e.powered} />
          </g>
        ))}
    </g>
  );
});

/** Shop/equipment-panel icon for any piece, in a 120x120 box. */
export const EquipmentIcon = memo(function EquipmentIcon({ id }: { id: EquipmentId }) {
  return (
    <svg viewBox="-60 -60 120 120" className="h-full w-full" role="img" aria-label={EQUIPMENT[id].name}>
      <g transform="scale(0.5)">
        <Piece id={id} powered={false} />
      </g>
    </svg>
  );
});
