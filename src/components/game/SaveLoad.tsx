import { useRef } from 'react';
import type { GameState } from '../../types/game';
import { downloadSave, readSaveFile } from '../../lib/save';

interface Props {
  state: GameState;
  onLoad: (state: GameState) => void;
  onNotice: (message: string) => void;
}

export function SaveLoad({ state, onLoad, onNotice }: Props) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onNotice(`Saved ${downloadSave(state)}`)}
        className="rounded-md border border-walnut/20 px-3 py-1.5 text-[13px] text-walnut-light transition-colors hover:border-walnut/45 hover:text-ink"
      >
        Save to file
      </button>
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="rounded-md border border-walnut/20 px-3 py-1.5 text-[13px] text-walnut-light transition-colors hover:border-walnut/45 hover:text-ink"
      >
        Load file
      </button>
      <input
        ref={input}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) return;
          const loaded = await readSaveFile(file);
          if (loaded) {
            onLoad(loaded);
            onNotice(`Loaded day ${loaded.day}`);
          } else {
            onNotice("That file isn't an Aquarium Keeper save.");
          }
        }}
      />
    </div>
  );
}
