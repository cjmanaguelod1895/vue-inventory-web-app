import moment from "moment";
import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        suppliers: [],
        supplierImages: [],
        editSuppliers: {}
    },
    mutations: {
        SET_SUPPLIERS(state, suppliersData) {
            state.suppliers = suppliersData[0];
            state.supplierImages = suppliersData[1];
        },
        SET_SUPPLIERS_FOR_EDIT(state, editSuppliers) {
            state.editSuppliers = editSuppliers;
        }
    },
    actions: {
        async loadAllSuppliers({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Suppliers")
            let suppliersData = await response.data;
            let supplierImageTemp = [];
            let counter = 0;

            suppliersData.forEach(element => {
                element.created_at = moment().format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }
                if (element.image != null) {
                    element.image = `https://localhost:5001/images/uploads/Supplier/${element.image}`;
                }
                element.supplierImageIndex = counter;
                counter++;
                supplierImageTemp.push(element.image);
            });
            commit('SET_SUPPLIERS', [suppliersData, supplierImageTemp]);
        },
        async addNewSupplier({ commit, dispatch }, suppliers) {
            let response = await CrudDataServices.create("Suppliers", suppliers)
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
        async getSupplier({ commit, dispatch }, supplierId) {
            let response = await CrudDataServices.get("Suppliers", supplierId)
            let ForEditSupplier = await response.data;
            commit('SET_SUPPLIERS_FOR_EDIT', ForEditSupplier);
        },
        async updateSupplier({ commit, dispatch }, [id, supplier]) {
            let response = await CrudDataServices.update("Suppliers", id, supplier)
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
        async deleteSupplier({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("Suppliers", id)
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
        getForEditSuppliers(state) {
            state.editSuppliers.supplierImage = {
                imageFile: ""
            };
            return state.editSuppliers;
        }
    }
}