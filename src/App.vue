<template>
  <div id="app">
    <album_header></album_header>
    <router-view></router-view>
  </div>
</template>

<script>
import album_header from './components/album_header.vue'
export default {
  name: 'app',
  data() {
    return {

    }
  },
  components:{
    "album_header":album_header
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
