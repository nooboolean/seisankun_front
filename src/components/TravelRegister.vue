<template>
  <div>
    <h1 class="title">旅行作成</h1>
    <div class="base-box">
      <div class="edit-area">
        <h3>旅行名</h3>
        <input type="text" placeholder="旅行名" v-model="travelName">
      </div>
      <h3>旅行開始日</h3>
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
      <div class="edit-area">
      <h3>旅行終了日</h3>
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
      <button @click="cancel">キャンセル</button>
      <button @click="register">登録</button>
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
      travelName: '',
      travelStart: moment().format('YYYY-MM-DD'),
      travelEnd: moment().format('YYYY-MM-DD'),
      privateFlagSelected: 0,
      privateOptions: [
        { text: '未設定', value: 0 },
        { text: 'プライベート', value: 1 }
      ]
    }
  },
  methods: {
    customformat (value) {
      return moment(value).format('YYYY年 MM月 DD日')
    },
    cancel: function () {
      this.$router.push('/top')
    },
    register: function () {
      let userId = this.$store.getters.userBySeisankun.id
      this.$seisankunApi.post('/v1/travel/register', {
        name: this.travelName,
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
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
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
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}

.base-box{
  background-color: #1db8a3;
}
</style>
