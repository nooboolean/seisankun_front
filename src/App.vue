<template>
  <div id="app">
    <Navigation/>
    <div id="container">
      <router-view/>
    </div>
    <div id="footer-container">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Navigation,
    Footer
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
  margin:10px 0vw 0px 0vw;
}

#footer-container{
  margin: 5px 5vw;
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
}

.flex{
  display: flex;
}

.overlay{
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

}
</style>
