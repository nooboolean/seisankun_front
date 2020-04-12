<template>
  <div>
  </div>
</template>

<script>
import firebase from '../plugins/firebase'

export default {
  name: 'Signout',
  data () {
    return {
      title: 'サインアウト'
    }
  },
  created () {
    firebase.logout()
  }
}
</script>

<style scoped>

</style>
