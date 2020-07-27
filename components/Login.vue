<template>
  <div>
    <!-- <v-btn color="green" @click="metaMaskConnect()">Connect MetaMask</v-btn> -->
    <v-btn v-if="isMetaMask==true" color="green" @click="initEth()">Connect MetaMask</v-btn>
    <v-btn v-else color="green">Please Install MetaMask</v-btn>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'isMetaMask'
    ])
  },
  methods: {
    ...mapMutations([
      'metaMaskConnect'
    ]),
    ...mapActions([
      'initEth'
    ])
  }
}
</script>

<style>

</style>