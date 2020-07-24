<template>
    <v-col>
        <h3>Collectable Works</h3>
        <v-list v-for="content in publishedContent" :key="publishedContent.indexOf(content)">
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
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState([
            'publishedContent'
        ])
    },
    methods: {
        ...mapMutations([
            'collectContent'
        ])
    }
}
</script>

<style>

</style>