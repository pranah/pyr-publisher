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
        fetchProvider: async ({state, dispatch, commit}) => {
            detectEthereumProvider().then(res => {
                commit('fetchedProvider', res.isMetaMask)   
                if(res.isMetaMask==true) { 
                    const provider = new Web3(res);
                    commit('setWeb3', provider);
                    const contract = new state.web3.eth.Contract(state.contractAbi, state.contractAddress);       
                    commit('setContract', contract);
                    dispatch('myPublished');
                } 
            });
        },
        getAccount: async ({commit}) => {
            const accounts = await ethereum.enable()
            commit('updateAccountDetails', accounts[0])
        },
        initEth: async({commit, dispatch}) => {
            if (window.ethereum) {        
                dispatch('getAccount')
            } else {
              // Non-dapp browsers…
              console.log(
                'Please install MetaMask'
              );
            }
        },
        publish: async ({state, dispatch}, toPublish) => {
            console.log("Bucket: " + toPublish.sharedBucket);
            await state.pranaContract.methods.publishBook(
                toPublish.content.file,
                toPublish.content.isbn,
                toPublish.content.price,
                toPublish.content.title,
                toPublish.content.transactionCut
            ).send({ from: state.currentAccount, gas : 6000000 })
            .on('BookPublished', (event) => {
                console.log(event)
            }).then((receipt) => {
                console.log(receipt)
                dispatch('myPublished')
            }).catch(err => console.log(err))
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
        getCollectables: async ({state, commit}) => {
            await state.pranaContract.getPastEvents('BookPublished', {
                fromBlock: 0,
                toBlock: 'latest'
            }).then(res => {
                commit('fleek/collectableContent', res, {root: true})
            }).catch(err => {console.log(err);})
        },
        purchase: async ({state}, isbn) => {
            await state.pranaContract.methods.directPurchase(isbn)
            .send({from: state.currentAccount, gas: 6000000})
            .then(receipt => {
                console.log(receipt);
            }).catch(err => {console.log(err);})
        }
    }
}