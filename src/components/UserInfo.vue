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
      return this.$store.getters.userBySeisankun
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
