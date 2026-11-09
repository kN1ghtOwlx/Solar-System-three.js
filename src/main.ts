import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
// scene.add(camera)

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

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true})

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// cubeMesh.position.x = 2
// const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
// const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial)
// cubeMesh3.position.x = -2

// const group = new THREE.Group();
// group.add(cubeMesh)
// group.add(cubeMesh2)
// group.add(cubeMesh3)
// group.scale.setScalar(2)

scene.add(new THREE.AxesHelper(6))
// scene.add(group)
scene.add(cubeMesh)

// cubeMesh.rotation.y = Math.PI * 0.25
cubeMesh.rotation.y = THREE.MathUtils.degToRad(45)

const timer = new THREE.Timer()
let delta = 0

function animate(){
  requestAnimationFrame(animate)

  delta = timer.update().getDelta()
  
  orbitControls.update(delta*5)

  renderer.render(scene, camera)
}

animate()
