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
  font-family: 'Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;
}

#app {
  background-color :#1db8a3;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  max-width: 500px;
  margin: 0 auto;
  min-height: 100vh;
}

#container {
  margin:10px 0vw 0px 0vw;
}

#footer-container{
  /* margin: 5px 5vw; */
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
  font-size: 150%;
}

.base-box {
  background-color: #fff;
  min-height: 80vh;
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

.input-valid-message{
  font-size: 70%;
}
.valid-message-container{
  text-align: left;
}

.valid-error-active{
  border: 1px solid #cf5271;
}
.valid-error{
  font-weight: bold;
  color: #cf5271;
  font-size: 3vw;
}

/* セレクト */
.cp_ipselect {
  position: relative;
  width: 65vw;
  margin: 30px 0 0 0;
  text-align: center;
}
.cp_sl06 {
  position: relative;
  background-color: transparent;
  width: 100%;
  padding: 10px 10px 5px 0;
  font-size: 4vw;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #2c3e50;
}
.cp_sl06:focus {
  outline: none;
  border-bottom: 1px solid #2c3e50;
}
.cp_ipselect .cp_sl06 {
  appearance: none;
  -webkit-appearance:none
}
.cp_ipselect select::-ms-expand {
  display: none;
}
.cp_ipselect:after {
  position: absolute;
  top: 18px;
  right: 10px;
  width: 0;
  height: 0;
  padding: 0;
  content: '';
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #2c3e50;
  pointer-events: none;
}
.cp_sl06_selectlabel {
  color: #2c3e50;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10px;
  transition: 0.2s ease all;
}
.cp_sl06:focus ~ .cp_sl06_selectlabel, .cp_sl06:valid ~ .cp_sl06_selectlabel {
  color: #fff;
  top: -20px;
  transition: 0.2s ease all;
  font-size: 3vw;
}
.cp_sl06_selectbar {
  position: relative;
  display: block;
  width: 100%;
}
.cp_sl06_selectbar:before, .cp_sl06_selectbar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #fff;
  transition: 0.2s ease all;
}
.cp_sl06_selectbar:before {
  left: 50%;
}
.cp_sl06_selectbar:after {
  right: 50%;
}
.cp_sl06:focus ~ .cp_sl06_selectbar:before, .cp_sl06:focus ~ .cp_sl06_selectbar:after {
  width: 50%;
}
.cp_sl06_highlight {
  position: absolute;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* チェックボックス */
.cp_ipcheck {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  color: #a1b1c0;
  width: 65vw;
}
.cp_ipcheck:before, .cp_ipcheck:after {
  -webkit-box-sizing: inherit;
          box-sizing: inherit;
}
.cp_ipcheck .box {
  width: 90%;
  margin: 2em auto;
  text-align: left;
  border: 1px solid white;
  border-radius: 5px;
  background: #ffffff;
}
.cp_ipcheck input[type=checkbox] {
  display: none;
}
.cp_ipcheck label:focus,
.cp_ipcheck label:hover,
.cp_ipcheck label:active,
.cp_ipcheck input:checked + label {
  color: #cf5271;
}
.cp_ipcheck label:focus:before,
.cp_ipcheck label:hover:before,
.cp_ipcheck label:active:before,
.cp_ipcheck input:checked + label:before {
  border-color: #cf5271;
  background: #ffffff;
}
.cp_ipcheck label {
  font-size: 4vw;
  font-weight: bold;
  line-height: 1;
  position: relative;
  display: block;
  overflow: hidden;
  padding: 5px 200px 5px 3em;
  cursor: pointer;
  -webkit-transition: all 0.15s ease;
          transition: all 0.15s ease;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: #ffffff;
}
.cp_ipcheck label:before {
  position: absolute;
  top: 8px;
  left: 10px;
  width: 5px;
  height: 5px;
  content: '';
  border: 0.2em solid #cccccc;
}
.cp_ipcheck input:checked + label:before {
  border-color: #cf5271;
  background: #cf5271;
}
</style>
