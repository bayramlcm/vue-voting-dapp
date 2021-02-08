import { votingAppContract } from '@/util/contracts'

export default {
    state: {
        contractInstance: null,
    },
    mutations: {
        contractSuccess(state, payload) {
            state.contractInstance = () => payload;
        },
    },
    getters: {},
    actions: {
        contract({ commit, rootState }) {
            if (!rootState.web3.isInjected) {
                commit('notificationSet', {
                    color: 'error',
                    text: "Metamask ile bağlantı kurulamadı (Contract)",
                });
            } else {
                votingAppContract(rootState.web3.web3Instance).then(result => {
                    console.log('Users akıllı sözleşmesi başarılı!')
                    commit('contractSuccess', result)
                }).catch(e => {
                    console.log('Users akıllı sözleşmesi hata!', e)
                })
            }
        },
    },
}