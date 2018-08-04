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
      audioLoader.load('../assets/music/4against3.mp3', function (buffer) {
        sound.setBuffer(buffer)
        sound.setLoop(true)
        sound.setVolume(0.5)
        sound.play()
      })
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
