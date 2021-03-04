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
        editUnitOfMeasures: {},
        currencies: [],
        editcurrency: {},
        taxes: [],
        editTax: {}
    },
    mutations: {
        //#region Roles
        SET_ROLES(state, roles) {
            state.roles = roles;
        },
        //#endregion

        //#region  Groups
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        //#endregion

        //#region Brands
        SET_BRANDS(state, brandsData) {
            state.brands = brandsData[0];
            state.brandImages = brandsData[1];
        },
        SET_BRAND_FOR_EDIT(state, editBrands) {
            state.editBrands = editBrands;
        },
        //#endregion

        //#region Unit of Measures
        SET_UNIT_OF_MEASURES(state, unitOfMeasures) {
            state.unitOfMeasures = unitOfMeasures;
        },
        SET_UNIT_OF_MEASURES_FOR_EDIT(state, editUnitOfMeasures) {
            state.editUnitOfMeasures = editUnitOfMeasures;
        },
        //#endregion

        //#region Currencies
        SET_CURRENCIES(state, currencies) {
            state.currencies = currencies;
        },
        SET_CURRENCY_FOR_EDIT(state, editcurrency) {
            state.editcurrency = editcurrency;
        },
        //#endregion

        //#region Taxes
        SET_TAXES(state, taxes) {
            state.taxes = taxes;
        },
        SET_TAX_FOR_EDIT(state, editTax) {
            state.editTax = editTax;
        },
        //#endregion

    },
    actions: {
        //#region Brands
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
        //#endregion

        //#region Unit of Measures
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
        //#endregion

        //#region Currencies
        async loadAllCurrencies({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Currencies")
            let currenciesData = await response.data;

            currenciesData.forEach((element) => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }
            });

            commit('SET_CURRENCIES', currenciesData);
        },
        async addNewCurrency({ commit, dispatch }, currency) {
            let response = await CrudDataServices.create("Currencies", currency)
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
        async getCurrency({ commit, dispatch }, currencyId) {
            let response = await CrudDataServices.get("Currencies", currencyId)
            let forEditUnitOfMeasures = await response.data;
            commit('SET_CURRENCY_FOR_EDIT', forEditUnitOfMeasures);
        },
        async updateCurrency({ commit, dispatch }, [id, currency]) {
            let response = await CrudDataServices.update("Currencies", id, currency)
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
        async deleteCurrency({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("Currencies", id)
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
        //#endregion

        //#region Roles
        async loadAllRoles({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Roles")
            let rolesData = await response.data;
            commit('SET_ROLES', rolesData);
        },
        //#endregion

        //#region Groups
        async loadGroupNames({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("CustomerGroups")
            let groupsData = await response.data;
            commit('SET_GROUPS', groupsData);
        },
        //#endregion

        //#region Tax
        async loadAllTaxes({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Taxes")
            let taxesData = await response.data;

            taxesData.forEach((element) => {
                element.created_at = moment(element.created_at).format("LL");
                if (element.is_active === 1) {
                    element.is_active = "Active";
                } else {
                    element.is_active = "Deactivated";
                }
            });

            commit('SET_TAXES', taxesData);
        },
        async addNewTax({ commit, dispatch }, tax) {
            let response = await CrudDataServices.create("Taxes", tax)
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
        async getTax({ commit, dispatch }, taxId) {
            let response = await CrudDataServices.get("Taxes", taxId)
            let forEditTax = await response.data;
            commit('SET_TAX_FOR_EDIT', forEditTax);
        },
        async updateTax({ commit, dispatch }, [id, tax]) {
            let response = await CrudDataServices.update("Taxes", id, tax)
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
        async deleteTax({ commit, dispatch }, id) {
            let response = await CrudDataServices.deleteById("Taxes", id)
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
        //#endregion
    },
    getters: {
        //#region  Brand
        getBrands(state) {
            return state.brands;
        },
        getforEditBrands(state) {
            state.editBrands.brandImage = {
                imageFile: ""
            };
            return state.editBrands;
        },
        //#endregion

        //#region Roles
        getRoles(state) {
            return state.roles;
        },
        //#endregion

        //#region Groups
        getGroups(state) {
            return state.groups;
        },
        //#endregion

        //#region Unit of Measures
        getUnitOfMeasures(state) {
            return state.unitOfMeasures;
        },
        getForEditUnitOfMeasures(state) {
            return state.editUnitOfMeasures;
        },
        //#endregion

        //#region Currencies
        getCurrencies(state) {
            return state.currencies;
        },
        getForEditCurrency(state) {
            return state.editcurrency;
        },
        //#endregion

        //#region Tax
        getTaxes(state) {
            return state.taxes;
        },
        getForEditTax(state) {
            return state.editTax;
        },
        //#endregion

    }
}