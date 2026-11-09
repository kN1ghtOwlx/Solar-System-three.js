import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import type { Moon, Planet } from './types'

//---------------SCENE------------------
const scene = new THREE.Scene()

//---------------CAMERA------------------
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 50
// scene.add(camera)

//---------------CANVAS------------------
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight,
  camera.updateProjectionMatrix(),
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true
// orbitControls.autoRotate = true
// orbitControls.enablePan = false

//---------------GEOMETRY------------------
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)


//-----------------TEXTURE LOADER----------------------
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/static/textures/cubeMap/')

//-----------------TEXTURE---------------------
const sunTexture = textureLoader.load('static/textures/2k_sun.jpg')
const mercuryTexture = textureLoader.load('static/textures/2k_mercury.jpg')
const venusTexture = textureLoader.load('static/textures/2k_venus_surface.jpg')
const earthTexture = textureLoader.load('static/textures/2k_earth_daymap.jpg')
const moonTexture = textureLoader.load('static/textures/2k_moon.jpg')
const marsTexture = textureLoader.load('static/textures/2k_mars.jpg')

const backgroundCubemap = cubeTextureLoader.load(
  [
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png'
  ]
)
scene.background = backgroundCubemap


//----------------MATERIAL------------------
const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture})
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture})
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture})
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture})
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture})
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture})


const planets: Planet[] = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    rotationSpeed: 0.006,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: "Venus",
    radius: 1.21,
    distance: 15,
    speed: 0.007,
    rotationSpeed: 0.002,
    material: venusMaterial,
    moons: []
  },
  {
    name: "Earth",
    radius: 1.32,
    distance: 20,
    speed: 0.006,
    rotationSpeed: 0.02,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.36,
        distance: 2,
        speed: 0.02,
        material: moonMaterial
      }
    ]
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 26,
    speed: 0.005,
    rotationSpeed: 0.018,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.12,
        distance: 1.2,
        speed: 0.025,
        material: moonMaterial
      },
      {
        name: "Deimos",
        radius: 0.09,
        distance: 1.8,
        speed: 0.015,
        material: moonMaterial
      }
    ]
  }
];


const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
sun.scale.setScalar(5)
// scene.add(new THREE.AxesHelper(10))
scene.add(sun)

const createPlanet = (planet: Planet) => {
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )

  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;

  return planetMesh;
}

const createMoon = (moon: Moon) => {
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moon.material
  )

  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;

  return moonMesh;
}

const planetObjects = planets.map((planet) => {

  // Planet orbital pivot
  const orbitPivot = new THREE.Group();
  scene.add(orbitPivot);

  // Planet mesh
  const planetMesh = createPlanet(planet);
  orbitPivot.add(planetMesh);

  // Moon orbital pivots
  const moons = planet.moons.map((moon) => {

    const moonOrbitPivot = new THREE.Group();

    // Place moon orbit around its planet
    moonOrbitPivot.position.x = planet.distance;

    orbitPivot.add(moonOrbitPivot);

    const moonMesh = createMoon(moon);
    moonOrbitPivot.add(moonMesh);

    return {
      orbitPivot: moonOrbitPivot,
      speed: moon.speed
    }
  })

  return {
    orbitPivot,
    planetMesh,
    moons,
    orbitAngle: 0,
    spinAngle: 0
  }
})
//------------------------LIGHTS-------------------
const ambieantLight = new THREE.AmbientLight(0xffffff, 0.02)
scene.add(ambieantLight)
const pointLight = new THREE.PointLight(0xffffff, 1000)
scene.add(pointLight)



//--------------TIMER----------------------
const timer = new THREE.Timer()
let delta = 0
let elaspedTime = 0
const timeScale = 100;

// ------------RENDER LOOP-----------

function renderloop() {

  delta = timer.update().getDelta();
  elaspedTime = timer.getElapsed();

  // Planet animation
  planetObjects.forEach((obj, index) => {

    const planet = planets[index];

    // 1. Revolution around Sun
    obj.orbitAngle += delta * planet.speed * timeScale;

    obj.orbitPivot.rotation.y = obj.orbitAngle;

    // 2. Independent rotation on its own axis
    obj.spinAngle += delta * planet.rotationSpeed * timeScale;

    // Compensate for the parent orbital rotation
    obj.planetMesh.rotation.y = obj.spinAngle - obj.orbitAngle;

    // 3. Moon revolution around its planet
    obj.moons.forEach((moon) => {

      moon.orbitPivot.rotation.y +=
        delta * moon.speed * timeScale;

    });

  });

  orbitControls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(renderloop);
}

renderloop();
