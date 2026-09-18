import { Meter } from '../ui/Meter';
import { Panel } from '../ui/Panel';
import type { Metrics } from '../../types/game';

const LABELS: [keyof Metrics, string][] = [
  ['fishHealth', 'Fish health'],
  ['waterQuality', 'Water quality'],
  ['plantHealth', 'Plant health'],
  ['stability', 'Stability'],
  ['aesthetics', 'Aesthetics']
];

export function AquariumStatus({ metrics }: { metrics: Metrics }) {
  return (
    <Panel title="Aquarium status">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {LABELS.map(([key, label]) => (
          <Meter key={key} label={label} value={metrics[key]} />
        ))}
      </div>
    </Panel>
  );
}
