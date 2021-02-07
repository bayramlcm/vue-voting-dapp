import web3 from '@/util/web3'

export default {
    state: {
        isInjected: null,
        web3Instance: null,
        networkId: null,
        coinbase: null,
        balance: null,
        error: null
    },
    mutations: {
        web3Success(state, payload) {
            state.coinbase = payload.coinbase;
            state.networkId = payload.networkId;
            state.balance = parseInt(payload.balance, 10);
            state.isInjected = payload.injectedWeb3;
            state.web3Instance = payload.web3;
        },
        web3Error(state) {
            state.isInjected = false;
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