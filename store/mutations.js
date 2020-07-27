import Web3 from 'web3';
import state from './index.js';

export default {
    setWeb3: (state, provider) => {
        state.web3 = new Web3(provider)
        console.log(state.web3);
    },
    publisherPageSwitchFlip: (state, page) => {
        state.publisherPageSwitch = page;
    },
    collectorPageSwitchFlip: (state, page) => {
        state.collectorPageSwitch = page;
    },
    fetchedProvider: (state, isMetaMask) => {
        state.isMetaMaskProvided = isMetaMask
    },
    syncNode: (state, _libp2p) => {
        // state.p2pNode = _libp2p;
        state.peerConnections =  _libp2p.registrar.connectionManager.connections.size;
        state.libp2pId = _libp2p.peerId.toB58String();
    },
    publishContent: (state, content) => {
        state.publishedContent.push(content);
    },
    collectContent: (state, content) => {
        console.log(content.title);
        state.collectedContent.push(content);
    },
    // updating Ethereum connection details
    initEth: (state) => {
        console.log('commiting initEth mutation...')
        state.currentChainId = ethereum.chainId
        state.eth = window.ethereum
        // state.web3 = new Web3(window.ethereum);
        // console.log(state.web3)
    
    },

    initWeb3: (state, payload) => {
        // state.contractAddress = address
        // state.contractAbi = contractJson.abi
        // console.log(state.contractAddress)
        // console.log(state.contractAbi)
        // console.log(contractJson.networks['5777'].address)
        // console.log(contract)

    },

    // updating current account details
    updateAccountDetails: (state, account) => {
        console.log('updateAccountDetails mutation is executing...')
        state.currentAccount = account
        console.log(state.currentAccount)
    },
    
    updateContract: (state,payload) => {
        state.contractAddress = payload.contractAddress
        state.contractAbi = payload.contractAbi
        console.log(state.contractAddress)
        console.log(state.contractAbi)
    },

    contractInstance: (state,payload) => {
        state.prana = () => payload
        console.log(state.prana)
    }
}