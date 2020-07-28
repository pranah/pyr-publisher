import Web3 from 'web3';
import contractJson from "../contract/build/contracts/prana.json";
import detectEthereumProvider from '@metamask/detect-provider';
import Vue from 'vue'

export default {
    state: () => ({
        isMetaMaskProvided: Boolean,
        currentAccount: null,
        web3: null,
        pranaContract: null,
        contractAddress: contractJson.networks['5777'].address,
        contractAbi: contractJson.abi,
    }),
    mutations: {
        setWeb3: (state, provider) => {
            state.web3 = provider;
            console.log(state.web3);
        },
        setContract: (state, contract) => {
            Vue.set(state, 'pranaContract', contract);
            console.log(state.pranaContract);
        },
        fetchedProvider: (state, isMetaMask) => {
            state.isMetaMaskProvided = isMetaMask
        },
        updateAccountDetails: (state, account) => {
            console.log('updateAccountDetails mutation is executing...')
            state.currentAccount = account
            console.log(state.currentAccount)
        },
    },
    actions: {
        fetchProvider: async ({state, commit, dispatch}) => {
            detectEthereumProvider().then(res => {
                commit('fetchedProvider', res.isMetaMask)   
                if(res.isMetaMask==true) { 
                    const provider = new Web3(res);
                    commit('setWeb3', provider);
                    const contract = new state.web3.eth.Contract(state.contractAbi, state.contractAddress);       
                    commit('setContract', contract);
                    dispatch('collectableBooks');
                } 
            });
        },
        initEth: async({commit}) => {
            if (window.ethereum) {        
                // Request account access 
                const accounts = await ethereum.enable()
                commit('updateAccountDetails', accounts[0])
                
            } else {
              // Non-dapp browsers…
              console.log(
                'Please install MetaMask'
              );


            }
        },
        publish: async ({state}, content) => {
            await state.pranaContract.methods.publishBook(
                content.file,
                content.isbn,
                content.price,
                content.title,
                content.transactionCut
            ).send({ from: state.currentAccount, gas : 6000000 })
            .on('BookPublished', (event) => {
                console.log(event)
            })
            .then((receipt) => {
                console.log(receipt)
            })
            .then(() => {
                state.pranaContract.getPastEvents('BookPublished',{
                filter:{publisher:state.currentAccount},
                fromBlock:0,
                toBlock:'latest'
                },(err,events)=>{
                    console.log("====>events",events)
                })
            })
            .catch(err => console.log('Publishing Error'))
        },
        myPublished: async ({state, commit}) => {
            await state.pranaContract.getPastEvents('BookPublished',{
                filter:{publisher:state.currentAccount},
                fromBlock:0,
                toBlock:'latest'
                },(err,events)=>{
                    console.log("====>events",events)
                    commit('fleek/publishedContent', events, { root: true })
                })
        },
        collectableBooks: async ({state, commit}) => {
            await state.pranaContract.getPastEvents('BookPublished',{
                fromBlock:0,
                toBlock:'latest'
                },(err,events)=>{
                    console.log("====>events",events)
                    commit('fleek/collectableContent', events, { root: true })
                })
        },
        
    }
}