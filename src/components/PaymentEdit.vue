<template>
  <div>
    <h1 class="title">お支払い編集</h1>
    <div class="base-box payment-edit">
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
          <p v-if="Validation.paymentAmount" class="valid-error">
            {{ Validation.paymentAmount }}
          </p>
        </div>
      </div>
      <button @click="validForm">更新</button>
      <button class="cancel-button" @click="cancel(travelId)">キャンセル</button>
      <button class="delete-button" @click="openDeleteModal">削除</button>
    </div>
    <div class="overlay" v-show="showDeleteModal">
      <p>本当に削除しますか？</p>
      <div class="modal-button">
        <button @click="closeDeleteModale">いいえ</button>
        <button @click="deletePayment">はい</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentEdit',
  data () {
    return {
      travelers: [],
      showDeleteModal: false,
      payerSelected: 0,
      payerOptions: [],
      borrowers: [],
      paymentTitle: '',
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
    this.getBorrowers()
  },
  methods: {
    cancel: function () {
      this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
    },
    getTravelId () {
      this.$seisankunApi.get('/v1/travel/id/' + this.$route.params.travel_hash_id + '')
        .then(response => {
          this.travelId = response.data
          this.getTraveler(response.data)
          this.getPaymentData(response.data)
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
        this.edit()
      } else {
        scrollTo(0, 0)
      }
      e.preventDefault()
    },
    edit: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.put('/v1/payment/data/update', {
        id: this.$route.params.payment_id,
        payerId: this.payerSelected,
        title: this.paymentTitle,
        borrowers: this.borrowers,
        amount: this.paymentAmount,
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
    },
    getBorrowers () {
      this.$seisankunApi.get('/v1/borrower/' + this.$route.params.payment_id + '')
        .then(response => {
          response.data.forEach(element => {
            this.borrowers.push(element.id)
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
    },
    getPaymentData () {
      this.$seisankunApi.get('/v1/payment/info/' + this.$route.params.payment_id + '')
        .then(response => {
          this.paymentTitle = response.data.title
          this.payerSelected = response.data.payerId
          this.paymentAmount = response.data.amount
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
    deletePayment () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.delete('/v1/payment/data/delete', {
        data: {
          id: this.$route.params.payment_id,
          updatedBy: userId
        }
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
    openDeleteModal () {
      this.showDeleteModal = true
    },
    closeDeleteModale () {
      this.showDeleteModal = false
    }
  }
}
</script>

<style scoped>
.input-text{
  width: 90%;
  margin:0;
}

.input-text-amount{
  width: 83%;
  margin:0;
}

.input-title{
  font-size: 100%;
  color: #2c3e50;
}

.base-box{
  background-color: #1db8a3;
}

.edit-area{
  margin-bottom: 30px;
  width: 70%;
}

.payment-edit{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center
}

button{
  width: 65%;
  height: 10vw;
  max-height: 40px;
}

.cancel-button{
  margin-top: 10px;
  color: #fff;
  border:1px solid  #fff;
  background-color: #1db8a3;
}

.delete-button{
  margin-top: 50px;
  color: #fff;
  background-color: #2c3e50;
}
</style>
