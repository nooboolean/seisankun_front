<template>
  <div>
      <h1> {{title}} </h1>
      <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signout',
  data () {
    return {
      title: 'サインアウト'
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>

<style scoped>

</style>
