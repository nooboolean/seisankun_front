<template>
  <div>
    <h1 class="title">お支払い編集</h1>
    <div class="base-box">
      <h3>タイトル</h3>
      <input type="text" placeholder="例)宿泊代" v-model="title">
      <h3>立て替え者</h3>
      <select v-model="payerSelected">
        <option v-for="payer in payerOptions" v-bind:value="payer.id">
          {{ payer.name }}
        </option>
      </select>
      <h3>借り手</h3>
      <li v-for="traveler in travelers">
        <input
        :id="'traveler' + traveler.id"
        type="checkbox"
        :value="traveler.id"
        v-model="borrowers"
        />
        <label :for="'traveler' + traveler.id">{{ traveler.name }}</label>
      </li>
      <h3>料金</h3>
      <input type="text" placeholder="例)1000" v-model="amount">円
      <button @click="cancel(travelId)">キャンセル</button>
      <button @click="openDeleteModal">削除</button>
      <button @click="edit">更新</button>
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
.base-box{
  background-color: #1db8a3;
}
</style>
