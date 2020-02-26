<template>
  <div>
    <h1 class="title">支払いの追加</h1>
    <div class="base-box">
      <h3>立て替え者</h3>
      <select v-model="payerSelected">
        <option v-for="payer in payerOptions" v-bind:value="payer.id">
          {{ payer.name }}
        </option>
      </select>
      <h3>料金</h3>
      <input type="text" placeholder="例)1000" v-model="amount">円
      <button @click="cancel">キャンセル</button>
      <button @click="register">追加</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentRegister',
  data () {
    return {
      payerSelected: 0,
      payerOptions: [],
      amount: ''
    }
  },
  created () {
    this.getTraveler()
  },
  methods: {
    cancel: function () {
      this.$router.push('/travel/info/' + this.$route.params.travel_id + '')
    },
    register: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.post('/v1/payment/register', {
        travelId: this.$route.params.travel_id,
        payerId: this.payerSelected,
        amount: this.amount,
        createdBy: userId,
        updatedBy: userId
      })
        .then(response => {
          this.$router.push('/travel/info/' + response.data.travelId + '')
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    getTraveler () {
      this.$seisankunApi.get('/v1/traveler/' + this.$route.params.travel_id + '')
        .then(response => {
          this.payerOptions = response.data
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

.base-box{
  background-color: #1db8a3;
}
</style>
