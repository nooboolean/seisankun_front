<template>
  <div>
    <h1 class="title">あなたの旅行一覧</h1>
    <ul class="base-box">
      <li class="travel-comtainer" v-for="travel in travels">
        <router-link v-bind:to="{ name : 'TravelInfo', params : { travel_id: travel.id }}">
          <ul class="travel">
            <li class="travel-info"><span class="travel-label">旅行名：</span> <span class="travel-info-detail">{{ travel.name }}</span></li>
            <li class="travel-info"><span class="travel-label">参加者：</span> <span class="travel-info-detail">あああ</span></li>
            <li class="travel-info"><span class="travel-label">旅行開始：</span> <span class="travel-info-detail">{{ travel.travelStart }}</span></li>
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
</style>
