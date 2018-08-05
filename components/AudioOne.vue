<template>
<main>
 <h1> Audio Test Component</h1> 
 <div class="square" id="canvas" />
 <v-btn id="startButton" primary>Click to play</v-btn>
  <script id="vertexShader" type="x-shader/x-vertex">
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  </script>
  <script id="fragmentShader" type="x-shader/x-fragment">
    uniform sampler2D tAudioData;
    varying vec2 vUv;

    void main() {
      vec3 backgroundColor = vec3(0,0,0);
      vec3 color = vec3(1.0, 1.0, 1.0);
      float f = texture2D(tAudioData, vec2(vUv.x, 0.0)).r;
      float i = step(vUv.y, f) * step(f-0.0125, vUv.y);
      gl_FragColor = vec4(mix(backgroundColor, color, i), 1.0);
    }
  </script>
</main>
</template>

<script>
import * as THREE from 'three'
var camera, renderer, scene, sound, analyser, uniforms

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

      var fftSize = 128

      analyser = new THREE.AudioAnalyser(sound, fftSize)

      uniforms = {
        tAudioData: {
          value: new THREE.DataTexture(
            analyser.data,
            fftSize / 2,
            1,
            THREE.LuminanceFormat
          )
        }
      }

      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
      })
      var geometry = new THREE.PlaneBufferGeometry(1, 1)
      var mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      /*
      // var material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      var geometry = new THREE.Geometry()
      geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
      geometry.vertices.push(new THREE.Vector3(0, 10, 0))
      geometry.vertices.push(new THREE.Vector3(10, 0, 0))
      // var line = new THREE.Line(geometry, material)
      */

      this.animate()
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      analyser.getFrequencyData()
      uniforms.tAudioData.value.needsUpdate = true
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
