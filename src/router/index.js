import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let defaultTitle = "Inventory System - ";

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
                    next();
                } else {
                    next("/");
                }
            },
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
                    next();
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
                    }
                }

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
    ]
})