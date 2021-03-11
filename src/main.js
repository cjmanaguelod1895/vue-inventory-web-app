// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import VueDocumentTitlePlugin from "vue-document-title-plugin";

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
Vue.use(CoolLightBox);


Vue.use(VueDocumentTitlePlugin, router, {
    defTitle: "WebApp",
    filter: title => `${title}`
});

import CxltToastr from "cxlt-vue2-toastr";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
Vue.use(CxltToastr);

router.beforeResolve((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach((to, from) => {
    setTimeout(() => {
        NProgress.done();
    }, 1500);
});
// your codes below



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})