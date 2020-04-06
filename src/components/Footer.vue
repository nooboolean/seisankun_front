<template>
  <div class="footer-container">
    <div class="footer-tos-container">
      <router-link to="/tos"><p class="footer-tos">利用規約</p></router-link>
      <router-link to="/tos"><p class="footer-tos">お問い合わせ</p></router-link>
      <router-link to="/tos"><p class="footer-tos">退会申請</p></router-link>
    </div>
    <dir>
      <p class="footer-copyright">Copyright © 2020-2020 nakazaway All Rights Reserved.</p>
    </dir>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer-container{
  display: flex;
  font-size: 3vw;
  flex-direction: column;
}
.footer-tos-container{
  display: flex;
  justify-content: space-between;
  margin: 5px 10vw;
}
.footer-copyright{

}
</style>
