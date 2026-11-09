import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

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
orbitControls.autoRotate = true
orbitControls.enablePan = false

//---------------GEOMETRY------------------
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)


//-----------------TEXTURE LOADER----------------------
const textureLoader = new THREE.TextureLoader()

//-----------------TEXTURE---------------------
const sunTexture = textureLoader.load('static/textures/2k_sun.jpg')
const mercuryTexture = textureLoader.load('static/textures/2k_mercury.jpg')
const venusTexture = textureLoader.load('static/textures/2k_venus.jpg')
const earthTexture = textureLoader.load('static/textures/2k_earth.jpg')
const moonTexture = textureLoader.load('static/textures/2k_moon.jpg')
const marsTexture = textureLoader.load('static/textures/2k_mars.jpg')


//----------------MATERIAL------------------
const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture})
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture})
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture})
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture})
const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture})
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture})



//----------------MESH---------------------
const sun = new THREE.Mesh(sphereGeometry, sunMaterial)

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: []
  },
  {
    name: "Venus",
    radius: 1.21,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: []
  },
  {
    name: "Earth",
    radius: 1.32,
    distance: 20,
    speed: 0.006,
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
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.12,
        distance: 1.2,
        speed: 0.025,
        // material: phobosMaterial
      },
      {
        name: "Deimos",
        radius: 0.09,
        distance: 1.8,
        speed: 0.015,
        // material: deimosMaterial
      }
    ]
  }
]


//----------------TRANSFORMATION-------------
sun.scale.setScalar(5)



//----------------ADD TO SCENE-----------------
// scene.add(new THREE.AxesHelper(10))
scene.add(sun)


//--------------TIMER----------------------
const timer = new THREE.Timer()
let delta = 0
let elaspedTime = 0

// ------------RENDER LOOP------------
function renderloop(){
  requestAnimationFrame(renderloop)
  
  delta = timer.update().getDelta()
  elaspedTime = timer.getElapsed()

  //--------------ANIMATAION-------------
  
  
  renderer.render(scene, camera)
}

renderloop()
