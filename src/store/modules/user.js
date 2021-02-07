import router from '../../router'
export default {
    state: {
        login: false,
        name: "",
        roleLevel: 1,
    },
    mutations: {
        userLoginSet: (state, payload) => {
            state.login = payload;
        },
        userProfileSet: (state, payload) => {
            state.name = payload.name;
            state.roleLevel = parseInt(payload.roleLevel);
        }
    },
    getters: {},
    actions: {
        userLogin: ({ rootState, commit }) => new Promise((resolve, reject) => {
            rootState.contracts.usersContractInstance()
                .methods
                .getUser(rootState.web3.coinbase)
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('userLoginSet', true);
                    commit('userProfileSet', result);
                    return resolve(true);
                })
        }),
        userRegister: ({ commit, rootState }, payload) => {
            rootState.contracts.usersContractInstance()
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