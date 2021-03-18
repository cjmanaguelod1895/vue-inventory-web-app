import Vue from 'vue';

export const helpers = new Vue({
    methods: {
        updateIsActiveStatus(param) {

            let ret = 0;

            if (param === false || param === "false") {
                ret = 0;
            } else {
                ret = 1;
            }
            return ret;
        }
    }
})