export default {
    state: {
        votingCount: 0,
        votingList: [],
    },
    mutations: {
        votingSetCount: (state, payload) => {
            state.votingCount = parseInt(payload);
        },
        votingAdd: (state, payload) => {
            state.votingList.push(payload);
        },
        votingClear: (state) => {
            state.votingList = [];
        },
        votingSetStatus: (state, payload) => {
            state.votingList.map((voting) => {
                if (voting.id === payload.id) {
                    voting.status = payload.status;
                }
            });
        }
    },
    getters: {},
    actions: {
        // Bilgileri toparla
        voting: ({ commit, dispatch }) => new Promise((resolve, reject) => {
            commit('votingClear');
            dispatch("votingGetCount").then(() => {
                dispatch("votingGetList").then(() => resolve()).catch(() => {
                    commit("notificationSet", {
                        text: "Oylama listesi alınamadı (1)",
                        color: 'error',
                    })
                    reject();
                })
            }).catch(() => {
                commit("notificationSet", {
                    text: "Oylama listesi alınamadı (0)",
                    color: 'error',
                });
                reject();
            });
        }),
        // Toplam Oylama
        votingGetCount: (({ commit, rootState }) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .voteCount()
                .call((err, result) => {
                    if (err) return reject(false);
                    commit('votingSetCount', result);
                    return resolve(result);
                })
        })),
        // Oylama oluştur
        votingCreate: (({ commit, state, rootState }, payload) => new Promise((resolve, reject) => {
            rootState.contracts.contractInstance()
                .methods
                .createVote(payload.subject, payload.detail, payload.endDate)
                .send({ from: rootState.web3.coinbase })
                .then(async () => {
                    commit('notificationSet', {
                        text: "Oylama başarıyla oluşturuldu",
                        color: "success"
                    });
                    const vote = await rootState.contracts.contractInstance()
                        .methods
                        .getVote(state.votingCount + 1)
                        .call()
                    commit('votingAdd', vote);
                    commit('votingSetCount', state.votingCount + 1);
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
        // Oylama listesini getir
        votingGetList: (({ commit, rootState, state }) => new Promise(async (resolve) => {
            for (let i = 1; i <= state.votingCount; i++) {
                const vote = await rootState.contracts.contractInstance()
                    .methods
                    .getVote(i)
                    .call()
                // Bitiş tarihi kontrolü
                if (+new Date() / 1000 > vote.endDate) vote.status = '0';
                commit('votingAdd', vote);
            }
            resolve();
        })),
        // Oylama durumunu değiştir
        votingSetStatus: (({ commit, rootState }, payload) => new Promise((resolve, reject) => {
            console.log(payload.id, payload.status);
            rootState.contracts.contractInstance()
                .methods
                .setVoteStatus(payload.id, payload.status)
                .send({ from: rootState.web3.coinbase })
                .then(() => {
                    commit('notificationSet', {
                        text: "Oylama durumu başarıyla değiştirildi",
                        color: "success"
                    });
                    commit('votingSetStatus', payload)
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
                        case "ERR_SET_VOTE_STATUS_1":
                            message = "Farklı bir durum seçilemez"
                            break;
                        case "ERR_SET_VOTE_STATUS_2":
                            message = "Böyle bir oylama bulunamadı"
                            break;
                        case "ERR_SET_VOTE_STATUS_3":
                            message = "Kapalı olan oylamanın durumu değiştirilemez"
                            break;
                        case "ERR_SET_VOTE_STATUS_4":
                            message = "Bitiş tarihi geçen oylamanın durumu değiştirilemz"
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