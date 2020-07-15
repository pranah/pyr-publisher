<template>
    <div>
        <h3>LibP2Peers: {{ peerConnections }}</h3>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {

    methods: {
      ...mapActions([
      ])
    },
    computed: {
      ...mapState([
          'peerConnections'
      ])
    },
    created() {
    }      
    
}
</script>

<style>

</style>