<template>
<div v-bind:id="this.id" class="target" />
</template>

<script>
import * as THREE from 'three'
var camera, scene, renderer
var geometry, material, mesh
export default {
  props: ['id'],
  methods: {
    init: function () {
      var container = document.getElementById(this.id)
      //  console.log(container.clientHeight)
      camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )
      camera.position.z = 1

      scene = new THREE.Scene()

      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      material = new THREE.MeshNormalMaterial()

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.02
      renderer.render(scene, camera)
    }
  },
  mounted () {
    this.init()
    this.animate()
  }
}
</script>

<style>
.target {
  width: 320px;
  height: 320px;
}
</style>
