<template>
  <div>
    <h1 class="title">ユーザー詳細</h1>
    <ul class="base-box">
      <li class="user-label">名前</li>
      <li class="user-detail">{{ user.name }}</li>
      <!-- <li class="user-label">性別</li>
      <li class="user-detail">{{ gender[user.gender].text }}</li>
      <li class="user-label">自己紹介</li>
      <li class="user-detail">{{ user.profile }}</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'about',
  data: function () {
    return {
      gender: [
        { text: '未設定'},
        { text: '男'},
        { text: '女'},
        // eslint-disable-next-line standard/object-curly-even-spacing
        { text: 'その他'}
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.userBySeisankun
    }
  },
  components: {}
}
</script>

<style scoped>
.user-label{
  color: #3e4853;
}
.user-detail{
  font-size: 200%;
  color: #2c3e50;
  margin-bottom: 30px;
  border-bottom: 2px dotted #e4640f;
}
</style>
