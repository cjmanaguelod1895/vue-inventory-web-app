import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        users: [],
        currentUser: {}
    },
    mutations: {
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            window.localStorage.currentUser = JSON.stringify(user);

        },
        LOGOUT_USER(state) {
            state.currentUser = {}
            window.localStorage.currentUser = JSON.stringify({});
        },
        SET_USERS(state, users) {
            state.users = users;
        },
    },
    actions: {
        async login({ commit, dispatch }, loginInfo) {
            let response = await CrudDataServices.login("Login", loginInfo)
                .then((response) => {
                    commit('SET_CURRENT_USER', response.data);
                    return response.data;
                })
                .catch((e) => {
                    let error = JSON.stringify(e);


                    var errorResponse = {
                        isLoginError: true,
                        errorMessage: ""
                    };
                    let parseErrorMessage = JSON.parse(error);
                    if (parseErrorMessage.message === "Network Error") {
                        errorResponse.errorMessage = "Unable to connect to server.";
                    } else {
                        errorResponse.errorMessage = e.response.data.message;
                    }


                    return errorResponse;
                });
            return response;
        },
        async loadCurrent({ commit, dispatch }) {
            let user = JSON.parse(window.localStorage.currentUser);
            commit('SET_CURRENT_USER', user);
        },
        logout({ commit }) {
            commit('LOGOUT_USER');
        },
        async loadAllUsers({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("UserManagement")
            let usersData = await response.data;

            commit('SET_USERS', usersData);
        },

    },
    getters: {

    }
}