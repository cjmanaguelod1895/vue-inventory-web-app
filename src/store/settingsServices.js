import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        roles: []
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        }
    },
    actions: {
        async loadAllRoles({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Roles")
            let rolesData = await response.data;
            commit('SET_ROLES', rolesData);
        },

    },
    getters: {
        getRoles(state) {
            return state.roles;
        }

    }
}