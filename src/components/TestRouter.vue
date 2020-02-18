<template>
  <div>
      <h1> {{title}} </h1>
      <h2>ゲットデータ</h2>
      <p>なまえ</p>
      <p> {{info.name}} </p>
      <p>日にち</p>
      <p>{{info.travelStart}}</p>
  </div>
</template>

<script>
export default {
  name: 'SignOut',
  data () {
    return {
      title: 'しゅんぺい',
      info: '',
      userId: 13,
      error: ''
    }
  },
  created () {
    this.testGetRequest()
  },
  methods: {
    testGetRequest () {
      this.$notRequiresAuthApi.get('/v1/travel/info/' + this.userId + '')
        .then(response => {
          this.info = response.data
        })
        .catch(err => {
          for (let key of Object.keys(err)) {
            console.log(key)
            console.log(err[key])
          }
          // eslint-disable-next-line no-unused-expressions
          (this.errored = true),
          (this.error = err)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style scoped>

</style>
