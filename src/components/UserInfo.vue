<template>
  <div>
      <p>{{ user }}</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
