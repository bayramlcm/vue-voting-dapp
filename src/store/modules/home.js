export default {
    state: {
        totalVote: 0,
        usedVote: 0,
        unusedVote: 0,
        totalUser: 0,
        admin: 0,
        user: 0,
    },
    mutations: {
        homeSetAdminAndUserCount: (state, payload) => {
            state.admin = parseInt(payload[0]);
            state.user = parseInt(payload[1]);
            state.totalUser = parseInt(payload[0]) + parseInt(payload[1]);
        },
        homeUsedVoteCount: (state, payload) => {
            state.usedVote = payload;
        },
        homeUnusedVoteCount: (state, payload) => {
            state.unusedVote = payload;
        },
        homeTotalVoteCount: (state, payload) => {
            state.totalVote = payload;
        }
    },
    getters: {},
    actions: {
        // Bilgileri toparla
        home: (({ commit, dispatch }) => new Promise((resolve, reject) => {
            dispatch('homeAdminAndUserCount').then(() => {
                dispatch('homeUnusedVoteCount').then((unused) => {
                    dispatch('homeUsedVoteCount').then((used) => {
                        commit("homeTotalVoteCount", parseInt(unused) + parseInt(used));
                        resolve();
                    }).catch((err) => reject(err));
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        })),
        // Toplam admin ve user sayısı
        homeAdminAndUserCount: (({ commit, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .getAdminAndUserCount()
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('homeSetAdminAndUserCount', result);
                    return resolve(result);
                })
        })),
        // Kullanılmayan oylama sayısı
        homeUnusedVoteCount: (({ commit, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .userUnusedVoteCount(rootState.web3.coinbase)
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('homeUnusedVoteCount', result);
                    return resolve(result);
                })
        })),
        // Kullanılan oylama sayısı
        homeUsedVoteCount: (({ commit, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .userUsedVoteCount(rootState.web3.coinbase)
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('homeUsedVoteCount', result);
                    return resolve(result);
                })
        })),
    },
}