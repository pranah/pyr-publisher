<template>
    <v-row>
        <v-col>       
            <h3>Published Work: {{ publishedContent.length }}</h3>
            <v-list v-for="content in publishedContent" :key="publishedContent.indexOf(content)">
                <v-list-item>
                    <Content v-bind:content="content"/>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>    
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'publishedContent'
        ])
    }
}
</script>

<style>

</style>