import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import type { Asteroid, Moon, Planet } from './types';
import { createPlanets } from './planets';


// ============================================
// SCENE
// ============================================

const scene = new THREE.Scene();


// ============================================
// CAMERA
// ============================================

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Elevated camera to see the XZ orbital plane
camera.position.set(0, 65, 100);


// ============================================
// CANVAS AND RENDERER
// ============================================

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

if (!canvas) {
  throw new Error('Canvas element with id "canvas" was not found.');
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;


// ============================================
// RESIZE
// ============================================

window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});


// ============================================
// ORBIT CONTROLS
// ============================================

const orbitControls = new OrbitControls(camera, canvas);

orbitControls.enableDamping = true;
// orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.5;


// ============================================
// GEOMETRY
// ============================================

const sphereGeometry = new THREE.SphereGeometry(
  1,
  32,
  32
);


// ============================================
// TEXTURE LOADER
// ============================================

const textureLoader = new THREE.TextureLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader();



const assetUrl = (path: string): string => {
  return `${import.meta.env.BASE_URL}${path}`;
};


// Load color textures
const loadTexture = (path: string): THREE.Texture => {

  const texture = textureLoader.load(
    assetUrl(path),
    undefined,
    undefined,
    (error) => {
      console.error(`Failed to load texture: ${path}`, error);
    }
  );

  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
};


// ============================================
// PLANET TEXTURES
// ============================================

const sunTexture = loadTexture('textures/2k_sun.jpg');

const mercuryTexture = loadTexture('textures/2k_mercury.jpg');

const venusTexture = loadTexture('textures/2k_venus_surface.jpg');

const earthTexture = loadTexture('textures/2k_earth_daymap.jpg');

const moonTexture = loadTexture('textures/2k_moon.jpg');

const marsTexture = loadTexture('textures/2k_mars.jpg');

const jupiterTexture = loadTexture('textures/2k_jupiter.jpg');

const saturnTexture = loadTexture('textures/2k_saturn.jpg');

const uranusTexture = loadTexture('textures/2k_uranus.jpg');

const neptuneTexture = loadTexture('textures/2k_neptune.jpg');

const plutoTexture = loadTexture('textures/2k_pluto.jpg');


// ============================================
// BACKGROUND CUBEMAP
// ============================================

cubeTextureLoader.setPath(
  assetUrl('textures/cubeMap/')
);

const backgroundCubemap = cubeTextureLoader.load(
  [
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png'
  ],
  undefined,
  undefined,
  (error) => {
    console.error('Failed to load background cubemap:', error);
  }
);

backgroundCubemap.colorSpace = THREE.SRGBColorSpace;

scene.background = backgroundCubemap;


// ============================================
// MATERIALS
// ============================================

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture
});

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture
});

const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture
});

const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
});

const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture
});

const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture
});

const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture
});

const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture
});

const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture
});

const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture
});

const plutoMaterial = new THREE.MeshStandardMaterial({
  map: plutoTexture
});

// ============================================
// SOLAR SYSTEM DATA
// ============================================

const planets: Planet[] = createPlanets({
  mercuryMaterial,
  venusMaterial,
  earthMaterial,
  moonMaterial,
  marsMaterial,

  jupiterMaterial,
  saturnMaterial,
  uranusMaterial,
  neptuneMaterial,
  plutoMaterial
});

// ============================================
// SUN
// ============================================

const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
);

sun.scale.setScalar(5);

scene.add(sun);


// ============================================
// PLANET CREATION
// ============================================

const createPlanet = (planet: Planet): THREE.Mesh => {

  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  );

  planetMesh.scale.setScalar(planet.radius);

  return planetMesh;
};


// ============================================
// MOON CREATION
// ============================================

const createMoon = (moon: Moon): THREE.Mesh => {

  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moon.material
  );

  moonMesh.scale.setScalar(moon.radius);

  // Moon's distance from its parent planet
  moonMesh.position.x = moon.distance;

  return moonMesh;
};


const createPlanetRings = (planet: Planet): THREE.Group => {

  const ringGroup = new THREE.Group();

  // Not every planet has rings
  if (!planet.rings || planet.rings.length === 0) {
    return ringGroup;
  }

  planet.rings.forEach((ring) => {

    // Ring radii relative to planet size
    const innerRadius = planet.radius * ring.innerRadius;
    const outerRadius = planet.radius * ring.outerRadius;

    const geometry = new THREE.RingGeometry(
      innerRadius,
      outerRadius,
      128
    );

    // Rotate ring from XY plane to XZ plane.
    // Its normal will now align with the planet's local Y axis.
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshStandardMaterial({
      color: ring.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: ring.opacity,
      roughness: 1,
      metalness: 0,
      depthWrite: false
    });

    const ringMesh = new THREE.Mesh(
      geometry,
      material
    );

    ringGroup.add(ringMesh);

  });

  return ringGroup;
};



// ============================================
// PLANETARY ORBIT CREATION
// ============================================

const createOrbit = (planet: Planet): THREE.LineLoop => {

  const points: THREE.Vector3[] = [];

  const segments = 256;

  const a = planet.distance;
  const e = planet.eccentricity;

  for (let i = 0; i < segments; i++) {

    const E = (i / segments) * Math.PI * 2;

    // Elliptical orbit with Sun at one focus
    const x = a * (Math.cos(E) - e);

    const z =
      -a *
      Math.sqrt(1 - e * e) *
      Math.sin(E);

    points.push(
      new THREE.Vector3(x, 0, z)
    );

  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0x777777,
    transparent: true,
    opacity: 0.45
  });

  const orbit = new THREE.LineLoop(
    geometry,
    material
  );

  scene.add(orbit);

  return orbit;
};


// ============================================
// CREATE ALL PLANET OBJECTS
// ============================================

const planetObjects = planets.map((planet) => {

  // Planet orbital position
  const planetPosition = new THREE.Group();

  scene.add(planetPosition);


  // Planet's tilted rotational axis
  const axisGroup = new THREE.Group();

  axisGroup.rotation.z = THREE.MathUtils.degToRad(
    planet.axialTiltDeg
  );

  planetPosition.add(axisGroup);


  // Planet mesh
  const planetMesh = createPlanet(planet);
  axisGroup.add(planetMesh);

  // Planet rings
  const ringGroup = createPlanetRings(planet);
  axisGroup.add(ringGroup);


  // Create moons
  const moons = planet.moons.map((moon) => {

    // Moon orbital pivot
    const moonPivot = new THREE.Group();

    planetPosition.add(moonPivot);

    // Moon mesh
    const moonMesh = createMoon(moon);

    moonPivot.add(moonMesh);

    return {
      pivot: moonPivot,
      angle: 0
    };

  });


  // Create planetary orbit line
  const orbit = createOrbit(planet);


  return {
    planetPosition,
    planetMesh,
    moons,
    orbit,

    meanAnomaly: 0,
    spinAngle: 0
  };

});


// ============================================
// ASTEROID BELT
// ============================================

const ASTEROID_COUNT = 2500;

const INNER_RADIUS = 42;
const OUTER_RADIUS = 66;

// Shared geometry and material
const asteroidGeometry = new THREE.DodecahedronGeometry(1, 0);

const asteroidMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 1
});

// Instanced mesh
const asteroidBelt = new THREE.InstancedMesh(
  asteroidGeometry,
  asteroidMaterial,
  ASTEROID_COUNT
);

asteroidBelt.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

// Prevent incorrect frustum culling as asteroids move
asteroidBelt.frustumCulled = false;

scene.add(asteroidBelt);

// ============================================
// ASTEROID DATA
// ============================================

const asteroids: Asteroid[] = [];

for (let i = 0; i < ASTEROID_COUNT; i++) {

  // Distribute asteroids across the belt
  const orbitRadius = Math.sqrt(
    Math.random() *
    (OUTER_RADIUS ** 2 - INNER_RADIUS ** 2) +
    INNER_RADIUS ** 2
  );

  // Approximate orbital period using Kepler's third law.
  // Earth is at visual distance 20 and has a period of 365.256 days.
  const orbitalPeriodDays =
    365.256 * Math.pow(orbitRadius / 20, 1.5);

  // Random asteroid size
  const size = 0.035 + Math.random() * 0.09;

  // Slight orbital inclination
  const inclination =
    (Math.random() - 0.5) * 0.08;

  // Random starting position
  const angle = Math.random() * Math.PI * 2;

  // Random asteroid color
  const color = new THREE.Color().setHSL(
    0.08,
    0.06,
    0.3 + Math.random() * 0.2
  );

  asteroidBelt.setColorAt(i, color);

  asteroids.push({
    orbitRadius,
    orbitalPeriodDays,
    angle,
    size,
    inclination,

    rotation: new THREE.Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ),

    rotationSpeed: new THREE.Vector3(
      Math.random() * 0.5,
      Math.random() * 0.5,
      Math.random() * 0.5
    )
  });

}

// ============================================
// LIGHTS
// ============================================

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.1
);

scene.add(ambientLight);


const pointLight = new THREE.PointLight(
  0xffffff,
  1200,
  0,
  2
);

scene.add(pointLight);


// ============================================
// KEPLER'S EQUATION
// ============================================

const solveKepler = (
  meanAnomaly: number,
  eccentricity: number
): number => {

  let E = meanAnomaly;

  // Newton-Raphson iteration
  for (let i = 0; i < 8; i++) {

    const error =
      E -
      eccentricity * Math.sin(E) -
      meanAnomaly;

    const derivative =
      1 -
      eccentricity * Math.cos(E);

    E -= error / derivative;

  }

  return E;
};


// ============================================
// SIMULATION SETTINGS
// ============================================

// Simulated Earth days per real second.
// Increase this value to speed up the entire solar system.

let simulationDaysPerSecond = 1;

const TWO_PI = Math.PI * 2;

// ============================================
// ASTEROID ANIMATION
// ============================================

const dummy = new THREE.Object3D();

function updateAsteroidBelt(simulatedDays: number) {

  asteroids.forEach((asteroid, index) => {

    // Individual orbital movement
    asteroid.angle +=
      (Math.PI * 2 * simulatedDays) /
      asteroid.orbitalPeriodDays;

    asteroid.angle %= Math.PI * 2;

    const angle = asteroid.angle;
    const radius = asteroid.orbitRadius;
    const inclination = asteroid.inclination;

    // Position in slightly inclined orbital plane
    const x = Math.cos(angle) * radius;

    const y =
      Math.sin(angle) *
      radius *
      Math.sin(inclination);

    const z =
      Math.sin(angle) *
      radius *
      Math.cos(inclination);

    dummy.position.set(x, y, z);

    // Individual axial rotation
    asteroid.rotation.x +=
      simulatedDays * asteroid.rotationSpeed.x;

    asteroid.rotation.y +=
      simulatedDays * asteroid.rotationSpeed.y;

    asteroid.rotation.z +=
      simulatedDays * asteroid.rotationSpeed.z;

    dummy.rotation.copy(asteroid.rotation);

    // Different size for each asteroid
    dummy.scale.set(
      asteroid.size * (0.8 + Math.random() * 0.4),
      asteroid.size,
      asteroid.size * (0.8 + Math.random() * 0.4)
    );

    dummy.updateMatrix();

    asteroidBelt.setMatrixAt(index, dummy.matrix);

  });

  asteroidBelt.instanceMatrix.needsUpdate = true;

}

// ============================================
// TIMER
// ============================================

const timer = new THREE.Timer();

// ============================================
// SIMULATION UI CONTROLS
// ============================================

const speedSlider = document.querySelector<HTMLInputElement>(
  '#speed-slider'
);

const speedValue = document.querySelector<HTMLSpanElement>(
  '#speed-value'
);

const speedButtons = document.querySelectorAll<HTMLButtonElement>(
  '.speed-presets button'
);


// Update simulation speed
const setSimulationSpeed = (speed: number) => {

  simulationDaysPerSecond = speed;

  // Update slider
  if (speedSlider) {
    speedSlider.value = String(speed);
  }

  // Update displayed speed
  if (speedValue) {
    speedValue.textContent = `${speed} days/sec`;
  }

  // Highlight selected preset
  speedButtons.forEach((button) => {

    const buttonSpeed = Number(button.dataset.speed);

    button.classList.toggle(
      'active',
      buttonSpeed === speed
    );

  });

};


// Slider control
speedSlider?.addEventListener('input', () => {

  setSimulationSpeed(Number(speedSlider.value));

});


// Preset buttons
speedButtons.forEach((button) => {

  button.addEventListener('click', () => {

    const speed = Number(button.dataset.speed);

    setSimulationSpeed(speed);

  });

});


// Initial UI state
setSimulationSpeed(1);


// ============================================
// RENDER LOOP
// ============================================

function renderloop() {

  // Time elapsed since previous frame, in seconds
  const delta = timer.update().getDelta();

  // Convert real seconds to simulated Earth days
  const simulatedDays = delta * simulationDaysPerSecond;

  updateAsteroidBelt(simulatedDays);

  // ==========================================
  // PLANET ANIMATION
  // ==========================================

  planetObjects.forEach((obj, index) => {

    const planet = planets[index];


    // ------------------------------------------
    // 1. REVOLUTION AROUND SUN
    // ------------------------------------------

    obj.meanAnomaly +=
      TWO_PI *
      simulatedDays /
      planet.orbitalPeriodDays;

    obj.meanAnomaly %= TWO_PI;


    // Calculate eccentric anomaly
    const E = solveKepler(
      obj.meanAnomaly,
      planet.eccentricity
    );


    // Calculate elliptical position
    const a = planet.distance;
    const e = planet.eccentricity;

    const x = a * (Math.cos(E) - e);

    const z =
      -a *
      Math.sqrt(1 - e * e) *
      Math.sin(E);


    // Move planet around the Sun
    obj.planetPosition.position.set(x, 0, z);


    // ------------------------------------------
    // 2. PLANET ROTATION ON ITS OWN AXIS
    // ------------------------------------------

    obj.spinAngle +=
      TWO_PI *
      simulatedDays /
      planet.rotationPeriodDays;

    obj.planetMesh.rotation.y = obj.spinAngle;


    // ------------------------------------------
    // 3. MOON REVOLUTION AROUND PLANET
    // ------------------------------------------

    obj.moons.forEach((moonObj, moonIndex) => {

      const moon = planet.moons[moonIndex];

      moonObj.angle +=
        TWO_PI *
        simulatedDays /
        moon.orbitalPeriodDays;

      moonObj.angle %= TWO_PI;

      moonObj.pivot.rotation.y = moonObj.angle;

    });

  });


  // ==========================================
  // CONTROLS AND RENDERING
  // ==========================================

  orbitControls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(renderloop);

}


// ============================================
// START SIMULATION
// ============================================

renderloop();
