<template>
  <div>
    <h1 class="title">旅行詳細</h1>
    <ul class="base-box">
      <li class="travel-detail">{{ travel.name }}</li>
      <li class="travel-detail">{{ travel.travelStart }}</li>
      <li class="travel-detail">{{ travel.travelEnd }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TravelInfo',
  data () {
    return {
      travel: ''
    }
  },
  created () {
    this.getTravel()
  },
  methods: {
    getTravel () {
      this.$seisankunApi.get('/v1/travel/info/' + this.$route.params.travel_id + '')
        .then(response => {
          this.travel = response.data
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
.travel-detail{
  color: #2c3e50;
}
</style>
