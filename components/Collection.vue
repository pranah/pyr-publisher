<template>
    <v-col>
        <h3>Personal Collection</h3>
        <v-list v-for="content in collectedContent" :key="collectedContent.indexOf(content)">
            <v-list-item>
                <v-row>
                    <Content v-bind:content="content"/>                        
                    <v-col>
                        <v-btn color="green" @click="getContent(content)">Download</v-btn>
                    </v-col>
                </v-row>                    
            </v-list-item>
        </v-list>
    </v-col>        
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState([
            'collectedContent'
        ])
    },
    methods: {
        ...mapActions([
            'getContent'
        ])
    }
}
</script>

<style>

</style>