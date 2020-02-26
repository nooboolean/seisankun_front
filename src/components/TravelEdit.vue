<template>
  <div>
    <h1 class="title">旅行編集</h1>
    <div class="base-box">
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
      <button @click="cancel">キャンセル</button>
      <button @click="openDeleteModal">削除</button>
      <button @click="edit">更新</button>
    </div>
    <div class="overlay" v-show="showDeleteModal">
      <p>本当に削除しますか？</p>
      <div class="modal-button">
        <button @click="closeDeleteModale">いいえ</button>
        <button @click="deleteTravel">はい</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelEdit',
  data () {
    return {
      showDeleteModal: false,
      travelName: '',
      travelStart: '',
      travelEnd: '',
      privateFlagSelected: '',
      privateOptions: [
        { text: '未設定', value: 0 },
        { text: 'プライベート', value: 1 }
      ]
    }
  },
  created () {
    this.getTravel()
  },
  methods: {
    cancel: function () {
      this.$router.push('/travel/info/' + this.$route.params.travel_id + '')
    },
    edit: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.put('/v1/travel/info/update', {
        id: this.$route.params.travel_id,
        name: this.travelName,
        travelStart: this.travelStart,
        travelEnd: this.travelEnd,
        privateFlag: this.privateFlagSelected,
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
    },
    getTravel () {
      this.$seisankunApi.get('/v1/travel/info/' + this.$route.params.travel_id + '')
        .then(response => {
          this.travelName = response.data.name
          this.travelStart = response.data.travelStart
          this.travelEnd = response.data.travelEnd
          this.privateFlagSelected = response.data.privateFlag
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    softDeleteTravel () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.delete('/v1/travel/delete/1', {
        data: {
          id: this.$route.params.travel_id,
          updatedBy: userId
        }
      })
        .then(response => {
          this.$router.push('/travel/info/' + this.$route.params.travel_id + '')
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    deleteTravel () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.delete('/v1/travel/delete/0', {
        data: {
          id: this.$route.params.travel_id,
          updatedBy: userId
        }
      })
        .then(response => {
          this.$router.push('/top')
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
