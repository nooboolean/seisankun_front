<template>
  <div>
    <router-link class="back-top" to="/top"><< 旅行一覧</router-link>
    <router-link v-bind:to="{ name : 'TravelEdit', params : { travel_hash_id: travel.hashId }}"><img class="edit-button" src="@/assets/edit-button.png"></router-link>
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
        <li class="payment-list flex" v-for="payment in payments">
          <div class="payment-list-left flex">
            <p class="payment-title">{{ payment.payment.title }}</p>
            <p class="payer">{{ payment.user.name }}が立替え</p>
          </div>
          <div class="payment-list-right flex">
            <p class="payment-amount">{{ paymentDisplay(payment.payment.amount) }}</p>
            <router-link v-bind:to="{ name : 'PaymentEdit', params : { payment_id: payment.payment.id ,travel_id: travel.hashId }}"><img class="payment-edit-button" src="@/assets/edit-button.png"></router-link>
          </div>
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
    this.getTravelId()
  },
  methods: {
    paymentDisplay (payment) {
      return payment.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"});
    },
    customformat (value) {
      return moment(value).format('YYYY年 MM月 DD日')
    },
    getTravelId () {
      this.$seisankunApi.get('/v1/travel/id/' + this.$route.params.travel_hash_id + '')
        .then(response => {
          this.getTravel(response.data)
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    getTravel (travelId) {
      this.$seisankunApi.get('/v1/travel/info/' + travelId + '')
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
      this.$router.push('/payment/register/' + this.$route.params.travel_hash_id + '')
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
  margin-right: 5px;
}

.payment-button{
  font-size: 4vw;
  width:100%;
  height: 50px;
}

.payment-container{
  flex-direction: column;
  color: #2c3e50;
  margin-top: 10px;
}

.payment-list{
  padding-bottom: 20px;
  border-bottom: 1px solid #2c3e50;
  margin-bottom: 20px;
  align-items: center;
}

.payment-list-left{
  flex-direction: column;
  text-align: left;
}

.payment-list-right{

}

.payment-edit-button{
  right: 6vw;
  width: 6vw;
}

.payment-amount{
  font-size: 5vw;
  margin-right: 6vw;
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

.payer{
  color: #1db8a3;
  font-size: 3vw;
}
</style>
