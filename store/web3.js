import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import contractJson from "../contract/build/contracts/prana.json";

export const state = () => ({
//   eth: null,
  ethConnected: false,
  currentChainId: String,
  currentAccount: null,
  contractAddress: String,
  contractAbi: null,
  web3: null

})

export const mutations = {

  // updating Ethereum connection details
  initEth: (state) => {
    console.log('commiting initEth mutation...')
    state.currentChainId = ethereum.chainId
    state.eth = window.ethereum
    state.ethConnected = true
    // state.web3 = new Web3(window.ethereum);
    console.log(state.web3)



    
  },

  initWeb3: (state) => {
    // state.contractAddress = contractJson.networks['5777'].address
    // state.contractAbi = contractJson.abi
    // console.log(state.contractAddress)
    // console.log(state.contractAbi)
    console.log(contractJson.networks['5777'].address)

  },

  // updating current account details
  updateAccountDetails: (state, account) => {
    console.log('updateAccountDetails mutation is executing...')
    state.currentAccount = account
    console.log(state.currentAccount)
  }

}

export const actions = { 

  // connecting to ethereum
  initEth: async({dispatch, commit}) => {
    console.log('executing initEth action...')
     
    // const provider = await detectEthereumProvider();
    if (window.ethereum) {
      account: null
        
          // Request account access if needed
          const accounts = await ethereum.enable()
          commit('updateAccountDetails', accounts[0])
          web3 = new Web3(window.ethereum);
        console.log(web3)
        web3.eth
          commit('initEth')
          // commit('initWeb3')

      } else if (window.web3) {
        // Legacy dapp browsers…
        window.web3 = new Web3(web3.currentProvider);
      } else {
        // Non-dapp browsers…
        console.log(
          'Non-Ethereum browser detected.'
        );
      }
    //   console.log(web3);


    // const provider = await detectEthereumProvider();
    // if (provider) {
    //     console.log(provider)
    // } else {
    //   console.log('Please install MetaMask!');
    // }
    // commit('initEth');

    // ethereum.request({ method: 'eth_accounts' })
    // .then((accounts)=> dispatch('web3/accountsChange', accounts, { root: true }))
    // .catch((err) => {
    //   console.error(err);
    // });
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

