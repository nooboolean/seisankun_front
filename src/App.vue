<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a{
  color: #1ca593;
  text-decoration: none;
}

a:hover{
  color:#1a9f5a;
}

li{
  list-style: none;
}
</style>
