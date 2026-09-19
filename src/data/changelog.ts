export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

/** Newest first. Shown in the in-app changelog. */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '0.3.2',
    date: '2026-09-18',
    title: 'Water follows the volume, toasts on top',
    changes: [
      'Fish now swim only within the water that is actually there — at ¼ of a tank they stay low, never above the waterline.',
      'Success toasts appear above every pop-up, so you always see what the shop just did.',
      'Every modal closes when you click the dim backdrop outside it.'
    ]
  },
  {
    version: '0.3.1',
    date: '2026-09-18',
    title: 'Soil depth, hardscape comfort & a smarter ledger',
    changes: [
      'Soil now fills from the bottom of the tank upward — a single bag is a thin layer on the glass, and the surface rises as you add the rest.',
      'Plants need soil: the shop blocks buying them until you lay a bag, and rooted plants sit on the soil surface instead of floating (they sink lower on ¼ coverage).',
      'Rocks, driftwood and caves follow the soil height too — and they give fish a hiding spot: hardscape eases stress and adds happiness every night.',
      'Water level is honest: buying 20L into a 200L tank shows a low waterline, not a full aquarium.',
      'The finance ledger has filters — search by item name, pick a day, sort by price asc/desc — plus pagination at 20 rows per page.',
      'The weather forecast no longer skips a day (day 1 didn’t flow into day 3), and the recorded history matches the “Today” card.',
      'Tank setup (tank size + aquarium background) is back on the Tank page.'
    ]
  },
  {
    version: '0.3.0',
    date: '2026-09-18',
    title: 'Pages, toasts & confirmations',
    changes: [
      'The app now scales itself to your screen — 100% on a 1366px laptop, and about 125% on a 1920px monitor, with no manual browser zoom.',
      'Fish can no longer be bought into a dry tank; feeding still works.',
      'New pages beside the tank: Water, Soil, Plants, Fish, Finance and Weather (history + 5-day forecast).',
      'Dark mode is now the default on every page.',
      'The header summary is now colour-coded chips (day, water, fish, plants, temperature, pH) so each number reads at a glance.',
      'Status is a compact one-row strip — less scrolling.',
      'Routine buttons toggle instead of staying green forever; click again to undo.',
      'Ending the day now asks for confirmation and lists the routines you have not done plus any warnings.',
      'Buying an item asks for confirmation, and warns you before mixing river and sea life.',
      'Tank setup uses themed custom dropdowns instead of the browser default selects.',
      'Notifications are themed toasts that slide in and match the moment.',
      "“What's new” moved out of the header into the footer."
    ]
  },
  {
    version: '0.2.0',
    date: '2026-09-18',
    title: 'The hobby update',
    changes: [
      'Empty-tank start: you build everything from day 1, piece by piece.',
      'Water is now the star — river (fresh) versus sea (salt), metered in litres.',
      'Fish, plants, soil and rocks all report their specs: pH, nutrients, temperature, compatibility.',
      'Sea fish (clownfish, blue tang, gramma, firefish) and sea plants (coral, seaweed) added.',
      'Wrong water stresses fish and slowly kills plants — grass dies in salt water within days.',
      'Plants have HP and a lifespan: some are everlasting, some must be replanted.',
      'Sell or dispose any fish from the stocking panel.',
      'Dark mode, plus a splash screen with New Game / Continue.',
      'This changelog.'
    ]
  },
  {
    version: '0.1.0',
    date: '2026-09-17',
    title: 'Visual foundation',
    changes: [
      'Procedural SVG aquarium: tank, water, fish, plants, snails, rocks, substrate, bubbles, food.',
      'Eight fish species with distinct silhouettes, patterns and swimming styles.',
      'Fish condition visuals: healthy, stressed, sick, fungus, critical, dead.',
      'Fish food that actually sinks and settles on the substrate.',
      'Save to file / load from file, plus autosave to this browser.',
      'Daily forecast and end-of-day report screen.'
    ]
  }
];