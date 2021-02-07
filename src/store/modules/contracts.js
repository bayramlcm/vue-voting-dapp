import { usersContract } from '@/util/contracts'

export default {
    state: {
        usersContractInstance: null,
    },
    mutations: {
        contractUsersSuccess(state, payload) {
            state.usersContractInstance = () => payload;
        },
    },
    getters: {},
    actions: {
        contractUsers({ commit, rootState }) {
            if (!rootState.web3.isInjected) {
                commit('notificationSet', {
                    color: 'error',
                    text: "Metamask ile bağlantı kurulamadı (Contract)",
                });
            } else {
                usersContract(rootState.web3.web3Instance).then(result => {
                    console.log('Users akıllı sözleşmesi başarılı!')
                    commit('contractUsersSuccess', result)
                }).catch(e => {
                    console.log('Users akıllı sözleşmesi hata!', e)
                })
            }
        }
    },
}