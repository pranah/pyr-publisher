import { SpaceClient } from '@fleekhq/space-client';

export default {    
    peerConnections: 0, // Place holder ticker to show that the LibP2P node is running
    libp2pId: String,
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
    
    isMetaMaskProvided: Boolean,
    currentChainId: String,
    currentAccount: null,
    contractAddress: String,
    contractAbi: null,
    prana: null
      
}