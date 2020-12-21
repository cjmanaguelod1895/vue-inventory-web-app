import Vue from 'vue';

export const toaster = new Vue({
    methods: {
        setToasterProperties(notifParams) {
            let toasterProperties = {
                title: notifParams.title,
                message: notifParams.message,
                "closeButton": true,
                "debug": true,
                "newestOnTop": true,
                "progressBar": false,
                "position": "top right",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "2000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeInDown",
                "hideMethod": "fadeOutRightBig"
            };
            return toasterProperties;
        },
        toasterType(notifParams) {
            switch (notifParams.type) {
                case "success":
                    this.$toast.success(this.setToasterProperties(notifParams));
                    break;
                case "error":
                    this.$toast.error(this.setToasterProperties(notifParams));
                    break;
                case "warning":
                    break;
            }
        },
    }
})