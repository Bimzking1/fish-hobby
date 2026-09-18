import type { FishInstance } from './fish';
import type { AquariumState, EquipmentInstance, FoodId, PlantInstance, SnailInstance } from './aquarium';

export type MetricId = 'fishHealth' | 'waterQuality' | 'plantHealth' | 'stability' | 'aesthetics';
export type Metrics = Record<MetricId, number>;

export type WeatherId = 'sunny' | 'hot' | 'cloudy' | 'rain' | 'storm' | 'cold';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Forecast {
  weather: WeatherId;
  temperatureC: number;
  humidity: number;
  impacts: { label: string; level: RiskLevel }[];
}

export type ActionId =
  | 'feed' | 'water-change' | 'clean-glass' | 'check-water' | 'adjust-filter'
  | 'adjust-oxygen' | 'lighting' | 'medicine' | 'plants' | 'equipment';

export interface PendingCare { action: ActionId; label: string }
export interface InventoryItem { id: string; name: string; qty: number }
export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedOnDay: number | null;
}

export interface GameState {
  day: number;
  money: number;
  metrics: Metrics;
  aquarium: AquariumState;
  fish: FishInstance[];
  plants: PlantInstance[];
  snails: SnailInstance[];
  equipment: EquipmentInstance[];
  inventory: InventoryItem[];
  achievements: Achievement[];
  forecast: Forecast;
  selectedFood: FoodId;
  care: PendingCare[];
}

export interface ReportLine { tone: 'good' | 'warn' | 'bad'; text: string }

export interface DailyReport {
  fromDay: number;
  toDay: number;
  lines: ReportLine[];
  before: Metrics;
  after: Metrics;
  earnings: number;
}
