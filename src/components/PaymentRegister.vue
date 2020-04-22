<template>
  <div>
    <h1 class="title">支払いの追加</h1>
    <div class="base-box payment-register">
      <div class="edit-area">
        <h2 class="input-title">タイトル</h2>
        <input class="input-text" type="text" placeholder="例)宿泊代" v-model="paymentTitle" v-bind:class="{'valid-error-active': Validation.paymentTitle}">
        <div class="valid-message-container">
          <p class="input-valid-message">※1文字以上20文字以内でご記入ください</p>
          <p v-if="Validation.paymentTitle" class="valid-error">
            {{ Validation.paymentTitle }}
          </p>
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
        <p v-if="Validation.payerSelected" class="valid-error">
          {{ Validation.payerSelected }}
        </p>
      </div>
      <div class="edit-area">
        <h2 class="input-title">借り手</h2>
        <div class="cp_ipcheck" v-bind:class="{'valid-error-active': Validation.borrowers}">
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
        <p v-if="Validation.borrowers" class="valid-error">
          {{ Validation.borrowers }}
        </p>
      </div>
      <div class="edit-area">
        <h2 class="input-title">料金</h2>
        <div>
          <input class="input-text-amount" type="text" placeholder="例)1000" v-model="paymentAmount" v-bind:class="{'valid-error-active': Validation.paymentAmount}">円
        </div>
        <div class="valid-message-container">
          <p class="input-valid-message">※半角数字でご入力ください</p>
        </div>
        <p v-if="Validation.paymentAmount" class="valid-error">
          {{ Validation.paymentAmount }}
        </p>
      </div>
      <button @click="validForm">追加</button>
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
      payerSelected: null,
      payerOptions: [],
      paymentTitle: '',
      borrowers: [],
      paymentAmount: '',
      travelId: '',
      travelerIdList: [],
      Validation: {
        paymentTitle: null,
        payerSelected: null,
        borrowers: null,
        paymentAmount: null
      }
    }
  },
  mounted () {
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
          let errStatus
          for (let key of Object.keys(err)) {
            if (key === 'response') {
              errStatus = err[key].status
            }
          }
          if (typeof errStatus === 'undefined') {
            errStatus = 'なし'
          }
          alert('ステータスコード：' + errStatus + '\nシステムエラーが発生しました。')
        })
    },
    cancel: function () {
      this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
    },
    validForm: function (e) {
      let validPaymentTitle = false
      let validPayer = false
      let validBorrowers = false
      let validPaymentAmount = false
      // タイトルのバリデーション
      if (!this.paymentTitle.trim()) {
        this.Validation.paymentTitle = 'タイトルの入力は必須です'
      } else if (this.paymentTitle.length > 20) {
        this.Validation.paymentTitle = '20文字以内で入力してください'
      } else {
        this.Validation.paymentTitle = null
        validPaymentTitle = true
      }
      // 立て替え者のバリデーション
      if (!this.payerSelected) {
        this.Validation.payerSelected = '立て替え者の選択は必須です'
      } else if (!this.travelerIdList.includes(this.payerSelected)) {
        this.Validation.payerSelected = '不正な値です'
      } else {
        this.Validation.payerSelected = null
        validPayer = true
      }
      // 借り手のバリデーション
      if (this.borrowers.length === 0) {
        this.Validation.borrowers = '借り手は1人以上指定してください'
      } else {
        this.Validation.borrowers = null
        validBorrowers = true
      }
      // 料金のバリデーション
      if (!String(this.paymentAmount).trim()) {
        this.Validation.paymentAmount = '料金の入力は必須です'
      } else if (!String(this.paymentAmount).trim().match(/^([1-9]\d*|0)$/)) {
        this.Validation.paymentAmount = '料金は半角数字をご入力ください'
      } else if (String(this.paymentAmount).trim().length > 10) {
        this.Validation.paymentAmount = '料金は10桁以内でご入力ください'
      } else {
        this.Validation.paymentAmount = null
        validPaymentAmount = true
      }

      if (validPaymentTitle === true && validPayer === true && validBorrowers === true && validPaymentAmount === true) {
        this.register()
      } else {
        scrollTo(0, 0)
      }
      e.preventDefault()
    },
    register: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.post('/v1/payment/register', {
        travelId: this.travelId,
        payerId: this.payerSelected,
        title: this.paymentTitle,
        borrowers: this.borrowers,
        amount: this.paymentAmount,
        createdBy: userId,
        updatedBy: userId
      })
        .then(response => {
          this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
        })
        .catch(err => {
          let errStatus
          for (let key of Object.keys(err)) {
            if (key === 'response') {
              errStatus = err[key].status
            }
          }
          if (typeof errStatus === 'undefined') {
            errStatus = 'なし'
          }
          alert('ステータスコード：' + errStatus + '\nシステムエラーが発生しました。')
        })
    },
    getTraveler (travelId) {
      this.$seisankunApi.get('/v1/traveler/' + travelId + '')
        .then(response => {
          this.payerOptions = response.data
          this.travelers = response.data
          response.data.forEach(element => {
            this.borrowers.push(element.id)
            this.travelerIdList.push(element.id)
          })
        })
        .catch(err => {
          let errStatus
          for (let key of Object.keys(err)) {
            if (key === 'response') {
              errStatus = err[key].status
            }
          }
          if (typeof errStatus === 'undefined') {
            errStatus = 'なし'
          }
          alert('ステータスコード：' + errStatus + '\nシステムエラーが発生しました。')
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
