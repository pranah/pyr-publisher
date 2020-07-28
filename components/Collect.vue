<template>
    <v-col>
        <h3>Collectable Works</h3>
        <v-list v-for="content in collectableContent" :key="collectableContent.indexOf(content)">
                <v-list-item>
                    <v-row>
                        <Content v-bind:content="content"/>                        
                        <v-col>
                            <v-btn color="green" @click="collectContent(content)">Buy</v-btn>
                        </v-col>
                    </v-row>                    
                </v-list-item>
        </v-list>
    </v-col>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState("fleek",[
            'collectableContent'
        ])
    },
    // methods: {
    //     ...mapMutations([
    //         'collectContent'
    //     ])
    // }
    methods: {
        ...mapActions('web3', [
            'collectContent'
        ])
    }
}
</script>

<style>

</style>