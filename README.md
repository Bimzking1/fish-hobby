# Aquarium Keeper — visual foundation

Frontend-only aquarium hobby simulator. This phase delivers the UI slicing and the
SVG asset system; the simulation is intentionally a thin stub for the next agent.

```bash
npm install
npm run dev
```

## Where things live

- `src/components/aquarium/` — the scene. `AquariumScene` composes `Tank` →
  `Background`, `Water`, `Decor`, `Plants`, `Equipment`, `Snails`, `Fish`, `Food`,
  `Effects`, `Substrate`. Every asset is its own component and reads from data.
- `src/data/` — species, plants, snails, equipment, food, substrates, backgrounds.
  Adding a fish means adding one entry to `data/fish.ts`; no component changes.
- `src/types/` — `fish.ts`, `aquarium.ts`, `game.ts`.
- `src/simulation/endDay.ts` — the stub to replace. It takes a `GameState` and
  returns `{ state, report }`. Nothing else in the app computes simulation values.
- `src/lib/` — deterministic rng, localStorage autosave, JSON save file I/O.

## Scene coordinate system

The tank renders in a `0 0 1000 600` viewBox. Water surface sits at `y = 46`,
substrate top at `y = 512`. Helpers in `src/components/aquarium/geometry.ts`.

## Save format

Versioned (`SAVE_VERSION` in `src/lib/save.ts`). Autosaves to localStorage on every
state change; `Save to file` downloads `aquarium-save-day-N.json`.
