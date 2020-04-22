<template>
  <div>
    <h1 class="title">{{ borrowHistoryList[0].userName }} さんの貸借履歴</h1>
    <div class="base-box">
      <ul class="borrow-history-container flex">
        <li class="borrow-history-list-header flex">
          <div class="borrow-history-list-left flex">清算名</div>
          <div class="borrow-history-list-right flex">貸借金額</div>
        </li>
        <li class="borrow-history-list flex" v-for="borrowHistory in borrowHistoryList">
          <div class="borrow-history-list-left flex">
            <p class="borrow-history-title">{{ borrowHistory.paymentTitle }}</p>
          </div>
          <div class="borrow-history-list-right flex">
            <p v-if="isPositiveSign(borrowHistory.borrowMoney)" class="borrow-history-amount blue">{{ paymentDisplay(borrowHistory.borrowMoney) }}</p>
            <p v-else class="borrow-history-amount red">{{ paymentDisplay(borrowHistory.borrowMoney) }}</p>
          </div>
        </li>
      </ul>
      <button @click="back()">もどる</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowBorrowHistory',
  data () {
    return {
      borrowHistoryList: []
    }
  },
  mounted () {
    this.getBorrowHistory()
  },
  methods: {
    back () {
      this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
    },
    isPositiveSign (number) {
      if (number >= 0) {
        return true
      }
      return false
    },
    paymentDisplay (payment) {
      return payment.toLocaleString('ja-JP', {"style":"currency", "currency":"JPY"});
    },
    getBorrowHistory () {
      this.$seisankunApi.get('/v1/borrow_history/show/' + this.$route.params.borrower_id + '/' + this.$route.params.travel_hash_id + '')
        .then(response => {
          this.borrowHistoryList = response.data
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
.borrow-history-list-header{
  padding-right: 6vw;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px dotted #abacad;
  margin-bottom: 10px;
  align-items: center;
  color: #3b4147;
  font-size: 3vw;
}

.borrow-history-container{
  flex-direction: column;
  color: #2c3e50;
  margin-top: 10px;
}

.borrow-history-list{
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #2c3e50;
  margin-bottom: 20px;
  align-items: center;
}

.borrow-history-list-left{
  flex-direction: column;
  text-align: left;
}

.borrow-history-list-right{

}

.borrow-history-amount{
  font-size: 5vw;
  margin-right: 6vw;
}

.blue{
  color: #206dc5;
}

.red{
  color: #dd4a76;
}
</style>
