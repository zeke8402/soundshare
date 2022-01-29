<template>
  <main>
    <h1> Audio Test Component</h1> 
    <div class="square" id="audioTestOne" />
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
      const container = document.getElementById('audioTestOne')
      const fftSize = 128

      renderer = new THREE.WebGLRenderer( { antialias: true } )
      renderer.setSize( container.clientWidth, container.clientHeight)
      renderer.setClearColor( 0x000000 )
      renderer.setPixelRatio( window.devicePixelRatio )
      container.appendChild( renderer.domElement )

      scene = new THREE.Scene()

      camera = new THREE.Camera()

      //

      const listener = new THREE.AudioListener()

      const audio = new THREE.Audio( listener );
      const file = '../music/doi-elite.mp3';

      if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {

        const loader = new THREE.AudioLoader();
        loader.load( file, function ( buffer ) {

          audio.setBuffer( buffer );
          audio.play();

        } );

      } else {

        const mediaElement = new Audio( file );
        mediaElement.play();

        audio.setMediaElementSource( mediaElement );

      }

      analyser = new THREE.AudioAnalyser( audio, fftSize );

      //

      const format = ( renderer.capabilities.isWebGL2 ) ? THREE.RedFormat : THREE.LuminanceFormat;

      uniforms = {

        tAudioData: { value: new THREE.DataTexture( analyser.data, fftSize / 2, 1, format ) }

      };

      const material = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent

      } );

      const geometry = new THREE.PlaneGeometry( 1, 1 );

      const mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      //

      window.addEventListener( 'resize', this.onWindowResize );

      this.animate();

    },
    onWindowResize: function(){

      renderer.setSize( window.innerWidth, window.innerHeight );

    },
    animate: function() {

      requestAnimationFrame( this.animate );

      this.render();

    },
    render: function() {

      analyser.getFrequencyData();

      uniforms.tAudioData.value.needsUpdate = true;

      renderer.render( scene, camera );

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
