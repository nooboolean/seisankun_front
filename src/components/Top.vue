<template>
  <div>
    <h1 class="title">{{ user.name }}さんの旅行一覧</h1>
    <ul class="base-box travel-container">
      <ul class="travels-tab-menu flex">
        <li class="travels-tab-button" v-on:click="tabChange('future')" v-bind:class="{'tab-active': isActive === 'future'}">今後の予定</li>
        <li class="travels-tab-button" v-on:click="tabChange('past')" v-bind:class="{'tab-active': isActive === 'past'}">過去の予定</li>
      </ul>
      <li v-if="isActive === 'future' && !futureTravels"></li>
      <li v-else-if="isActive === 'future'" class="travel" v-for="travel in futureTravels">
        <router-link v-bind:to="{ name : 'TravelInfo', params : { travel_hash_id: travel.travel.hashId }}">
          <div class="travel-card-title-container flex">
            <div class="travel-datetime">
              <p class="">{{ customformat(travel.travel.travelStart) }}<span class="ravel-between"> 〜 </span>{{ customformat(travel.travel.travelStart) }}</p>
            </div>
            <div class="travel-title">
              <p class="travel-title-text">{{ travel.travel.name }}</p>
            </div>
          </div>
          <div class="travel-card-member-container flex">
            <div class="travel-member-label">
              <p class="travel-member-label-text">参加者</p>
            </div>
            <div class="travel-member-list flex">
              <p class="travel-member-name" v-for="user in travel.user">
                {{ user.name }}/
              </p>
            </div>
          </div>
        </router-link>
       </li>
      <li v-else-if="isActive === 'past' && !pastTravels"></li>
      <li v-else-if="isActive === 'past'" class="travel" v-for="travel in pastTravels">
        <router-link v-bind:to="{ name : 'TravelInfo', params : { travel_hash_id: travel.travel.hashId }}">
          <div class="travel-card-title-container flex">
            <div class="travel-datetime">
              <p class="">{{ customformat(travel.travel.travelStart) }}<span class="ravel-between"> 〜 </span>{{ customformat(travel.travel.travelStart) }}</p>
            </div>
            <div class="travel-title">
              <p class="travel-title-text">{{ travel.travel.name }}</p>
            </div>
          </div>
          <div class="travel-card-member-container flex">
            <div class="travel-member-label">
              <p class="travel-member-label-text">参加者</p>
            </div>
            <div class="travel-member-list flex">
              <p class="travel-member-name" v-for="user in travel.user">
                {{ user.name }}/
              </p>
            </div>
          </div>
        </router-link>
       </li>
       <div class="register-button-container">
          <div class="register-button flex">
            <router-link class="register--button-text" to="travel/register">+</router-link>
          </div>
       </div>
    </ul>
  </div>
</template>

<script>
import Firebase from '../plugins/firebase'
import moment from 'moment'
export default {
  name: 'Top',
  data () {
    return {
      futureTravels: [],
      pastTravels: [],
      isActive: 'future'
    }
  },
  mounted () {
    this.getUserId()
  },
  methods: {
    tabChange (tabName) {
      this.isActive = tabName
    },
    customformat (value) {
      return moment(value).format('YYYY/MM/DD')
    },
    getUserId () {
      this.$seisankunApi.get('/v1/user/info/' + this.$store.getters.userByFirebase.uid + '')
        .then(response => {
          this.getTravels(response.data.id)
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
    getTravels (userId) {
      this.$seisankunApi.get('/v1/travel/list/' + userId + '')
        .then(response => {
          response.data.some(travel => {
            if (travel.travel.travelStart >= moment().format('YYYY-MM-DD')) {
              this.futureTravels.push(travel)
              return false
            }
            if (travel.travel.travelStart < moment().format('YYYY-MM-DD')) {
              this.pastTravels.push(travel)
              return false
            }
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
  },
  computed: {
    user () {
      return this.$store.getters.userBySeisankun
    }
  }
}
</script>

<style scoped>
.travels-tab-menu{
  color: #2c3e50;
  justify-content: space-around;
  margin-bottom: 20px;
}

.travels-tab-button{
  padding-top: 5%;
  height: 5%;
  width: 50%;
  font-size: 100%;
  cursor: pointer;
}

.tab-active{
  border-bottom: 2px solid #1db8a3;
}

.travel-datetime{
  text-align: left;
}

.travel{
  margin: 0px 5px 20px 5px;
  box-shadow: 1px 2px 2px 1px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  font-size: 70%;
}

.travel-title{
  height: 15vw;
  max-height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.travel-title-text{
  font-size: 170%;
  text-shadow: 2px 2px 5px #2c3e50;
}

.travel-card-title-container{
  background-color: #1db8a3;
  color: #fff;
  flex-direction: column;
  max-height: 100px;
  padding: 5px;
}

.travel-container{
  display: flex;
  flex-direction: column;
  padding-top:0;
}

.travel-card-member-container{
  flex-direction: column;
  padding: 5px;
  color: #2c3e50;
}

.travel-member-label{
  display: flex;
  flex-direction: flex-start;
}

.travel-member-label-text{
  font-weight: bold;
}

.register-button-container {
  position: fixed;
  top: 80%;
  display: flex;
  width: 90%;
  max-width: 450px;
  justify-content: flex-end;
}

.register-button{
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 10vw;
  width: 15vw;
  height: 15vw;
  max-width: 75px;
  max-height: 75px;
  background-color: #cf5271;
  border-radius: 100%;
  box-shadow: 1px 2px 2px 1px rgba(0,0,0,0.4);
}
@media (min-width: 500px) {
  .register-button {
    font-size: 55px;
  }
}
.register--button-text {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  align-self: center;
}
.travel-between{
  margin: 0 10px;
}

.travel-member-list{
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0 5px;
}

.travel-member-name{

}
</style>
