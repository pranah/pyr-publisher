<template>
  <div>
    <p>Please have the following installed and running for this DApp to function.</p>
    <ul>
      <!-- TODO: And conditional indicators for if these are connected or not -->
      <li>LibP2P ID: {{ libp2pId }}</li>
      <li>Meta Mask: {{isMetaMask}}</li>
      <li>Space Daemon: </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    computed: {
      ...mapState([
          'libp2pId',
          'isMetaMask'
      ])
    },
}
</script>

<style>

</style>