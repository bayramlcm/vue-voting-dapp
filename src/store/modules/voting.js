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
        }
    },
    getters: {},
    actions: {
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
        votingCreate: (({ commit, rootState }, payload) => new Promise(() => {
            rootState.contracts.contractInstance()
                .methods
                .createVote(payload.subject, payload.detail, payload.startDate, payload.endDate)
                .send({ from: rootState.web3.coinbase })
                .then(() => {
                    commit('notificationSet', {
                        text: "Oylama başarıyla oluşturuldu",
                        color: "success"
                    });
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
                        default:
                            break;
                    }
                    commit('notificationSet', { text: message, color: "error" });
                })
        })),
        votingGetList: (({ commit, rootState, state }) => new Promise(async () => {
            for (let i = 1; i <= state.votingCount; i++) {
                const vote = await rootState.contracts.contractInstance()
                    .methods
                    .getVote(i)
                    .call()
                commit('votingAdd', vote);
            }
        })),

    },
}