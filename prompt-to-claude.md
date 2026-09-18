# Aquarium Hobby Simulator — UI & Visual Foundation

Build a frontend-only aquarium hobby simulation game using:

* React
* TypeScript
* Vite
* Tailwind CSS
* SVG for the aquarium graphics and interactive visual assets
* localStorage for temporary persistence
* JSON export/import for save/load

## Important Priority

For this phase, **focus heavily on the UI, SVG graphics, visual assets, aquarium composition, and overall game presentation.**

Do NOT spend most of the effort building a complicated simulation engine yet.

The project will later be continued by another coding agent (OpenCode with a free agent), which will implement and expand the simulation mechanics.

The visual foundation should therefore be clean, modular, and easy to extend.

---

# Game Concept

This is an **aquarium hobby simulator**, not a fish farming/tycoon game.

The player owns an aquarium and progresses through days while trying to maintain a healthy, stable, beautiful ecosystem.

The main fantasy is:

> "This is my aquarium, and I want to keep it healthy for as long as possible."

Money exists as a secondary progression system, but the primary focus is aquarium quality.

The player should care about:

* Fish health
* Fish happiness
* Water quality
* Plant health
* Aquarium stability
* Aquarium appearance
* Long-term survival

Do NOT design the game around buying fish and selling them for profit.

---

# Core Visual Assets

Create the visual system around these major asset families.

## 1. Fish

Fish are the most important visual asset.

Create several visually distinct species, for example:

* Guppy
* Goldfish
* Betta
* Neon Tetra
* Molly
* Platy
* Angelfish
* Corydoras

The exact species can be adjusted if necessary.

Each species should have:

* Distinct silhouette
* Distinct body proportions
* Different colors/patterns
* Different size
* Different swimming style

Fish should be rendered as SVG components where practical.

Design the architecture so that later we can easily add:

```text
<Fish species="guppy" />
<Fish species="betta" />
<Fish species="neon-tetra" />
```

Do not create one enormous SVG component.

Use reusable components/data definitions.

---

# Fish Condition Visuals

The fish should eventually support different visual states:

```text
Healthy
Stressed
Sick
Fungus
Critical
Dead
```

For now, establish the visual architecture and a few representative states.

Examples:

Healthy:

* Normal color
* Normal movement
* Normal posture

Stressed:

* Slightly darker/paler
* Slower movement
* Less active

Sick:

* Pale appearance
* Reduced movement

Fungus:

* Visible white/gray patches

Critical:

* Weak movement
* Surface-oriented behavior

Dead:

* Appropriate inactive/floating/lying posture

Do not make these cartoonishly exaggerated. Keep the style cozy and visually readable.

---

# 2. Fish Food

Food should exist as an actual visual object.

Support different food types conceptually:

* Flakes
* Pellets
* Granules
* Frozen food
* Live food

The important visual idea is:

```text
Feed
↓
Food appears at water surface
↓
Food falls/sinks
↓
Fish react to food
↓
Uneaten food eventually settles
```

For now, implement the visual representation and basic animation architecture.

---

# 3. Aquarium / Tank

The aquarium itself should be the main visual container.

Support different tank sizes/configurations:

* Small
* Medium
* Large

The tank should visually contain:

```text
Background
Water
Equipment
Plants
Fish
Snails
Food
Rocks
Substrate
Dirt/algae effects
```

Use SVG and CSS where appropriate.

The tank should feel like a real little ecosystem rather than a collection of icons.

---

# 4. Tank Auxiliary Equipment

Create visual assets/components for aquarium equipment.

Examples:

### Filtration

* Internal filter
* Sponge filter
* Hang-on-back filter
* Canister filter

### Oxygen

* Air pump
* Air stone
* Oxygen regulator
* Tubes
* Bubble diffuser

### Temperature

* Heater
* Thermometer
* Cooling fan

### Lighting

* Aquarium lamp
* LED bar

### Cleaning

* Algae scraper
* Gravel vacuum
* Glass cleaner

### Other

* CO₂ diffuser
* Water circulation pump
* Feeding ring

These should appear physically inside/on the aquarium rather than only being shop icons.

---

# 5. Plants

Create multiple plant visual components.

Examples:

* Java Fern
* Anubias
* Amazon Sword
* Vallisneria
* Java Moss
* Hornwort
* Duckweed

Plants should eventually support growth.

For example:

```text
Young
↓
Growing
↓
Mature
↓
Overgrown
↓
Wilting
↓
Dead
```

For now, establish the SVG assets and component architecture.

Make plants visually different enough that a player can recognize them without reading a label.

---

# 6. Snails

Create several snail types:

* Nerite
* Mystery Snail
* Ramshorn
* Malaysian Trumpet Snail

They should be small but recognizable.

Eventually they can move around the glass, plants, and substrate.

Implement the visual structure so movement can be added later.

---

# 7. Substrate / Sediments / Decorations

Create visual layers for:

### Substrate

* Fine sand
* Gravel
* Dark gravel
* Soil

### Rocks

* Small pebbles
* Large rocks
* Dark stones
* Coal-like stones

### Other

* Driftwood
* Decorative stones
* Cave/hiding structures

### Accumulated material

The aquarium should eventually visually accumulate:

* Fish waste
* Uneaten food
* Dirt
* Mulm
* Dead leaves
* Algae

This is important because the aquarium should visibly change over time.

---

# 8. Aquarium Background

Create several aquarium environment/background styles.

Examples:

* Clean blue
* Dark aquarium
* Tropical
* River
* Deep water
* Natural planted tank
* Minimalist
* Stone background

Backgrounds should be modular so they can be swapped without changing the rest of the aquarium.

---

# Aquarium Composition

The aquarium should be the visual centerpiece of the application.

Suggested layout:

```text
┌───────────────────────────────────────────────────────────┐
│ Aquarium Keeper                         Day 42    $1,240  │
├───────────────────────────────────────────────────────────┤
│                                                           │
│                 AQUARIUM SCENE                            │
│                                                           │
│       🌿                    🐟                             │
│                 🐠                         🫧              │
│                            🐟                              │
│     🌿          🪨                         🐌              │
│                                                           │
│ ───────────────────────────────────────────────────────── │
│       sand / gravel / rocks / sediment                    │
│                                                           │
├───────────────────────────────────────────────────────────┤
│ Aquarium Status                                           │
│                                                           │
│ Fish Health       94%       Water Quality      91%        │
│ Plant Health      88%       Stability          93%        │
└───────────────────────────────────────────────────────────┘
```

Do not literally use emoji in the final UI.

The final aquarium should use actual SVG/graphic assets.

---

# UI Style

Aim for:

**Cozy + clean + slightly game-like + modern**

Not:

* Corporate dashboard
* Generic admin panel
* Excessive gradients
* Excessive glassmorphism
* Overly childish cartoon UI
* Huge rounded cards everywhere

The aquarium itself should dominate the screen.

Use restrained UI panels around it.

Typography should be clean and readable.

Use a cohesive visual hierarchy.

Prefer subtle borders, shadows, muted surfaces, and strong spacing.

---

# Main Screen

Create a polished main aquarium screen with:

### Header

```text
Aquarium Keeper
Day 42

Money
$1,240

Weather
☀ 28°C
```

### Aquarium

Large interactive aquarium scene.

### Status panel

Show:

```text
Fish Health
Water Quality
Plant Health
Stability
Aesthetics
```

### Fish panel

Show individual fish:

```text
Blue
Neon Tetra
Healthy

Milo
Guppy
Healthy

Luna
Betta
Stressed
```

### Action panel

Create controls/buttons for future mechanics:

```text
Feed
Water Change
Clean Glass
Check Water
Adjust Filter
Adjust Oxygen
Lighting
Medicine
Plants
Equipment
```

These actions do not need deep simulation logic yet. The important thing is that the UI architecture is ready for the later simulation.

---

# Prediction / Daily Simulation UI

The eventual game loop is:

```text
Observe
↓
Read conditions / forecast
↓
Configure aquarium care
↓
End Day
↓
Simulation happens
↓
Inspect results
↓
Next Day
```

Create UI for:

### Forecast

```text
Tomorrow

Temperature     29°C
Humidity        78%
Weather         ☀ Hot

Aquarium impact

Temperature stress      Medium
Evaporation             High
Algae risk              Medium
```

### End Day

Create a prominent but tasteful:

```text
END DAY
```

button.

Later another agent will connect this to the actual simulation.

---

# Daily Result Screen

Create a result modal/panel like:

```text
DAY 42 → DAY 43

Daily Report

✓ Fish remained healthy
✓ Plants grew
⚠ Nitrate increased
⚠ Algae increased slightly

Fish Health       94 → 93
Water Quality     91 → 88
Plant Health      88 → 90
Stability         93 → 91

+$80

[ Continue ]
```

Again, focus on the presentation and component architecture rather than implementing the complete simulation.

---

# Save / Load UI

Implement the frontend save/load interface.

Two important save methods:

### Auto Save

Use localStorage for the current game.

### File Save

Allow the user to download a JSON save file:

```text
aquarium-save-day-42.json
```

### File Load

Allow the user to select a `.json` save file and restore the game.

The save data should be structured and versioned:

```ts
{
  version: 1,
  savedAt: string,
  game: {},
  tank: {},
  fish: [],
  plants: [],
  snails: [],
  equipment: [],
  inventory: [],
  achievements: []
}
```

Keep save/load modular because the simulation state will grow later.

---

# SVG Architecture

This is extremely important.

Do not create the aquarium as one giant SVG.

Create reusable components such as:

```text
AquariumScene
Tank
Water
Background
Substrate
Rock
Plant
Fish
Snail
FoodParticle
Filter
Heater
AirStone
Bubble
Algae
Dirt
```

For example:

```tsx
<AquariumScene>
  <Tank>
    <Background />
    <Water />

    <Equipment />

    <Plants />
    <Fish />
    <Snails />
    <Food />

    <Effects />

    <Substrate />
  </Tank>
</AquariumScene>
```

Make the component architecture easy for another agent to extend.

---

# Animation

Add subtle animations where they improve the aquarium:

* Fish swimming
* Fish changing direction
* Fish schooling
* Snails moving
* Plants gently moving
* Bubbles rising
* Food sinking
* Water movement
* Light changes
* Day/night changes

Do not overanimate the UI.

The aquarium should feel alive while the controls remain calm.

---

# Responsive Design

The main experience should work on:

* Desktop
* Laptop
* Tablet

Desktop can prioritize a large aquarium.

On smaller screens, reorganize the status/actions around the aquarium rather than simply shrinking everything.

---

# Code Quality

Use:

* TypeScript
* Strict typing
* No `any`
* Reusable components
* Clear data models
* Small focused components
* No unnecessary dependencies

Avoid hardcoding the entire aquarium inside one component.

Keep species, plants, equipment, and asset definitions in data/config files where practical.

Example:

```text
src/
  components/
    aquarium/
      AquariumScene.tsx
      Tank.tsx
      Fish.tsx
      Plant.tsx
      Snail.tsx
      Food.tsx
      Equipment.tsx
      Substrate.tsx
      Effects.tsx

    game/
      Header.tsx
      AquariumStatus.tsx
      FishPanel.tsx
      ActionPanel.tsx
      ForecastPanel.tsx
      DailyReport.tsx
      SaveLoad.tsx

  data/
    fish.ts
    plants.ts
    snails.ts
    equipment.ts
    food.ts
    backgrounds.ts

  types/
    aquarium.ts
    fish.ts
    game.ts

  simulation/
    ...
```

The simulation folder can remain minimal for now.

---

# Most Important Deliverable

When finished, I want to be able to open the app and immediately see:

**A beautiful aquarium that looks like a real game.**

It should contain several actual visual fish, plants, substrate, equipment, bubbles, food, and background elements.

The UI should make it obvious that this is an aquarium hobby simulator.

Prioritize:

1. Aquarium visual quality
2. Fish SVGs
3. Plant SVGs
4. Tank/equipment visuals
5. Substrate/background
6. Fish condition visuals
7. Animation
8. Main UI
9. Save/load UI
10. Simulation architecture

Do not spend the majority of the implementation time on complex economy, disease calculations, water chemistry formulas, or advanced AI yet.

Build a **strong visual and UI foundation that another coding agent can continue from.**

At the end, make sure the project runs successfully with the normal Vite development command and that the codebase is organized enough for OpenCode to continue implementing the simulation later.
