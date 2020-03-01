<template>
  <div>
    <router-link class="back-top" to="/top"><< 旅行一覧</router-link>
    <router-link v-bind:to="{ name : 'TravelEdit', params : { travel_id: travel.id }}"><img class="edit-button" src="@/assets/edit-button.png"></router-link>
    <div class="travel-header">
      <p class="title-label">旅行名</p>
      <h1 class="title">{{ travel.name }}</h1>
      <ul class="flex travel-info-box">
        <li class="travel-detail"><p class="travel-label">旅行開始日</p>{{ customformat(travel.travelStart) }}</li>
        <li class="travel-detail"><p class="travel-label">旅行終了日</p>{{ customformat(travel.travelEnd) }}</li>
      </ul>
      <ul class="traveler-container flex">
        <li class="traveler-label">参加者:</li>
        <div class="flex traveler-container">
          <li class="traveler-name" v-for="traveler in travelers">
            {{ traveler.name }}/
          </li>
        </div>
      </ul>
    </div>
    <div class="base-box">
      <button class="payment-button" @click="paymentRegister">支払いの追加</button>
      <ul class="payment-container flex">
        <li class="payment-amount" v-for="payment in payments">
          {{ payment.payment.title }}
          {{ payment.user.name }}が
          {{ payment.payment.amount }}円支払った
          <router-link v-bind:to="{ name : 'PaymentEdit', params : { payment_id: payment.payment.id ,travel_id: travel.id }}"><img class="edit-button" src="@/assets/edit-button.png"></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TravelInfo',
  data () {
    return {
      travel: '',
      travelers: '',
      payments: ''
    }
  },
  created () {
    this.getTravel()
  },
  methods: {
    customformat (value) {
      return moment(value).format('YYYY年 MM月 DD日')
    },
    getTravel () {
      this.$seisankunApi.get('/v1/travel/info/' + this.$route.params.travel_id + '')
        .then(response => {
          this.travel = response.data
          this.getTraveler()
          this.getPayments()
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    getTraveler () {
      this.$seisankunApi.get('/v1/traveler/' + this.travel.id + '')
        .then(response => {
          this.travelers = response.data
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    getPayments () {
      this.$seisankunApi.get('/v1/payment/history/' + this.travel.id + '')
        .then(response => {
          this.payments = response.data
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    paymentRegister () {
      this.$router.push('/payment/register/' + this.travel.id + '')
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.edit-button{
  position: absolute;
  right: 5vw;
  width: 5vw;
}
.title{
  margin: 0;
}
.travel-header{
  padding: 20px 10vw 0 10vw;
  margin-bottom: 5px;
}
.title-label{
  color: #505253;
  letter-spacing: 5px;
  font-size: 3vw;
}
.travel-detail{
  color: #2c3e50;
  font-size: 3vw;
}
.flex{
  justify-content: space-between;
}
.travel-label{
  text-align: left;
  color: #505253;
  font-size: 2vw;
}
.traveler-container{
  text-align: left;
  justify-content: flex-start;
}
.traveler-name{
  margin-left: 5px;
}

.payment-button{
  width:100%;
  height: 50px;
}

.payment-container{
  flex-direction: column;
  color: #2c3e50;
  margin-top: 10px;
}

.payment-amount{
  border-bottom: 1px solid #2c3e50;
  margin-bottom: 20px;
}
.back-top{
  position: absolute;
  font-size: 4vw;
  color: #2c3e50;
  left: 3vw;
}

.traveler-container{
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
