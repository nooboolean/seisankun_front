<template>
  <div>
    <h1 class="title">支払いの追加</h1>
    <div class="base-box payment-register">
      <div class="edit-area">
        <h2 class="input-title">タイトル</h2>
        <input class="input-text" type="text" placeholder="例)宿泊代" v-model="title">
        <div class="valid-message-container">
          <p class="input-valid-message">※1文字以上20文字以内でご記入ください</p>
        </div>
      </div>
      <div class="edit-area">
        <h2 class="input-title">立て替え者</h2>
        <div class="cp_ipselect">
          <select class="cp_sl06" v-model="payerSelected">
            <option v-for="payer in payerOptions" v-bind:value="payer.id">
              {{ payer.name }}
            </option>
          </select>
          <span class="cp_sl06_highlight"></span>
          <span class="cp_sl06_selectbar"></span>
          <label class="cp_sl06_selectlabel">選択してください</label>
        </div>
      </div>
      <div class="edit-area">
        <h2 class="input-title">借り手</h2>
        <div class="cp_ipcheck">
          <li v-for="traveler in travelers">
            <input
            :id="'traveler' + traveler.id"
            type="checkbox"
            :value="traveler.id"
            v-model="borrowers"
            />
            <label :for="'traveler' + traveler.id">{{ traveler.name }}</label>
          </li>
        </div>
      </div>
      <div class="edit-area">
        <h2 class="input-title">料金</h2>
        <div>
          <input class="input-text-amount" type="text" placeholder="例)1000" v-model="amount">円
        </div>
        <div class="valid-message-container">
          <p class="input-valid-message">※半角数字でご記入ください</p>
        </div>
      </div>
      <button @click="register">追加</button>
      <button class="cancel-button" @click="cancel">キャンセル</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentRegister',
  data () {
    return {
      travelers: [],
      payerSelected: 0,
      payerOptions: [],
      title: '',
      borrowers: [],
      amount: '',
      travelId: ''
    }
  },
  created () {
    this.getTravelId()
  },
  methods: {
    getTravelId () {
      this.$seisankunApi.get('/v1/travel/id/' + this.$route.params.travel_hash_id + '')
        .then(response => {
          this.travelId = response.data
          this.getTraveler(response.data)
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    cancel: function () {
      this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
    },
    register: function () {
      console.log(this.borrowers)
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.post('/v1/payment/register', {
        travelId: this.travelId,
        payerId: this.payerSelected,
        title: this.title,
        borrowers: this.borrowers,
        amount: this.amount,
        createdBy: userId,
        updatedBy: userId
      })
        .then(response => {
          this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    getTraveler (travelId) {
      this.$seisankunApi.get('/v1/traveler/' + travelId + '')
        .then(response => {
          this.payerOptions = response.data
          this.travelers = response.data
          response.data.forEach(element => {
            this.borrowers.push(element.id)
          })
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
.payment-register {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center
}
.input-text{
  width: 60vw;
  margin:0;
}

.input-text-amount{
  width: 55vw;
  margin:0;
}

.base-box{
  background-color: #1db8a3;
}

.edit-area{
  margin-bottom: 30px;
}

.input-title{
  font-size: 4vw;
  color: #2c3e50;
}

button{
  width: 65vw;
  height: 10vw;
}
.cancel-button{
  margin-top: 10px;
  color: #fff;
  border:1px solid  #fff;
  background-color: #1db8a3;
}
</style>
