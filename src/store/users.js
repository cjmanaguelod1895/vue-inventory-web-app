import moment from "moment";
import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        users: [],
        editUser: {},
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
        SET_USERS_FOR_EDIT(state, editUser) {
            state.editUser = editUser;
        }
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

            usersData.forEach(element => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }

            });
            commit('SET_USERS', usersData);
        },
        async addNewUser({ commit, dispatch }, user) {
            let response = await CrudDataServices.create("UserManagement", user)
                .then((response) => {
                    return response.data;
                })
                .catch((e) => {
                    let error = JSON.stringify(e);
                    var errorResponse = {
                        isError: true,
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
        async getUser({ commit, dispatch }, userId) {
            let response = await CrudDataServices.get("UserManagement", userId)
            let forEditUserData = await response.data;

            commit('SET_USERS_FOR_EDIT', forEditUserData);
        },
        async updateUser({ commit, dispatch }, user) {
            let response = await CrudDataServices.update("UserManagement", user.id, user)
                .then((response) => {
                    return response.data;
                })
                .catch((e) => {
                    let error = JSON.stringify(e);
                    var errorResponse = {
                        isError: true,
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
        async updateCurrentUser({ commit, dispatch }, currentUser) {
            console.log(currentUser);
            commit('SET_CURRENT_USER', currentUser);
        },
        async deleteUser({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("UserManagement", id)
                .then((response) => {
                    return response.data;
                })
                .catch((e) => {
                    let error = JSON.stringify(e);
                    var errorResponse = {
                        isError: true,
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
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser;
        },
        getForEditUser(state) {

            return state.editUser;
        }
    }
}