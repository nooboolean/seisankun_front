<template>
  <div>
    <h1 class="title">あなたの旅行一覧</h1>
    <ul class="base-box">
      <li class="travel-comtainer" v-for="travel in travels">
        <router-link v-bind:to="{ name : 'TravelInfo', params : { travel_hash_id: travel.travel.hashId }}">
          <ul class="travel">
            <li class="travel-info"><span class="travel-label">旅行名　：</span> <span class="travel-info-detail">{{ travel.travel.name }}</span></li>
            <li class="travel-info flex traveler-container"><span class="travel-label">参加者　：</span>
              <span class="travel-info-detail flex traveler">
                <li class="traveler-name" v-for="user in travel.user">
                  {{ user.name }}/
                </li>
              </span>
            </li>
            <li class="travel-info">
              <span class="travel-label">旅行期間：</span>
              <span class="travel-info-detail">{{ customformat(travel.travel.travelStart) }}</span>
              <span class="travel-info-detail travel-between">~</span>
              <span class="travel-info-detail">{{ customformat(travel.travel.travelStart) }}</span>
            </li>
          </ul>
        </router-link>
       </li>
    </ul>
    <div class="register-button">
      <router-link to="travel/register">+</router-link>
    </div>
  </div>
</template>

<script>
import Firebase from '../plugins/firebase'
import moment from 'moment'
export default {
  name: 'Top',
  data () {
    return {
      travels: ''
    }
  },
  created () {
    this.getTravels()
  },
  methods: {
    customformat (value) {
      return moment(value).format('YYYY年 MM月 DD日')
    },
    getTravels () {
      this.$seisankunApi.get('/v1/travel/list/' + this.$store.getters.userBySeisankun.id + '')
        .then(response => {
          this.travels = response.data
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
        })
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.travel{
  margin: 0px 5px 20px 5px;
  padding: 5px;
  box-shadow: 1px 2px 2px 1px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  font-size: 3vw;
}

.travel-info{
  display: flex;
}

.travel-label{
  color: #2c3e50;
}

.travel-info-detail{
  color: #1db8a3;
}

.register-button{
  font-weight: bold;
  font-size: 11vw;
  position: fixed;
  top: 570px;
  right: 10px;
  width: 15vw;
  height: 15vw;
  background-color: #e4640f;
  border-radius: 100%;
  box-shadow: 1px 2px 2px 1px rgba(0,0,0,0.4);
}
.travel-between{
  margin: 0 10px;
}
.traveler-container{
  text-align: left;
  align-content: flex-start;
}
.traveler{
  align-content: flex-start;
}
.traveler-name{
  /* margin-right: 1vw; */
}
</style>
