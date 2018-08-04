<template>
<main>
 <h1> Audio Test Component</h1> 
 <div class="square" id="canvas" />
</main>
</template>

<script>
import * as THREE from 'three'
var camera, renderer

export default {
  methods: {
    init: function () {
      var container = document.getElementById('canvas')
      camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )

      renderer = new THREE.WebGLRenderer({ antialias: true })
      container.appendChild(renderer.domElement)
    },
    play: function () {
      var listener = new THREE.AudioListener()
      camera.add(listener)

      // create global audio source
      var sound = new THREE.Audio(listener)

      // load sound and set it as Audio object's buffer
      var audioLoader = new THREE.AudioLoader()
      audioLoader.load('../music/4against3.mp3', function (buffer) {
        sound.setBuffer(buffer)
        sound.setLoop(true)
        sound.setVolume(0.5)
        sound.play()
      })

      var analyser = new THREE.AudioAnalyser(sound, 32)
      this.waitForTimer(analyser)
    },
    waitForTimer: async function (analyser) {
      while (true) {
        console.log(analyser.getFrequencyData())
        await this.sleep(5000)
      }
    },
    sleep: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  mounted () {
    this.init()
    this.play()
  }
}
</script>

<style>
.square {
  width: 640px;
  height: 640px;
  background-color: green;
}
</style>
