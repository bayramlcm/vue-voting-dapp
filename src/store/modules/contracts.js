import { registerContract } from '@/util/contracts'

export default {
    state: {
        registerContractInstance: null,
    },
    mutations: {
        contractRegisterSuccess(payload) {
            console.log('Register contract instance: ', payload)
            // state.registerContractInstance = () => payload
        },
    },
    getters: {},
    actions: {
        contractRegister({ commit, rootState }) {
            registerContract(rootState.web3.web3Instance).then(result => {
                console.log('Register akıllı sözleşmesi başarılı!')
                commit('contractRegisterSuccess', result)
            }).catch(e => {
                console.log('Register akıllı sözleşmesi hata!', e)
            })
        }
    },
}