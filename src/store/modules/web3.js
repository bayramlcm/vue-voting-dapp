import web3 from '@/util/web3'

export default {
    state: {
        web3: {
            isInjected: null,
            web3Instance: null,
            networkId: null,
            coinbase: null,
            balance: null,
            error: null
        },
        contractInstance: null
    },
    mutations: {
        web3Success(state, payload) {
            let result = payload
            let web3Copy = state.web3
            web3Copy.coinbase = result.coinbase
            web3Copy.networkId = result.networkId
            web3Copy.balance = parseInt(result.balance, 10)
            web3Copy.isInjected = result.injectedWeb3
            web3Copy.web3Instance = result.web3
            state.web3 = web3Copy
        },
        web3Error(state) {
            state.web3.isInjected = false;
        }
    },
    getters: {},
    actions: {
        registerWeb3({ commit }) {
            web3.then(result => {
                console.log('registerWeb3 başarılı!')
                commit('web3Success', result)
            }).catch(e => {
                console.log('registerWeb3 hata!', e)
                commit('web3Error');
            })
        }
    },
}