import { registerContract } from '@/util/contracts'

export default {
    state: {
        registerContractInstance: null,
    },
    mutations: {
        contractRegisterSuccess(state, payload) {
            state.registerContractInstance = () => payload;
        },
    },
    getters: {},
    actions: {
        contractRegister({ commit, rootState }) {
            if (!rootState.web3.isInjected) {
                commit('notificationSet', {
                    color: 'error',
                    text: "Metamask ile bağlantı kurulamadı",
                });
            } else {
                registerContract(rootState.web3.web3Instance).then(result => {
                    console.log('Register akıllı sözleşmesi başarılı!')
                    commit('contractRegisterSuccess', result)
                }).catch(e => {
                    console.log('Register akıllı sözleşmesi hata!', e)
                })
            }
        }
    },
}