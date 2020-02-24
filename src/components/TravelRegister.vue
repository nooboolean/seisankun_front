<template>
  <div>
    <h2>旅行作成</h2>
    <p>旅行名</p>
    <input type="text" placeholder="旅行名" v-model="travelName">
    <h3>旅行開始日</h3>
    <input type="text" placeholder="旅行開始日" v-model="travelStart">
    <h3>旅行終了日</h3>
    <input type="text" placeholder="旅行終了日" v-model="travelEnd">
    <h3>プライベートモード</h3>
    <select v-model="privateFlagSelected">
      <option v-for="privateFlag in privateOptions" v-bind:value="privateFlag.value">
        {{ privateFlag.text }}
      </option>
    </select>
    <button @click="register">登録</button>
  </div>
</template>

<script>
export default {
  name: 'TravelRegister',
  data () {
    return {
      travelName: '',
      travelStart: '2018-01-01',
      travelEnd: '2018-01-01',
      privateFlagSelected: 0,
      privateOptions: [
        { text: '未設定', value: 0 },
        { text: 'プライベート', value: 1 }
      ]
    }
  },
  methods: {
    register: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.post('/v1/travel/register', {
        name: this.travelName,
        travelStart: this.travelStart,
        travelEnd: this.travelEnd,
        privateFlag: this.privateFlagSelected,
        createdBy: userId,
        updatedBy: userId
      })
        .then(response => {
          this.$router.push('/travel/info/' + response.data.id + '')
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
