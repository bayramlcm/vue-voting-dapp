import router from '../../router'
export default {
    state: {
        login: false,
    },
    mutations: {
        userLoginSet: (state, payload) => {
            state.login = payload;
        }
    },
    getters: {},
    actions: {
        userLogin: ({ rootState, commit }) => new Promise((resolve, reject) => {
            rootState.contracts.registerContractInstance()
                .methods
                .isRegistered(rootState.web3.coinbase)
                .call((err, result) => {
                    if (err) return reject(false);
                    if (result === true) {
                        commit('userLoginSet', true);
                        return resolve(true);
                    }
                    return reject(false);
                })
        }),
        userRegister: ({ commit, rootState }, payload) => {
            rootState.contracts.registerContractInstance()
                .methods.register(payload.name)
                .send({ from: rootState.web3.coinbase })
                .then(() => {
                    commit('notificationSet', {
                        text:
                            "Başarıyla kayıt oldunuz, anasayfaya yönlendiriliyorsunuz..",
                        color: "success"
                    });
                    setTimeout(() => router.push({ path: '/home' }), 1500);
                })
                .catch((err) => {
                    let message = "Bir şeyler yanlış gitti";
                    switch (err.code) {
                        case 4001:
                            message = "İşlem iptal edildi";
                            break;
                        default:
                            break;
                    }
                    // Özel Mesajlar
                    if (err.reason === "ERR_IS_REGISTERED") {
                        message = "Daha önce kayıt oldunuz, lütfen giriş yapın";
                    }
                    commit('notificationSet', { text: message, color: "error" });

                })
        }
    },
}