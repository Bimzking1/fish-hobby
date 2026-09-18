import type { EquipmentDef, EquipmentId } from '../types/aquarium';

export const EQUIPMENT: Record<EquipmentId, EquipmentDef> = {
  'internal-filter': { id: 'internal-filter', name: 'Internal filter', category: 'filtration', mount: 'glass-right', price: 120, note: 'Sits in the corner, pulls water through a cartridge.' },
  'sponge-filter': { id: 'sponge-filter', name: 'Sponge filter', category: 'filtration', mount: 'substrate', price: 45, note: 'Air driven, gentle. Safe with fry.' },
  'hob-filter': { id: 'hob-filter', name: 'Hang-on-back filter', category: 'filtration', mount: 'rim', price: 180, note: 'Hangs on the rim and returns water as a small fall.' },
  'canister-filter': { id: 'canister-filter', name: 'Canister filter', category: 'filtration', mount: 'back-wall', price: 420, note: 'Hidden under the cabinet, only the pipes show.' },
  'air-pump': { id: 'air-pump', name: 'Air pump', category: 'oxygen', mount: 'back-wall', price: 70, note: 'Drives air stones and sponge filters.' },
  'air-stone': { id: 'air-stone', name: 'Air stone', category: 'oxygen', mount: 'substrate', price: 15, note: 'Fine bubble column. Needs a pump.' },
  'oxygen-regulator': { id: 'oxygen-regulator', name: 'Oxygen regulator', category: 'oxygen', mount: 'back-wall', price: 90, note: 'Dials bubble rate up and down.' },
  'bubble-diffuser': { id: 'bubble-diffuser', name: 'Bubble diffuser', category: 'oxygen', mount: 'substrate', price: 55, note: 'Wide bar of bubbles along the back glass.' },
  heater: { id: 'heater', name: 'Heater', category: 'temperature', mount: 'glass-left', price: 110, note: 'Holds temperature against the room.' },
  thermometer: { id: 'thermometer', name: 'Thermometer', category: 'temperature', mount: 'glass-left', price: 12, note: 'Reads the water, not the heater dial.' },
  'cooling-fan': { id: 'cooling-fan', name: 'Cooling fan', category: 'temperature', mount: 'rim', price: 95, note: 'Evaporative cooling for hot days. Drops water level.' },
  'aquarium-lamp': { id: 'aquarium-lamp', name: 'Aquarium lamp', category: 'lighting', mount: 'rim', price: 140, note: 'Warm spread, enough for easy plants.' },
  'led-bar': { id: 'led-bar', name: 'LED bar', category: 'lighting', mount: 'rim', price: 260, note: 'Bright and adjustable. Too long a photoperiod grows algae.' },
  'algae-scraper': { id: 'algae-scraper', name: 'Algae scraper', category: 'cleaning', mount: 'toolbox', price: 20, note: 'Clears the glass without scratching it.' },
  'gravel-vacuum': { id: 'gravel-vacuum', name: 'Gravel vacuum', category: 'cleaning', mount: 'toolbox', price: 35, note: 'Pulls mulm out during a water change.' },
  'glass-cleaner': { id: 'glass-cleaner', name: 'Glass cleaner', category: 'cleaning', mount: 'toolbox', price: 18, note: 'For the outside panes and water marks.' },
  'co2-diffuser': { id: 'co2-diffuser', name: 'CO2 diffuser', category: 'other', mount: 'glass-right', price: 150, note: 'Mist of fine bubbles for planted tanks.' },
  'circulation-pump': { id: 'circulation-pump', name: 'Circulation pump', category: 'other', mount: 'glass-right', price: 130, note: 'Keeps flow even so waste reaches the filter.' },
  'feeding-ring': { id: 'feeding-ring', name: 'Feeding ring', category: 'other', mount: 'rim', price: 10, note: 'Keeps floating food in one spot.' }
};

export const EQUIPMENT_LIST = Object.values(EQUIPMENT);
