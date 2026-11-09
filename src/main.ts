
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import type { Asteroid, Moon, Planet } from './types';


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

const sunTexture = loadTexture('static/textures/2k_sun.jpg');

const mercuryTexture = loadTexture('static/textures/2k_mercury.jpg');

const venusTexture = loadTexture('static/textures/2k_venus_surface.jpg');

const earthTexture = loadTexture('static/textures/2k_earth_daymap.jpg');

const moonTexture = loadTexture('static/textures/2k_moon.jpg');

const marsTexture = loadTexture('static/textures/2k_mars.jpg');

const jupiterTexture = loadTexture('textures/2k_jupiter.jpg');

const saturnTexture = loadTexture('textures/2k_saturn.jpg');

const uranusTexture = loadTexture('textures/2k_uranus.jpg');

const neptuneTexture = loadTexture('textures/2k_neptune.jpg');

const plutoTexture = loadTexture('textures/2k_pluto.jpg');


// ============================================
// BACKGROUND CUBEMAP
// ============================================

cubeTextureLoader.setPath(
  assetUrl('static/textures/cubeMap/')
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

const planets: Planet[] = [

  // MERCURY
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,

    orbitalPeriodDays: 87.969,
    rotationPeriodDays: 58.6462,

    axialTiltDeg: 0.034,
    eccentricity: 0.2056,

    material: mercuryMaterial,

    moons: []
  },


  // VENUS
  {
    name: 'Venus',
    radius: 1.21,
    distance: 15,

    orbitalPeriodDays: 224.701,
    rotationPeriodDays: 243.018,

    axialTiltDeg: 177.4,
    eccentricity: 0.0068,

    material: venusMaterial,

    moons: []
  },


  // EARTH
  {
    name: 'Earth',
    radius: 1.32,
    distance: 20,

    orbitalPeriodDays: 365.256,
    rotationPeriodDays: 0.99726968,

    axialTiltDeg: 23.44,
    eccentricity: 0.0167,

    material: earthMaterial,

    moons: [
      {
        name: 'Moon',
        radius: 0.36,
        distance: 2,

        orbitalPeriodDays: 27.3217,

        material: moonMaterial
      }
    ]
  },


  // MARS
  {
    name: 'Mars',
    radius: 0.7,
    distance: 26,

    orbitalPeriodDays: 686.980,
    rotationPeriodDays: 1.025956,

    axialTiltDeg: 25.19,
    eccentricity: 0.0934,

    material: marsMaterial,

    moons: [
      {
        name: 'Phobos',
        radius: 0.12,
        distance: 1.2,

        orbitalPeriodDays: 0.31891,

        material: moonMaterial
      },
      {
        name: 'Deimos',
        radius: 0.09,
        distance: 1.8,

        orbitalPeriodDays: 1.26244,

        material: moonMaterial
      }
    ]
  },

  //JUPITAR
  {
  name: "Jupiter",
   radius: 4.0,
   distance: 76,

   orbitalPeriodDays: 4332.589,
   rotationPeriodDays: 0.4135417,

    axialTiltDeg: 3.13,
    eccentricity: 0.0487,

    material: jupiterMaterial,

    moons: [
      {
        name: "Io",
        radius: 0.12,
        distance: 4.8,
        orbitalPeriodDays: 1.762732,
        material: moonMaterial
      },
      {
        name: "Europa",
        radius: 0.10,
        distance: 6.0,
        orbitalPeriodDays: 3.525463,
        material: moonMaterial
      },
      {
        name: "Ganymede",
        radius: 0.16,
        distance: 7.5,
        orbitalPeriodDays: 7.155588,
        material: moonMaterial
      },
      {
        name: "Callisto",
        radius: 0.15,
        distance: 9.5,
        orbitalPeriodDays: 16.690440,
        material: moonMaterial
      }
    ]
  },

  // SATURN

  {
    name: "Saturn",
    radius: 3.5,
    distance: 100,

    orbitalPeriodDays: 10755.699,
    rotationPeriodDays: 0.444,

    axialTiltDeg: 26.73,
    eccentricity: 0.0520,

    material: saturnMaterial,

    moons: [
      {
        name: "Mimas",
        radius: 0.07,
        distance: 3.9,
        orbitalPeriodDays: 0.942422,
        material: moonMaterial
      },
      {
        name: "Enceladus",
        radius: 0.08,
        distance: 4.5,
        orbitalPeriodDays: 1.370218,
        material: moonMaterial
      },
      {
        name: "Tethys",
        radius: 0.09,
        distance: 5.2,
        orbitalPeriodDays: 1.887802,
        material: moonMaterial
      },
      {
        name: "Dione",
        radius: 0.10,
        distance: 6.0,
        orbitalPeriodDays: 2.736916,
        material: moonMaterial
      },
      {
        name: "Rhea",
        radius: 0.12,
        distance: 7.2,
        orbitalPeriodDays: 4.517503,
        material: moonMaterial
      },
      {
        name: "Titan",
        radius: 0.25,
        distance: 9.5,
        orbitalPeriodDays: 15.945448,
        material: moonMaterial
      },
      {
        name: "Iapetus",
        radius: 0.12,
        distance: 13,
        orbitalPeriodDays: 79.331002,
        material: moonMaterial
      }
    ]
  },

  // URANUS

  {
    name: "Uranus",
    radius: 2.0,
    distance: 130,

    orbitalPeriodDays: 30685.400,
    rotationPeriodDays: 0.718333,

    axialTiltDeg: 97.77,
    eccentricity: 0.0469,

    material: uranusMaterial,

    moons: [
      {
        name: "Miranda",
        radius: 0.06,
        distance: 2.8,
        orbitalPeriodDays: 1.413479,
        material: moonMaterial
      },
      {
        name: "Ariel",
        radius: 0.10,
        distance: 3.6,
        orbitalPeriodDays: 2.520379,
        material: moonMaterial
      },
      {
        name: "Umbriel",
        radius: 0.09,
        distance: 4.4,
        orbitalPeriodDays: 4.144177,
        material: moonMaterial
      },
      {
        name: "Titania",
        radius: 0.15,
        distance: 5.5,
        orbitalPeriodDays: 8.705869,
        material: moonMaterial
      },
      {
        name: "Oberon",
        radius: 0.15,
        distance: 6.8,
        orbitalPeriodDays: 13.463237,
        material: moonMaterial
      }
    ]
  },

  // NEPTUNE
  {
    name: "Neptune",
    radius: 1.9,
    distance: 160,

    orbitalPeriodDays: 60189.018,
    rotationPeriodDays: 0.67125,

    axialTiltDeg: 28.32,
    eccentricity: 0.0097,

    material: neptuneMaterial,

    moons: [
      {
        name: "Triton",
        radius: 0.18,
        distance: 4.5,
        orbitalPeriodDays: 5.8792,
        material: moonMaterial
      }
    ]
  },

  // PLUTO (DWARF PLANET)

  {
    name: "Pluto",
    radius: 0.4,
    distance: 210,

    orbitalPeriodDays: 90560,
    rotationPeriodDays: 6.3872,

    axialTiltDeg: 119.51,
    eccentricity: 0.2444,

    material: plutoMaterial,

    moons: [
      {
        name: "Charon",
        radius: 0.18,
        distance: 1.2,
        orbitalPeriodDays: 6.387222,
        material: moonMaterial
      },
      {
        name: "Nix",
        radius: 0.045,
        distance: 2.0,
        orbitalPeriodDays: 24.85,
        material: moonMaterial
      },
      {
        name: "Hydra",
        radius: 0.05,
        distance: 2.6,
        orbitalPeriodDays: 38.20,
        material: moonMaterial
      }
    ]
  }

];


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
  0.12
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
