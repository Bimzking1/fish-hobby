import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createInitialState } from '../data/initialState';
import { endDay as runEndDay } from '../simulation/endDay';
import type { FoodId, FoodParticle } from '../types/aquarium';
import type { ActionId, DailyReport, GameState } from '../types/game';
import { SCENE } from '../components/aquarium/geometry';
import { loadFromLocalStorage, saveToLocalStorage } from './save';
import { mulberry32, range } from './rng';

const ACTION_LABELS: Record<ActionId, string> = {
  feed: 'Fed the tank',
  'water-change': 'Changed 25% of the water',
  'clean-glass': 'Cleaned the glass',
  'check-water': 'Tested the water',
  'adjust-filter': 'Adjusted the filter',
  'adjust-oxygen': 'Adjusted aeration',
  lighting: 'Changed the lighting',
  medicine: 'Dosed medication',
  plants: 'Trimmed the plants',
  equipment: 'Serviced equipment'
};

let particleId = 0;

export function useGame() {
  const [state, setState] = useState<GameState>(() => loadFromLocalStorage() ?? createInitialState());
  const [food, setFood] = useState<FoodParticle[]>([]);
  const [report, setReport] = useState<DailyReport | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => saveToLocalStorage(state), [state]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const flash = useCallback((message: string) => {
    setNotice(message);
    timers.current.push(window.setTimeout(() => setNotice(null), 2600));
  }, []);

  const feed = useCallback((foodId: FoodId) => {
    const rand = mulberry32(Date.now() % 100000);
    const batch: FoodParticle[] = Array.from({ length: 16 }, () => ({
      id: `food-${particleId++}`,
      food: foodId,
      x: range(rand, 180, SCENE.width - 180),
      delay: range(rand, 0, 1.6),
      spin: range(rand, -240, 240)
    }));
    setFood((current) => [...current.slice(-40), ...batch]);
    timers.current.push(
      window.setTimeout(() => {
        setFood((current) => current.filter((p) => !batch.some((b) => b.id === p.id)));
      }, 14000)
    );
  }, []);

  const runAction = useCallback(
    (action: ActionId) => {
      setState((s) => {
        const next: GameState = {
          ...s,
          care: s.care.some((c) => c.action === action) ? s.care : [...s.care, { action, label: ACTION_LABELS[action] }]
        };
        if (action === 'lighting') next.aquarium = { ...s.aquarium, lightsOn: !s.aquarium.lightsOn };
        if (action === 'clean-glass') next.aquarium = { ...next.aquarium, glassDirt: Math.max(0, s.aquarium.glassDirt - 0.15) };
        return next;
      });
      if (action === 'feed') feed(state.selectedFood);
      flash(ACTION_LABELS[action]);
    },
    [feed, flash, state.selectedFood]
  );

  const endDay = useCallback(() => {
    setState((s) => {
      const result = runEndDay(s);
      setReport(result.report);
      return result.state;
    });
  }, []);

  const patch = useCallback((changes: Partial<GameState>) => setState((s) => ({ ...s, ...changes })), []);
  const replace = useCallback((next: GameState) => setState(next), []);

  const stocking = useMemo(() => state.fish.length, [state.fish]);

  return { state, food, report, notice, stocking, runAction, endDay, patch, replace, setReport, flash };
}
