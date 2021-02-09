import Vue from "vue";
import Vuex from "vuex";
import usersModule from './users';
import customersModule from './customers';
import billersModule from './billers';
import settingsModule from './settingsServices';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users: usersModule,
        customers: customersModule,
        billers: billersModule,
        settingsService: settingsModule
    },
});