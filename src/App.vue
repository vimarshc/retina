<template>
  <img alt="Vue logo" src="./assets/logo.png" class="logo">
  <HelloWorld msg="Detect your Retina Images today for Diabetic retinopathy"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>

body {
  background-color: #f0f0f0; /* Adjust color as needed */
}

.logo {
  width: 250px; /* or whatever size you want */
  height: auto; /* maintains aspect ratio */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
