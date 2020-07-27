import { SpaceClient } from '@fleekhq/space-client';

export default {    
    metaMaskConnected: false,
    peerConnections: 0, // Place holder ticker to show that the LibP2P node is running
    libp2pId: String,
    isMetaMask: Boolean,
    collectorPageSwitch: false,
    publisherPageSwitch: false,
    p2pNode: null,
    p2pPubSub: null,
    client: new SpaceClient({
        url: `http://localhost:9998`
    }),
    publishedContent: [],
    collectedContent: [],
    pubsubSubs: [],
    web3: {},
    
    ethConnected: false,
    currentChainId: String,
    currentAccount: null,
    contractAddress: String,
    contractAbi: null,
    prana: null
      
}