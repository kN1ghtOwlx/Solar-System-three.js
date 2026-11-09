# Orbitarium — Interactive 3D Solar System

An interactive Solar System simulation built with **Three.js, TypeScript, and Vite**. Explore the planets, selected moons, elliptical orbits, planetary rings, and an animated asteroid belt.

**[🚀 View Live Demo](https://solar-system-three-js-sable.vercel.app/)** · **[▶ Watch Project Video](https://drive.google.com/file/d/1hgqMrBo2rQQ3wEmGBBlUEc9JnCw3eS9n/preview)** · **[View Source Code](https://github.com/kN1ghtOwlx/Solar-System-three.js)**

## Project Demo

- **Live website:** https://solar-system-three-js-sable.vercel.app/
- **Video walkthrough:** [▶ Play the project video on Google Drive](https://drive.google.com/file/d/1hgqMrBo2rQQ3wEmGBBlUEc9JnCw3eS9n/preview)

> The video link opens Google Drive's preview player. GitHub README pages do not reliably support embedded Google Drive video players, so the link opens the recording in Drive.

## Features

### Planetary simulation
- Includes all eight planets and Pluto.
- Independent planetary rotation and revolution.
- Elliptical planetary orbits with changing orbital speed.
- Planetary axial tilt and retrograde rotation.
- Orbital and rotation periods based on astronomical values.

### Moons and asteroid belt
- Selected moons orbit their respective planets.
- Earth's Moon; Phobos and Deimos; Jupiter's four Galilean moons; selected moons of Saturn and Uranus; Triton; and selected moons of Pluto.
- Animated asteroid belt between Mars and Jupiter, rendered with `THREE.InstancedMesh`.

### Visuals and interaction
- Textured planetary surfaces and a cubemap space background.
- Procedurally created ring systems for Jupiter, Saturn, Uranus, and Neptune.
- Interactive camera controls with OrbitControls.
- Adjustable simulation speed.

## Tech Stack

- **Three.js** — 3D scene, geometry, materials, lighting, and rendering
- **TypeScript** — typed project code and data structures
- **Vite** — development server and production build
- **HTML & CSS** — page structure and simulation controls

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/kN1ghtOwlx/Solar-System-three.js.git
cd Solar-System-three.js
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build locally

```bash
npm run preview
```

## Project Structure

```text
Solar-System-three.js/
├── static/
│   └── textures/       # Planet textures and cubemap images
├── src/
│   ├── main.ts         # Three.js scene, rendering, and animation
│   ├── planets.ts      # Planet, moon, orbit, and ring data
│   ├── types.ts        # TypeScript interfaces
│   └── style.css       # UI styling
├── index.html          # Vite application entry point
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

Keep `index.html` at the project root with the default Vite `root` setting. The `static/` directory is configured as Vite's public directory, so its contents are copied into the production build.

## Simulation Notes

Orbitarium is an educational visual simulation, not a full N-body physics model. Planetary rotation and revolution periods use astronomical ratios, while planet sizes and orbital distances are visually adjusted to keep the scene practical to explore. Elliptical motion is approximated with Kepler's equation. Moon and asteroid motion is simplified; the model does not calculate gravitational interactions or live planetary positions.

## Links

- **Live Demo:** https://solar-system-three-js-sable.vercel.app/
- **GitHub Repository:** https://github.com/kN1ghtOwlx/Solar-System-three.js
- **Project Video:** https://drive.google.com/file/d/1hgqMrBo2rQQ3wEmGBBlUEc9JnCw3eS9n/view?usp=drive_link

## License

No open-source license is currently specified. Add a `LICENSE` file if you intend to grant permissions for reuse, modification, and distribution.
