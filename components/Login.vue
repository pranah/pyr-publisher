<template>
  <v-layout row wrap>
      <v-flex >
        <v-card>
            <h1>Login</h1>
            <v-btn color="success" @click="metaMaskConnected()">Connect MetaMask</v-btn>
        </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations([
            'metaMaskConnected'
        ])
    }
}
</script>

<style>

</style>