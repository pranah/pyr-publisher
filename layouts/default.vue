<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <Hud />
    </v-app-bar>
    <v-main>
      <v-container>
        <Login v-if="metaMaskConnected == false" />
        <nuxt v-else />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Hud from '@/components/Hud.vue'

export default {

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Publish',
          to: '/publish'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Collection',
          to: '/collection'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'NFT Book Minter',
      peerCount: 'LibP2P Peers: ' + this
    }
  },
  methods: {
      ...mapActions([
        'initLibP2P',
        'testBucket',
        'fleekUserId',
        'fetchProvider'
      ])
    },
    computed: {
      ...mapState([
        'metaMaskConnected'
      ])
    },
    fetch() {
    },
    created() {
      this.initLibP2P();
      this.fetchProvider();
      this.fleekUserId();
      this.testBucket();
    } 
}
</script>
