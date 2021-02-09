import Api from "@/services/CrudDataServices";
import Vue from 'vue';
import CrudDataServices from "../services/CrudDataServices";

export default {
    namespaced: true,
    state: {
        roles: [],
        groups: []
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        },
        SET_GROUPS(state, groups) {
            state.groups = groups;
        }

    },
    actions: {
        async loadAllRoles({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("Roles")
            let rolesData = await response.data;
            commit('SET_ROLES', rolesData);
        },
        async loadGroupNames({ commit, dispatch }) {
            let response = await CrudDataServices.getAll("CustomerGroups")
            let groupsData = await response.data;
            commit('SET_GROUPS', groupsData);
        },

    },
    getters: {
        getRoles(state) {
            return state.roles;
        },
        getGroups(state) {
            return state.groups;
        },

    }
}