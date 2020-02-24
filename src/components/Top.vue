<template>
  <div>
    <ul>
      <li v-for="travel in travels">
        <router-link v-bind:to="{ name : 'TravelInfo', params : { travel_id: travel.id }}">
          <ul class="">
            <li class="">旅行名：{{ travel.name }}</li>
            <li class="">旅行日：{{ travel.travelStart }}</li>
          </ul>
        </router-link>
       </li>
    </ul>
    <router-link to="travel/register">+</router-link>
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

</style>
