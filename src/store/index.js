import Vue from "vue";
import Vuex from "vuex";
import usersModule from './users';
import settingsModule from './settingsServices';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users: usersModule,
        settingsService: settingsModule
    },
});