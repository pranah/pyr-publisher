import Libp2p from 'libp2p'
import Websockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import { NOISE } from 'libp2p-noise'
import Secio from 'libp2p-secio'
import Mplex from 'libp2p-mplex'
import Boostrap from 'libp2p-bootstrap'
// global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import { SpaceClient } from '@fleekhq/space-client';

export const state = () => ({
  peerConnections: 0, // Place holder ticker to show that the LibP2P node is running
  client: new SpaceClient({
    url: `http://0.0.0.0:9998`
  })
})

export const mutations = {
    syncNode: (state, _libp2p) => {
        // TODO: Bug fix, when assigning the p2pNode state to the new value it crashes the app 
        // state.p2pNode = _libp2p;
        // But for some reason this doesn't crash the app
        state.peerConnections =  _libp2p.registrar.connectionManager.connections.size;
    },

}

export const actions = {
    // The LibP2P Node
    initLibP2P: async ({ dispatch }) => {
        const libp2p = await Libp2p.create({
            addresses: {
              // Add the signaling server address, along with our PeerId to our multiaddrs list
              // libp2p will automatically attempt to dial to the signaling server so that it can
              // receive inbound connections from other peers
              listen: [
                '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
              ]
            },
            modules: {
              transport: [Websockets, WebRTCStar],
              connEncryption: [NOISE, Secio],
              streamMuxer: [Mplex],
              peerDiscovery: [Boostrap]
            },
            config: {
              peerDiscovery: {
                bootstrap: {
                  enabled: true,
                  list: [
                    '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
                    '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
                    '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
                    '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
                    '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
                    '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64'
                  ]
                }
              }
            }
          })
        // Listen for new peers
        libp2p.on('peer:discovery', (peerId) => {
            dispatch('syncNode', libp2p)
            console.log(`Found peer ${peerId.toB58String()}`)
        })

        // Listen for new connections to peers
        libp2p.connectionManager.on('peer:connect', (connection) => {
            dispatch('syncNode', libp2p)
            console.log(`Connected to ${connection.remotePeer.toB58String()}`)
        })

        // Listen for peers disconnecting
        libp2p.connectionManager.on('peer:disconnect', (connection) => {
            dispatch('syncNode', libp2p)
            console.log(`Disconnected from ${connection.remotePeer.toB58String()}`)
        })

        await libp2p.start()
        dispatch('syncNode', libp2p)
        console.log(`libp2p id is ${libp2p.peerId.toB58String()}`)
  
    },
    syncNode: ({ commit }, libp2p) => {
      commit('syncNode', libp2p)
    }, 
    
}