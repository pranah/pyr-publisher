<template>
  <div>
    <!-- <v-btn color="green" @click="metaMaskConnect()">Connect MetaMask</v-btn> -->
    <v-btn color="success" @click="initEth()">Connect MetaMask</v-btn>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  methods: {
    ...mapMutations([
      'metaMaskConnect'
    ]),
    ...mapActions({
      initEth: 'web3/initEth'
    })
  }
}
</script>

<style>

</style>