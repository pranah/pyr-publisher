<template>
  <div>
    <v-btn color="green" @click="metaMaskConnect()">Connect MetaMask</v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations([
      'metaMaskConnect'
    ])
  }
}
</script>

<style>

</style>