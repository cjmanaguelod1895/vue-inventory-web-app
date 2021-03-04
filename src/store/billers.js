import moment from "moment";
import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        billers: [],
        billerImages: [],
        editbillers: {}
    },
    mutations: {
        SET_BILLERS(state, billersData) {
            state.billers = billersData[0];
            state.billerImages = billersData[1];
        },
        SET_BILLER_FOR_EDIT(state, editbillers) {
            state.editbillers = editbillers;
        }
    },
    actions: {
        async loadAllBillers({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Billers")
            let billersData = await response.data;
            let billerImageTemp = [];
            let counter = 0;

            billersData.forEach(element => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }
                if (element.image !== null) {
                    element.image = `https://localhost:5001/images/uploads/Biller/${element.image}`;
                }

                element.billerImageIndex = counter;
                counter++;
                billerImageTemp.push(element.image);

            });
            commit('SET_BILLERS', [billersData, billerImageTemp]);
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
        async updateBiller({ commit, dispatch }, [id, biller]) {
            let response = await CrudDataServices.update("Billers", id, biller)
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
            state.editbillers.billerImage = {
                imageFile: ""
            };
            return state.editbillers;
        }
    }
}