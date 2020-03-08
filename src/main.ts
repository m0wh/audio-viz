import * as THREE from 'three'
import { init } from './three-helpers'
import vertexShader from './glsl/sphere.vert'
import fragmentShader from './glsl/sphere.frag'
import SoundReactor from './SoundReactor'
import pamplegooze from './assets/pamplegooze.wav'

const sr = new SoundReactor(pamplegooze)

const clrs = {
  orange: new THREE.Color(0xc86b01),
  blue: new THREE.Color(0x1f263d)
}

const lerp = (start, end, amt) => (1 - amt) * start + amt * end

const { scene, camera, renderer } = init()
let time = 0
let timeBackwards = false
scene.background = new THREE.Color(0x000000)

const n = 40
const meshes = new Array(n).fill(0).map((_, i) => {
  const geometry = new THREE.SphereGeometry(1, 6, 6)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: { value: 0.0 },
      volume: { value: 0.0 },
      colorA: { value: new THREE.Color(0x000000) },
      colorB: { value: new THREE.Color(0xFF0000) }
    },
    flatShading: true
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.y = Math.sin(Math.PI * 2 * i / n) * 2
  mesh.position.x = Math.cos(Math.PI * 2 * i / n) * 2
  return { mesh, material, geometry }
})

meshes.forEach(obj => scene.add(obj.mesh))

camera.position.z = 10

document.querySelector('button').addEventListener('click', () => {
  sr.init()
  update()
  document.querySelector('button').remove()
})

function update () {
  sr.update()

  if (time <= 0) timeBackwards = false
  if (time >= 10000) timeBackwards = true

  meshes.forEach((obj, i) => {
    obj.mesh.rotation.x = (sr.fdata[10] / 255) / 10 + i / 1
    obj.mesh.rotation.y = (sr.fdata[150] / 255) / 10 - i / 1
    obj.mesh.rotation.x += time / 100 / 10 - i / 1
    time = lerp(time, time + (timeBackwards ? -5 : 5), 0.1)
    const volume = (sr.fdata[i * 10] / 255)
    obj.material.uniforms.time.value = (time + ((i - n / 2) / n) * 100) / 1000
    obj.material.uniforms.volume.value = volume
  })

  renderer.render(scene, camera)
  requestAnimationFrame(update)
}
