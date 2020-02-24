<template>
  <div id="app">
    <Navigation/>
    <div id="container">
      <router-view/>
    </div>
    <Footer/>
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
* {
  margin: 0;
  padding: 0;
}

body {
  background-color :#1db8a3;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#container {
  margin:10px 5vw 0px 5vw;
}

a{
  color: #fff;
  text-decoration: none;
}

a:hover{
  color:#2c3e50;
}

li{
  list-style: none;
}

button{
  padding: 5px 15px;
  border-radius: 5px;
  color: #1db8a3;
  border:1px solid  #1db8a3;
  background-color: white;
}

button:hover{
  cursor: pointer;
  background-color: #1db8a3;
  border:1px solid  #fff;
  color: white;
}

.title {
  margin-bottom: 10px;
  font-size: 6vw;
}

.base-box {
  background-color: #fff;
  min-height: 500px;
  padding: 20px 10px;
  border-radius: 5px;
}
</style>
