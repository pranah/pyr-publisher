import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import contractJson from "../contract/build/contracts/prana.json";
import { getWeb3 } from "../util/getWeb3.js";

export const state = () => ({
//   eth: null,
  ethConnected: false,
  currentChainId: String,
  currentAccount: null,
  contractAddress: String,
  contractAbi: null,
  prana: null
//   web3: null

})

export const mutations = {

  // updating Ethereum connection details
  initEth: (state) => {
    console.log('commiting initEth mutation...')
    state.currentChainId = ethereum.chainId
    state.eth = window.ethereum
    state.ethConnected = true
    // state.web3 = new Web3(window.ethereum);
    // console.log(state.web3)
  
  },

  initWeb3: (state, payload) => {
    // state.contractAddress = address
    // state.contractAbi = contractJson.abi
    // console.log(state.contractAddress)
    // console.log(state.contractAbi)
    // console.log(contractJson.networks['5777'].address)
    console.log(contract)

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

export const actions = { 

  // connecting to ethereum
  initEth: async({dispatch, commit}) => {
    console.log('executing initEth action...')
    //  getWeb3.then(result => {
    //      console.log("commiting update account")
    //      commit('updateAccountDetails', result.account)
    //  })
    if (window.ethereum) {
        
        // Request account access if needed
        const accounts = await ethereum.enable()
        commit('updateAccountDetails', accounts[0])
        web3 = new Web3(window.ethereum)
        let contractAddress = contractJson.networks['5777'].address
        let contractAbi = contractJson.abi
        let prana = new web3.eth.Contract(contractAbi, contractAddress)
        // console.log(contractAddress)
        // console.log(contractAbi)
        // console.log(prana)
        // console.log(web3)

        commit('updateContract', {contractAddress, contractAbi})
        commit('contractInstance', prana)


        prana.methods.publishBook("abc", 789, 50, "def", 10)
        .send({ from: accounts[0], gas : 6000000 })
        .then((receipt) => {
            console.log(receipt)
        })
        .then(() => {
            prana.getPastEvents('BookPublished',{
                filter:{publisher:state.currentAccount},
                 fromBlock:0,
                 toBlock:'latest'
                },(err,events)=>{
                    console.log("====>events",events)
                })
        }).catch(err => console.log("bookpublish error"))
        

    } else if (window.web3) {
      // Legacy dapp browsers…
      window.web3 = new Web3(web3.currentProvider);
    } else {
      // Non-dapp browsers…
      console.log(
        'Non-Ethereum browser detected.'
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

