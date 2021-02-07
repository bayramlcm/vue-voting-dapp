import Vue from 'vue';
import Vuex from 'vuex';

import Web3 from './modules/web3';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        web3: Web3,
    },
});
