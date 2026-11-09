import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

//---------------SCENE------------------
const scene = new THREE.Scene()

//---------------CAMERA------------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 20
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

//---------------GEOMETRY------------------
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)


//----------------MATERIAL------------------
const sunMaterial = new THREE.MeshBasicMaterial({color: 0xfff700})
const earthMaterial = new THREE.MeshBasicMaterial({color: 'blue'})
const moonMaterial = new THREE.MeshBasicMaterial({color: 'grey'})


//----------------MESH---------------------
const sun = new THREE.Mesh(sphereGeometry, sunMaterial)
const earth = new THREE.Mesh(sphereGeometry, earthMaterial)
const moon = new THREE.Mesh(sphereGeometry, moonMaterial)


//----------------TRANSFORMATION-------------
sun.scale.setScalar(5)

earth.position.x = 10

moon.scale.setScalar(0.2)
moon.position.x = 2


//----------------ADD TO SCENE-----------------
// scene.add(new THREE.AxesHelper(6))
scene.add(sun)
scene.add(earth)
earth.add(moon)


const timer = new THREE.Timer()
let delta = 0

function animate(){
  requestAnimationFrame(animate)
  
  delta = timer.update().getDelta()

  renderer.render(scene, camera)
}

animate()
