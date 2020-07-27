import Libp2p from 'libp2p'
import Websockets from 'libp2p-websockets'
import WebRTCStar from 'libp2p-webrtc-star'
import { NOISE } from 'libp2p-noise'
import Secio from 'libp2p-secio'
import Mplex from 'libp2p-mplex'
import Boostrap from 'libp2p-bootstrap'
import Gossipsub from 'libp2p-gossipsub';
import detectEthereumProvider from '@metamask/detect-provider';
import contractJson from "../contract/build/contracts/prana.json";

import state from './index.js';

export default {
    fetchProvider: async ({commit}) => {
        detectEthereumProvider().then(res => {
            commit('fetchedProvider', res.isMetaMask)   
            if(res.isMetaMask==true) {        
            commit('setWeb3', res);
            } 
        });
    },
    // The LibP2P Node
    initLibP2P: async ({ commit }) => {
        const libp2p = await Libp2p.create({
        addresses: {
            listen: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
            ]
        },
        modules: {
            transport: [Websockets, WebRTCStar],
            connEncryption: [NOISE, Secio],
            streamMuxer: [Mplex],
            peerDiscovery: [Boostrap],
            pubsub: Gossipsub
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
        console.log(libp2p);
        await libp2p.start()
        commit('syncNode', libp2p)
        console.log(`libp2p id is ${libp2p.peerId.toB58String()}`)

        for (let i =0; i < state().pubsubSubs.length; i++) {
        await libp2p.pubsub.subscribe(state().pubsubSubs[i], (msg) => {
            if (msg.from != libp2p.peerId.toB58String()) {
            console.log(msg.data.toString())
            }
        })
        }
        
        // Listen for new peers
        libp2p.on('peer:discovery', (peerId) => {
        commit('syncNode', libp2p)
        console.log(`Found peer ${peerId.toB58String()}`)
        })

        // Listen for new connections to peers
        libp2p.connectionManager.on('peer:connect', (connection) => {
        commit('syncNode', libp2p)
        libp2p.pubsub.publish("onlineCheckIn1", Buffer.from('LibP2P Node Checking In!'))
        console.log(`Connected to ${connection.remotePeer.toB58String()}`)
        })

        // Listen for peers disconnecting
        libp2p.connectionManager.on('peer:disconnect', (connection) => {
        commit('syncNode', libp2p)           
        console.log(`Disconnected from ${connection.remotePeer.toB58String()}`)
        })
    },
    publish: ({ commit }, content) => {
        state().client
        .createBucket({ slug: content.title})
        .then((res) => {
            const stream = state().client.addItems({
            bucket: content.title,
            targetPath: '/', // path in the bucket to be saved
            sourcePaths: [content.file]
            });
        
            stream.on('data', (data) => {
            console.log('data: ', data);
            });
        
            stream.on('error', (error) => {
            console.error('error: ', error);
            });
        
            stream.on('end', () => {
            state().client
            .shareBucket({ bucket: content.title })
            .then((res) => {
                const threadInfo = res.getThreadinfo();
                console.log('key:', threadInfo.getKey());
                console.log('addresses:', threadInfo.getAddressesList());
                commit('publishContent', {
                title: content.title,
                key: threadInfo.getKey(),
                addresses: threadInfo.getAddressesList()
                })
            })
            .catch((err) => {
                console.error(err);
            });
            });
        })
        .catch((err) => {
            if(err.message == "Http response at 400 or 500 level"){
            console.log("Please connect a Space Daemon Instance");
            } else {
            console.error(err);
            }
        });
    },
    getContent: async ({}, content) => {
        console.log(content.title);
        const bucket = content.title;
        
        const dirRes = await state().client.listDirectories({
            bucket,
        });
        
        const entriesList = dirRes.getEntriesList();
        
        const openFileRes = await state().client.openFile({
            bucket,
            path: entriesList[0].getPath(),
        });
        
        const location = openFileRes.getLocation();
        console.log(location); // "/path/to/the/copied/file"
    },
    initEth: async({dispatch, commit}) => {
        if (window.ethereum) {        
            // Request account access 
            const accounts = await ethereum.enable()
            commit('updateAccountDetails', accounts[0])
            web3 = new Web3(window.ethereum)
        } else {
          // Non-dapp browsers…
          console.log(
            'Please install MetaMask'
          );
        }
    },

    accountsChange: async({commit}, accounts) => {
        console.log('accountsChange action is executing...')
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== state.currentAccount) {
            commit('updateAccountDetails', accounts[0])
        }
    },
}