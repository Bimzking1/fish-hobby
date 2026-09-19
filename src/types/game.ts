import type { FishInstance } from './fish';
import type {
  AquariumState, EquipmentInstance, FoodId, PlantInstance,
  RockInstance, SnailInstance, SubstrateState, WaterState, WaterType
} from './aquarium';

export type MetricId = 'fishHealth' | 'waterQuality' | 'plantHealth' | 'stability' | 'aesthetics';
export type Metrics = Record<MetricId, number>;

export type Theme = 'light' | 'dark';

/** Drives the toast styling: which accent and icon the notice gets. */
export type NoticeKind = 'info' | 'success' | 'warning' | 'danger' | 'money';

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

/** One line in the finance ledger. Negative = spent, positive = earned. */
export interface FinanceEntry { day: number; note: string; amount: number }
/** The weather a completed day actually had. */
export interface WeatherHistoryEntry { day: number; weather: WeatherId; temp: number; hum: number }
export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedOnDay: number | null;
}

export interface GameState {
  /** False while sitting on the splash screen. */
  started: boolean;
  theme: Theme;
  day: number;
  money: number;
  metrics: Metrics;
  aquarium: AquariumState;
  /** What's currently in the tank. null = tank is dry. */
  water: WaterState | null;
  substrate: SubstrateState | null;
  rocks: RockInstance[];
  fish: FishInstance[];
  plants: PlantInstance[];
  snails: SnailInstance[];
  equipment: EquipmentInstance[];
  inventory: InventoryItem[];
  achievements: Achievement[];
  forecast: Forecast;
  selectedFood: FoodId;
  care: PendingCare[];
  /** Purchase/sale/earnings history for the finance page. */
  finance: FinanceEntry[];
  /** Weather each finished day actually had. */
  weatherHistory: WeatherHistoryEntry[];
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

/** Derived tank conditions the simulation reads every night. */
export interface TankConditions {
  hasWater: boolean;
  waterType: WaterType | null;
  litres: number;
  litresPct: number;
  effectivePh: number;
  temperature: number;
}