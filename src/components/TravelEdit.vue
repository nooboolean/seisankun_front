<template>
  <div>
    <h1 class="title">旅行編集</h1>
    <div class="base-box travel-edit">
      <div class="edit-area">
        <h2 class="input-title">旅行名</h2>
        <input type="text" placeholder="旅行名" v-model="travelName" v-bind:class="{'valid-error-active': Validation.travelName}">
        <div class="valid-message-container">
          <p class="input-valid-message">※1文字以上20文字以内でご記入ください</p>
          <p v-if="Validation.travelName" class="valid-error">
            {{ Validation.travelName }}
          </p>
        </div>
      </div>
      <div class="edit-area">
        <h2 class="input-title">旅行開始日</h2>
        <div class="datepicker">
          <p>{{customformat(travelStart)}}</p>
          <vuejs-datepicker
              v-model="travelStart"
              :value="this.default"
              :format="DatePickerFormat"
              placeholder="旅行開始日"
              calendar-class=datepicker-calendar
              wrapper-class=datepicker-wrapper
              :inline="true"
              :highlighted="highlighted"
              :language="ja">
          </vuejs-datepicker>
        </div>
      </div>
      <div class="edit-area">
        <h2 class="input-title">旅行終了日</h2>
        <div class="datepicker">
          <p>{{customformat(travelEnd)}}</p>
          <vuejs-datepicker
              v-model="travelEnd"
              :value="this.default"
              :format="DatePickerFormat"
              placeholder="旅行終了日"
              calendar-class=datepicker-calendar
              wrapper-class=datepicker-wrapper
              :inline="true"
              :highlighted="highlighted"
              :language="ja">
          </vuejs-datepicker>
        </div>
      </div>
      <!-- <div class="edit-area">
      <h3>プライベートモード</h3>
        <select v-model="privateFlagSelected">
          <option v-for="privateFlag in privateOptions" v-bind:value="privateFlag.value">
            {{ privateFlag.text }}
          </option>
        </select>
      </div> -->
      <div class="edit-area">
        <button @click="validForm">更新</button>
        <button class="cancel-button" @click="cancel(travelId)">キャンセル</button>
        <button class="delete-button" @click="openDeleteModal">削除</button>
      </div>

      <!-- <div class="edit-area">
        <h3>参加者</h3>
        <ul class="flex traveler-list">
          <li class="traveler-name" v-for="traveler in travelers">
            <p class="traveler-name-name">{{ traveler.name }}</p> <button class="traveler-delete-button" @click="deleteTraveler(travelId, traveler.id, traveler.name)">削除</button>
          </li>
        </ul>
      </div> -->
      </div>
      <div class="overlay" v-show="showDeleteModal">
        <p>本当に削除しますか？</p>
        <div class="modal-button">
          <button @click="closeDeleteModale">いいえ</button>
          <button @click="deleteTravel(travelId)">はい</button>
        </div>
      </div>
  </div>
</template>

<script>
import vuejsDatepicker from 'vuejs-datepicker'
import moment from 'moment'
import {ja} from 'vuejs-datepicker/dist/locale'
export default {
  name: 'TravelEdit',
  components: {
    'vuejs-datepicker': vuejsDatepicker
  },
  data () {
    return {
      default: moment().format('YYYY-MM-DD'),
      DatePickerFormat: 'yyyy-MM-dd',
      highlighted: {
        days: [6, 0]
      },
      ja:ja,
      showDeleteModal: false,
      travelId: '',
      travelName: '',
      travelStart: '',
      travelEnd: '',
      privateFlagSelected: '',
      privateOptions: [
        { text: '未設定', value: 0 },
        { text: 'プライベート', value: 1 }
      ],
      travelers: '',
      Validation: {
        travelName: null
      }
    }
  },
  created () {
    this.getTravelId()
  },
  methods: {
    getTravelId () {
      this.$seisankunApi.get('/v1/travel/id/' + this.$route.params.travel_hash_id + '')
        .then(response => {
          this.getTravel(response.data)
          this.getTraveler(response.data)
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    },
    customformat (value) {
      return moment(value).format('YYYY年 MM月 DD日')
    },
    cancel: function (travelId) {
      this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
    },
    validForm: function (e) {
      let validTravelName = false
      if (!this.travelName.trim()) {
        this.Validation.travelName = '旅行名の入力は必須です'
      } else if (this.travelName.length > 20) {
        this.Validation.travelName = '20文字以内で入力してください'
      } else {
        this.Validation.travelName = null
        validTravelName = true
      }
      if (validTravelName === true) {
        this.edit(this.travelId)
      } else {
        scrollTo(0, 0)
      }
      e.preventDefault()
    },
    edit: function (travelId) {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.put('/v1/travel/info/update', {
        id: travelId,
        name: this.travelName.trim(),
        travelStart: moment(this.travelStart).format('YYYY-MM-DD'),
        travelEnd: moment(this.travelEnd).format('YYYY-MM-DD'),
        privateFlag: this.privateFlagSelected,
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
    deleteTraveler (travelId, secessionUserId, secessionUserName) {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.delete('/v1/travel/secession', {
        data: {
          travelId: travelId,
          userId: secessionUserId,
          deletedBy: userId
        }
      })
        .then(response => {
          alert('' + secessionUserName + 'さんを\n「' + this.travelName + '」から\n削除しました')
          this.$router.push('/travel/info/' + this.$route.params.travel_hash_id + '')
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
          this.travelId = response.data.id
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
    getTraveler (travelId) {
      this.$seisankunApi.get('/v1/traveler/' + travelId + '')
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
    softDeleteTravel (travelId) {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.delete('/v1/travel/delete/1', {
        data: {
          id: travelId,
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
    deleteTravel (travelId) {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.delete('/v1/travel/delete/0', {
        data: {
          id: travelId,
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
.input-title{
  font-size: 4vw;
  color: #2c3e50;
}
.travel-edit{
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #1db8a3;
}
.base-box{
  background-color: #1db8a3;
}
.datepicker-wrapper{
}
.edit-area{
  margin-bottom: 20px;
}
.traveler-list{
  flex-direction: column;
  padding: 0 20vw;
}
.traveler-name{
  justify-content: space-around;
}
.traveler-name-name{
  display: inline-block;
  float: left;
}
.traveler-delete-button{
  display: inline-block;
  float: right;
}
input{
  width: 60vw;
  margin:0;
}
button{
  width: 60vw;
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
