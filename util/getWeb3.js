import Web3 from 'web3';

let getWeb3 = new Promise((resolve, reject) => {

    if (window.ethereum) {
        
        // Request account access if needed
        const accounts = ethereum.enable()
        web3 = new Web3(window.ethereum);
        console.log(web3)
        resolve({
            account: accounts[0],
        })

    } else if (window.web3) {
      // Legacy dapp browsers…
      window.web3 = new Web3(web3.currentProvider);
      resolve()
    } else {
      // Non-dapp browsers…
      console.log(
        'Non-Ethereum browser detected.'
      );
      resolve()
    }

})

export default getWeb3