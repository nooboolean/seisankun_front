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
  font-family: 'Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;
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

input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #179585;
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
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

}
.datepicker-calendar{
  color: #2c3e50;
  width: 100% !important;
}
.day{
  color: #1a4b44;
}
.day:hover{
  border: 1px solid #cf5271 !important;
}
.highlighted{
  color: #1db8a3 !important;
  background: none !important;
}
.selected{
  background: #cf5271 !important;
  color: #fff !important;
}
</style>
