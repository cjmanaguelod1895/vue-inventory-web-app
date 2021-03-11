import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index';
import '../../node_modules/nprogress/nprogress.css';

Vue.use(Router)

let defaultTitle = "IMS - ";


export default new Router({
    mode: 'history',
    routes: [

        {
            path: "/",
            name: "login",
            component: () =>
                import ( /* webpackChunkName: "login" */ "./../views/Login"),
            meta: {
                title: `${defaultTitle} Login`
            }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () =>
                import ("../containers/dashboard/MainPage"),
            meta: {
                title: `${defaultTitle} Dashboard`
            },
            beforeEnter(to, from, next) {
                let currentUser = JSON.parse(window.localStorage.currentUser);
                if (currentUser.role === "Admin" || currentUser.role === "Cashier") {
                    setTimeout(() => {
                        next();
                    }, 1000);
                } else {
                    next("/");
                }
            },
            children: [{
                path: "userProfileIndex",
                name: "userProfileIndex",
                component: () =>
                    import ("./../views/usermanagement/UserProfileIndex"),
                meta: {
                    title: `${defaultTitle} User Profile`
                },
                beforeEnter(to, from, next) {
                    let currentUser = JSON.parse(window.localStorage.currentUser);
                    store.dispatch("users/getUser", currentUser.userId);
                    setTimeout(() => {
                        next();
                    }, 1000);
                }

            }]

        },
        //See Admin routes
        {
            path: "/admin",
            name: "admin",
            component: () =>
                import ("../containers/dashboard/MainPage"),
            meta: {
                title: `${defaultTitle} Users Management`
            },
            beforeEnter(to, from, next) {
                let currentUser = JSON.parse(window.localStorage.currentUser);
                if (currentUser.role === "Admin") {
                    setTimeout(() => {
                        next();
                    }, 1000);
                } else {
                    next("/");
                }
            },
            children: [{
                    path: "userManagementIndex",
                    name: "userManagementIndex",
                    component: () =>
                        import ("@/views/usermanagement/UserManagementIndex"),
                    meta: {
                        title: `${defaultTitle} Users Management`
                    },
                    beforeEnter(to, from, next) {
                        store.dispatch("users/loadCurrent");
                        store.dispatch("users/loadAllUsers");
                        store.dispatch("customers/loadAllCustomers");
                        store.dispatch("billers/loadAllBillers");
                        store.dispatch("suppliers/loadAllSuppliers");

                        store.dispatch("settingsService/loadGroupNames");
                        store.dispatch("settingsService/loadAllRoles");
                        store.dispatch("settingsService/loadGroupNames");
                        setTimeout(() => {
                            next();
                        }, 1000);
                    }
                },
                {
                    path: "settingsIndex",
                    name: "settingsIndex",
                    component: () =>
                        import ("@/views/settings/SettingsIndex"),
                    meta: {
                        title: `${defaultTitle} Settings`
                    }
                },



            ]
        },
        //See Cashier Routes
        {
            path: "/cashier",
            name: "cashier",
            component: () =>
                import ("../containers/dashboard/MainPage"),
            meta: {
                title: `${defaultTitle} Cashier`
            },
            beforeEnter(to, from, next) {
                let currentUser = JSON.parse(window.localStorage.currentUser);
                if (currentUser.role === "Cashier") {
                    next();
                } else {
                    next("/");
                }
            },
            children: [{
                path: "cashierManagementIndex",
                name: "cashierManagementIndex",
                component: () =>
                    import ("./../views/cashiermanagement/CashierMangementIndex"),
                meta: {
                    title: `${defaultTitle} Cashier Management`
                }
            }]
        },
        {
            path: "/404NotFound",
            name: "notFound",
            component: () =>
                import ( /* webpackChunkName: "login" */ "./../views/404NotFound"),
        },
        {
            path: "*",
            redirect: '/404NotFound'
        },
    ],


})