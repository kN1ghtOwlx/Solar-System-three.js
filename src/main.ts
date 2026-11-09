
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import type { Moon, Planet } from './types';


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


// Vite public directory:
// static/textures/
//
// URL becomes:
// BASE_URL + textures/filename

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
