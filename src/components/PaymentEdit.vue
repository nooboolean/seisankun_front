<template>
  <div>
    <h1 class="title">お支払い編集</h1>
    <div class="base-box payment-edit">
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
      <button @click="edit">更新</button>
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
      title: '',
      amount: '',
      travelId: ''
    }
  },
  created () {
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
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    edit: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.put('/v1/payment/data/update', {
        id: this.$route.params.payment_id,
        payerId: this.payerSelected,
        title: this.title,
        borrowers: this.borrowers,
        amount: this.amount,
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
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
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
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    getPaymentData () {
      this.$seisankunApi.get('/v1/payment/info/' + this.$route.params.payment_id + '')
        .then(response => {
          this.title = response.data.title
          this.payerSelected = response.data.payerId
          this.amount = response.data.amount
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
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
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
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
  width: 60vw;
  margin:0;
}

.input-text-amount{
  width: 55vw;
  margin:0;
}

.input-title{
  font-size: 4vw;
  color: #2c3e50;
}

.base-box{
  background-color: #1db8a3;
}

.edit-area{
  margin-bottom: 30px;
}

.payment-edit{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center
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

.delete-button{
  margin-top: 50px;
  color: #fff;
  background-color: #2c3e50;
}
</style>
