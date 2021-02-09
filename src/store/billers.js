import moment from "moment";
import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        billers: [],
        editbillers: {}
    },
    mutations: {
        SET_BILLERS(state, billers) {
            state.billers = billers;
        },
        SET_BILLER_FOR_EDIT(state, editbillers) {
            state.editbillers = editbillers;
        }
    },
    actions: {
        async loadAllBillers({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Billers")
            let billersData = await response.data;

            billersData.forEach(element => {
                element.created_at = moment().format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }

            });
            commit('SET_BILLERS', billersData);
        },
        async addNewBiller({ commit, dispatch }, biller) {
            let response = await CrudDataServices.create("Billers", biller)
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
        async getBiller({ commit, dispatch }, billerId) {
            let response = await CrudDataServices.get("Billers", billerId)
            let forEditBiller = await response.data;

            commit('SET_BILLER_FOR_EDIT', forEditBiller);
        },
        async updateBiller({ commit, dispatch }, biller) {
            let response = await CrudDataServices.update("Billers", biller.id, biller)
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
        async deleteBiller({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("Billers", id)
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
        getForEditBillers(state) {
            return state.editbillers;
        }
    }
}