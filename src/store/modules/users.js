export default {
    state: {
        userAddresses: [],
        userList: [],
    },
    mutations: {
        usersSetAddresses: (state, payload) => {
            state.userAddresses = payload;
        },
        usersAdd: (state, payload) => {
            state.userList.push({
                role: payload.roleLevel,
                name: payload.name,
                address: payload.address,
            });
        },
        usersClear: (state) => {
            state.userList = [];
        },
        usersSetRole: (state, payload) => {
            state.userList.map((user) => {
                if (user.address === payload.address) {
                    user.role = payload.role;
                }
            });
        }
    },
    getters: {},
    actions: {
        // Bilgileri toparla
        users: ({ commit, dispatch }) => new Promise((resolve, reject) => {
            commit('usersClear');
            dispatch("usersGetAddresses").then(() => {
                dispatch("usersGetList").then(() => resolve()).catch(() => {
                    commit("notificationSet", {
                        text: "Oylama listesi alınamadı (1)",
                        color: 'error',
                    })
                    reject();
                })
            }).catch((err) => {
                console.log({ err });
                commit("notificationSet", {
                    text: "Kullanıcı listesi alınamadı (0)",
                    color: 'error',
                });
                reject();
            });
        }),
        // Kullanıcı Adresleri
        usersGetAddresses: (({ commit, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .getUsers()
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('usersSetAddresses', result);
                    return resolve(result);
                })
        })),
        // Kullanıcı listesini getir
        usersGetList: (({ commit, rootState, state }) => new Promise((resolve) => {
            state.userAddresses.map(async (address) => {
                const user = await rootState.contracts.contractInstance()
                    .methods
                    .getUser(address)
                    .call()
                commit('usersAdd', { ...user, address });

            })
            resolve();
        })),
        // Yetkiyi değiştir
        usersSetRole: (({ commit, rootState }, payload) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .setUserRole(payload.address, payload.role)
                .send({ from: rootState.web3.coinbase })
                .then(() => {
                    commit('notificationSet', {
                        text: "Kullanıcı yetkisi başarıyla değiştirildi",
                        color: "success"
                    });
                    commit('usersSetRole', payload)
                    resolve();
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
                    switch (err.reason) {
                        case "ERR_ONLY_ADMIN_ROLE":
                            message = "Bu işlem için yetkiniz bulunmamaktadır"
                            break;
                        case "ERR_SET_USER_ROLE_1":
                            message = "Sistem sahibinin yetkisi değiştirilemez"
                            break;
                        case "ERR_SET_USER_ROLE_2":
                            message = "Sistemde böyle bir yetkilendirme bulunamadı"
                            break;
                        default:
                            break;
                    }
                    commit('notificationSet', { text: message, color: "error" });
                    reject();
                })
        })),
    },
}