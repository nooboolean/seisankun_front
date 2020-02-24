<template>
  <div>
      <ul>
        <li>{{ travel.name }}</li>
        <li>{{ travel.travelStart }}</li>
        <li>{{ travel.travelEnd }}</li>
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

</style>
