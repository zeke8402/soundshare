<template>
<main>
 <h1> Audio Test Component</h1> 
 <div class="square" id="canvas" />
 <v-btn id="startButton" primary>Click to play</v-btn>
</main>
</template>

<script>
import * as THREE from 'three'
var camera, renderer, scene, sound

export default {
  methods: {
    attachListener: function () {
      var playBtn = document.getElementById('startButton')
      playBtn.addEventListener('click', this.init)
    },
    init: function () {
      var container = document.getElementById('canvas')
      camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)
      scene = new THREE.Scene()

      var listener = new THREE.AudioListener()
      camera.add(listener)

      // create global audio source
      sound = new THREE.Audio(listener)

      // load sound and set it as Audio object's buffer
      var audioLoader = new THREE.AudioLoader()
      audioLoader.load('../music/4against3.mp3', function (buffer) {
        sound.setBuffer(buffer)
        sound.setLoop(false)
        sound.setVolume(0.5)
        sound.play()
      })

      // var material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      var geometry = new THREE.Geometry()
      geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
      geometry.vertices.push(new THREE.Vector3(0, 10, 0))
      geometry.vertices.push(new THREE.Vector3(10, 0, 0))
      // var line = new THREE.Line(geometry, material)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      // var analyser = new THREE.AudioAnalyser(sound, 32)
      renderer.render(scene, camera)
    }
  },
  mounted () {
    this.attachListener()
  }
}
</script>

<style>
.square {
  width: 320px;
  height: 320px;
  background-color: green;
}
</style>
