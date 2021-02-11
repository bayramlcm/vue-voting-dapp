import Vue from 'vue';
import Vuex from 'vuex';

import Web3 from './modules/web3';
import Contracts from './modules/contracts';
import User from './modules/user';
import Users from './modules/users';
import Voting from './modules/voting';
import Votes from './modules/votes';
import Notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        web3: Web3,
        contracts: Contracts,
        user: User,
        users: Users,
        voting: Voting,
        votes: Votes,
        notification: Notification,
    },
});
