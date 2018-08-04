<template>
<main>
<v-container fluid fill-height text-xs-center>
  <v-layout flex align-center justify-center>
    <SquareTest :id="'one'" />
  </v-layout>
</v-container>
</main>
</template>

<script>
import SquareTest from '../components/SquareTest.vue'
export default {
  components: {
    SquareTest
  }
}
</script>

<style>
</style>
