<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex class="text-center">
      <v-row>
        <v-col>
          <v-card>
            <h3>Publish My Work</h3>
            <v-form>
              <v-file-input multiple label="Select file to publish"></v-file-input>
              <v-file-input multiple label="Select cover image"></v-file-input>
              <v-btn color="success">Publish</v-btn>
            </v-form>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <h3>My Published Works</h3>
            <v-list>
              <v-list-item>
                Book 1: <v-btn rounded color="success">Download?</v-btn>
              </v-list-item>
              <v-list-item>
                Book 2: <v-btn rounded color="success">Download?</v-btn>
              </v-list-item>
              <v-list-item>
                Book 3: <v-btn rounded color="success">Download?</v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
    ])
  },
  created() {
  }  
}
</script>
