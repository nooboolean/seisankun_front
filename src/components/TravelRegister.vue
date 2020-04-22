<template>
  <div>
    <h1 class="title">旅行作成</h1>
    <div class="base-box travel-regist">
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
      <!-- <h3>プライベートモード</h3>
      <select v-model="privateFlagSelected">
        <option v-for="privateFlag in privateOptions" v-bind:value="privateFlag.value">
          {{ privateFlag.text }}
        </option>
      </select> -->
      <button @click="validForm">登録</button>
      <button class="cancel-button" @click="cancel">キャンセル</button>
    </div>
  </div>
</template>

<script>
import vuejsDatepicker from 'vuejs-datepicker'
import moment from 'moment'
import {ja} from 'vuejs-datepicker/dist/locale'
export default {
  name: 'TravelRegister',
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
      travelName: null,
      travelStart: moment().format('YYYY-MM-DD'),
      travelEnd: moment().format('YYYY-MM-DD'),
      privateFlagSelected: 0,
      privateOptions: [
        { text: '未設定', value: 0 },
        { text: 'プライベート', value: 1 }
      ],
      Validation: {
        travelName: null
      }
    }
  },
  methods: {
    customformat (value) {
      return moment(value).format('YYYY年 MM月 DD日')
    },
    cancel: function () {
      this.$router.push('/top')
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
        this.register()
      } else {
        scrollTo(0, 0)
      }
      e.preventDefault()
    },
    register: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.post('/v1/travel/register', {
        name: this.travelName.trim(),
        travelStart: moment(this.travelStart).format('YYYY-MM-DD'),
        travelEnd: moment(this.travelEnd).format('YYYY-MM-DD'),
        privateFlag: this.privateFlagSelected,
        createdBy: userId,
        updatedBy: userId
      })
        .then(async response => {
          // await this.joinTravel(response.data.id, userId)
          await this.$router.push('/travel/info/' + response.data.hashId + '')
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
    joinTravel (travelId, userId) {
      this.$seisankunApi.post('/v1/travel/join', {
        travelId: travelId,
        userId: userId,
        createdBy: userId
      })
        .then(async response => {
          return true
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
.input-title{
  font-size: 4vw;
  color: #2c3e50;
}
.edit-area{
  margin-bottom: 20px;
}
.travel-regist {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #1db8a3;
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
</style>
