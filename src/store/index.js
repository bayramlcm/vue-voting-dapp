import Vue from 'vue';
import Vuex from 'vuex';

import Web3 from './modules/web3';
import Contracts from './modules/contracts';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        web3: Web3,
        contracts: Contracts,
    },
});
