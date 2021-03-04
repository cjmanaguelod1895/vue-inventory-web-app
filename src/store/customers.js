import moment from "moment";
import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        customers: [],
        editCustomers: {}
    },
    mutations: {
        SET_CUSTOMERS(state, customers) {
            state.customers = customers;
        },
        SET_CUSTOMER_FOR_EDIT(state, editCustomers) {
            state.editCustomers = editCustomers;
        }
    },
    actions: {
        async loadAllCustomers({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Customers")
            let customersData = await response.data;

            customersData.forEach(element => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }

            });
            commit('SET_CUSTOMERS', customersData);
        },
        async addNewCustomer({ commit, dispatch }, customer) {
            let response = await CrudDataServices.create("Customers", customer)
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
        async getCustomer({ commit, dispatch }, customerId) {
            let response = await CrudDataServices.get("Customers", customerId)
            let forEditCustomer = await response.data;

            commit('SET_CUSTOMER_FOR_EDIT', forEditCustomer);
        },
        async updateCustomer({ commit, dispatch }, customer) {
            let response = await CrudDataServices.update("Customers", customer.id, customer)
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
        async deleteCustomer({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("Customers", id)
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
        getForEditCustomers(state) {
            return state.editCustomers;
        }
    }
}