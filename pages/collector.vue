<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex class="text-center">
      <v-card>
        <v-row>
          <v-col>
            <v-btn-toggle mandatory dense color="success">
              <v-btn dense color="success"@click="collectorPageSwitchFlip(false)">Collect</v-btn>
              <v-btn dense color="success"@click="collectorPageSwitchFlip(true)">Collection</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row>
          <Collect v-if="collectorPageSwitch == false"/>
          <Collection v-else/>
        </v-row>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'collectorPageSwitch'
    ])
  },
  methods: {
    ...mapMutations([
      'collectorPageSwitchFlip'
    ])
  }
}
</script>

<style>

</style>