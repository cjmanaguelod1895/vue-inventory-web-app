import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        roles: [],
        groups: [],
        brands: [],
        brandImages: [],
        editBrands: {},
        unitOfMeasures: [],
        editUnitOfMeasures: {}
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        },
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        //Brands
        SET_BRANDS(state, brandsData) {
            state.brands = brandsData[0];
            state.brandImages = brandsData[1];
        },
        SET_BRAND_FOR_EDIT(state, editBrands) {
            state.editBrands = editBrands;
        },
        //Unit of Measures
        SET_UNIT_OF_MEASURES(state, unitOfMeasures) {
            state.unitOfMeasures = unitOfMeasures;
        },
        SET_UNIT_OF_MEASURES_FOR_EDIT(state, editUnitOfMeasures) {
            state.editUnitOfMeasures = editUnitOfMeasures;
        }

    },
    actions: {
        //Brands
        async loadAllBrands({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Brands")
            let brandsData = await response.data;
            let brandImageTemp = [];
            let counter = 0;

            brandsData.forEach(element => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }
                if (element.image !== null) {
                    element.image = `https://localhost:5001/images/uploads/Brand/${element.image}`;
                }

                element.brandImageIndex = counter;
                counter++;
                brandImageTemp.push(element.image);
            });

            commit('SET_BRANDS', [brandsData, brandImageTemp]);
        },
        async getBrands({ commit, dispatch }, brandId) {
            let response = await CrudDataServices.get("Brands", brandId)
            let forEditBrand = await response.data;
            commit('SET_BRAND_FOR_EDIT', forEditBrand);
        },
        async addNewBrand({ commit, dispatch }, brand) {
            let response = await CrudDataServices.create("Brands", brand)
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
        async updateBrand({ commit, dispatch }, [id, brand]) {
            let response = await CrudDataServices.update("Brands", id, brand)
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
        async deleteBrand({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("Brands", id)
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
        //Unit of Measures
        async loadAllUnitOfMeasures({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("UnitOfMeasures")
            let unitOfMeasuresData = await response.data;
            let brandImageTemp = [];
            let counter = 0;

            unitOfMeasuresData.forEach((element) => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }
            });

            commit('SET_UNIT_OF_MEASURES', unitOfMeasuresData);
        },
        async addNewUnitOfMeasures({ commit, dispatch }, unitOfMeasures) {
            let response = await CrudDataServices.create("UnitOfMeasures", unitOfMeasures)
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
        async getUnitOfMeasures({ commit, dispatch }, unitOfMeasuredId) {
            let response = await CrudDataServices.get("UnitOfMeasures", unitOfMeasuredId)
            let forEditUnitOfMeasures = await response.data;
            commit('SET_UNIT_OF_MEASURES_FOR_EDIT', forEditUnitOfMeasures);
        },
        async updateUnitOfMeasures({ commit, dispatch }, [id, unitOfMeasures]) {
            let response = await CrudDataServices.update("UnitOfMeasures", id, unitOfMeasures)
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
        async deleteUnitOfMeasures({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("UnitOfMeasures", id)
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
        //Roles
        async loadAllRoles({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Roles")
            let rolesData = await response.data;
            commit('SET_ROLES', rolesData);
        },
        //Groups
        async loadGroupNames({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("CustomerGroups")
            let groupsData = await response.data;
            commit('SET_GROUPS', groupsData);
        },

    },
    getters: {
        //Brands
        getBrands(state) {
            return state.brands;
        },
        getforEditBrands(state) {
            state.editBrands.brandImage = {
                imageFile: ""
            };
            return state.editBrands;
        },
        //Roles
        getRoles(state) {
            return state.roles;
        },
        //Groups
        getGroups(state) {
            return state.groups;
        },
        //Unit of Measures
        getUnitOfMeasures(state) {
            return state.unitOfMeasures;
        },
        getForEditUnitOfMeasures(state) {
            return state.editUnitOfMeasures;
        },

    }
}