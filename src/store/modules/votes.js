export default {
    state: {
        votesCount: 0,
        votesList: [],
        votesUsed: {},
    },
    mutations: {
        votesSetCount: (state, payload) => {
            state.votesCount = parseInt(payload);
        },
        votesSetUsed: (state, payload) => {
            state.votesUsed = payload;
        },
        votesAddUsed: (state, payload) => {
            state.votesList = state.votesList.map((vote) => {
                if (vote.id === payload.id) vote.used = true;
                return vote;
            })
            state.votesUsed = {
                ...state,
                [payload.id]: payload.vote,
            }
        },
        votesAdd: (state, payload) => {
            state.votesList.push(payload);
        },
        votesClear: (state) => {
            state.votesList = [];
            state.votesUsed = {};
        },
    },
    getters: {},
    actions: {
        // Bilgileri toparla
        votes: ({ commit, dispatch }) => new Promise((resolve, reject) => {
            commit('votesClear');
            dispatch("votesGetCount").then(() => {
                dispatch('votesGetUsed').then(() => {
                    dispatch("votesGetList").then(() => resolve()).catch(() => {
                        commit("notificationSet", {
                            text: "Oylama listesi alınamadı (1)",
                            color: 'error',
                        })
                        reject();
                    }).catch(() => {
                        commit("notificationSet", {
                            text: "Oylama listesi alınamadı (2)",
                            color: 'error',
                        });
                        reject();
                    });
                }).catch(() => {
                    commit("notificationSet", {
                        text: "Oylama listesi alınamadı (1)",
                        color: 'error',
                    });
                    reject();
                });
            }).catch(() => {
                commit("notificationSet", {
                    text: "Oylama listesi alınamadı (0)",
                    color: 'error',
                });
                reject();
            });
        }),
        // Kullanılan oyları getir
        votesGetUsed: (({ commit, dispatch, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .usedVoteList(rootState.web3.coinbase)
                .call(async (err, result) => {
                    if (err) return reject();
                    let used = {};
                    for (let i = 0; i < result.length; i++) {
                        const vote = await dispatch('votesGetUsedVote', result[i]);
                        used[result[i]] = vote;
                    }
                    commit('votesSetUsed', used);
                    return resolve(result);
                })
        })),
        // Oy kullan
        votesUse: (({ commit, rootState }, payload) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .useVote(payload.id, payload.vote)
                .send({ from: rootState.web3.coinbase })
                .then(async () => {
                    commit('votesAddUsed', { id: payload.id, vote: payload.vote });
                    commit('notificationSet', {
                        text: "Oy başarıyla kullanıldı",
                        color: "success"
                    });
                    resolve();
                })
                .catch((err) => {
                    console.log({ err });
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
                        case "ERR_CREATE_VOTE":
                            message = "Bitiş tarihi bugünden büyük olmalıdır"
                            break;
                        default:
                            break;
                    }
                    commit('notificationSet', { text: message, color: "error" });
                    reject();
                })
        })),
        // Kullanılan oy ne?
        votesGetUsedVote: ({ rootState }, payload) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .usedVote(payload)
                .call(async (err, result) => {
                    if (err) return reject(false);
                    return resolve(result);
                })
        }),
        // Toplam Oylama
        votesGetCount: (({ commit, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .voteCount()
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('votesSetCount', result);
                    return resolve(result);
                })
        })),
        // Oylama listesini getir
        votesGetList: (({ commit, rootState, state }) => new Promise(async (resolve) => {
            for (let i = 1; i <= state.votesCount; i++) {
                const vote = await rootState.contracts.contractInstance()
                    .methods
                    .getVote(i)
                    .call()
                let used = vote.id in state.votesUsed;
                commit('votesAdd', { ...vote, used });
            }
            resolve();
        })),
    },
}