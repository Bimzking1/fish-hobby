import type { TankDef, TankSizeId } from '../types/aquarium';

export const TANKS: Record<TankSizeId, TankDef> = {
  small: { id: 'small', name: 'Nano', litres: 30, glassInset: 90, capacity: 6 },
  medium: { id: 'medium', name: 'Standard', litres: 90, glassInset: 44, capacity: 14 },
  large: { id: 'large', name: 'Showcase', litres: 200, glassInset: 8, capacity: 26 }
};

export const TANK_LIST = Object.values(TANKS);
