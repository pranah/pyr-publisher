<template>
    <v-row>
        <v-col>  
            <h3>Publish Work</h3>
            <v-form>
                <v-text-field 
                    required
                    label="Title"
                    v-model="content.title"
                />
                <v-text-field 
                    required
                    label="Content to Publish (file path)"
                    v-model="content.file"
                />
                <v-text-field 
                    type="number" 
                    min="0" 
                    max="999999" 
                    label="ISBN"
                    v-model="content.isbn"
                />
                <v-text-field 
                    type="number"
                    min="0" 
                    max="999999" 
                    label="Price"
                    v-model="content.price"
                />
                <v-text-field 
                    type="number" 
                    min="0" 
                    max="999999" 
                    label="Secondhand transaction cut"
                    v-model="content.transactionCut"
                />
                <v-btn color="green" @click="publish(content)">Publish</v-btn>
            </v-form>
        </v-col>
    </v-row>    
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data: () => ({
        content: {
            title: '',
            file: '',
            isbn: 0,
            price: 0,
            transactionCut: 0
        }
    }),
    computed: {
        ...mapState('fleek',[
            'client'
        ]),
        ...mapState('web3', [
            'prana'
        ])
    },
    methods: {
        ...mapActions('fleek',[
            'publish'
        ])
    },
}
</script>

<style>

</style>