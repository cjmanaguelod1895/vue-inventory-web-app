<template>
  <body class="off-canvas-sidebar">
    <nav
      class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white"
    >
      <!-- <div class="container">
        <div class="navbar-wrapper"></div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon icon-bar"></span>
          <span class="navbar-toggler-icon icon-bar"></span>
          <span class="navbar-toggler-icon icon-bar"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a href="../pages/register.html" class="nav-link">
                <i class="material-icons">person_add</i>
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a href="../pages/login.html" class="nav-link">
                <i class="material-icons">fingerprint</i>
                Login
              </a>
            </li>
            <li class="nav-item">
              <a href="../pages/lock.html" class="nav-link">
                <i class="material-icons">lock_open</i>
                Lock
              </a>
            </li>
          </ul>
        </div>
      </div> -->
    </nav>
    <div class="wrapper wrapper-full-page">
      <div
        class="page-header login-page header-filter"
        filter-color="black"
        style="
          background-image: url('/static/img/login.png');
          background-size: cover;
          background-position: top center;
        "
      >
        <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
              <form class="form">
                <div class="card card-login card-hidden">
                  <div class="card-header card-header-info text-center">
                    <h4 class="card-title">Login</h4>
                  </div>
                  <div class="social-line text-center">
                    <div class="card-avatar">
                      <a href="#pablo">
                        <img
                          src="/static/img/faces/login-page-avatar.svg"
                          alt="Avatar"
                          class="avatar"
                        />
                      </a>
                    </div>
                  </div>
                  <div class="card-body">
                    <span
                      :class="{
                        'form-group bmd-form-group': true,
                        'has-danger': errors.has('userName'),
                      }"
                    >
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="material-icons">face</i>
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          v-validate="'required'"
                          placeholder="Username"
                          id="userName"
                          v-model="loginInfo.userName"
                          name="userName"
                        />
                      </div>
                      <label
                        style="margin-left: 55px"
                        id="required-error"
                        v-show="errors.has('userName')"
                        :class="{ error: errors.has('userName') }"
                        for="userName"
                        >Username is required.</label
                      >
                    </span>
                    <span
                      :class="{
                        'form-group bmd-form-group': true,
                        'has-danger': errors.has('password'),
                      }"
                    >
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="material-icons">lock_outline</i>
                          </span>
                        </div>
                        <input
                          :type="showPassword ? 'text' : 'password'"
                          v-validate="'required'"
                          class="form-control"
                          placeholder="Password"
                          v-model="loginInfo.password"
                          name="password"
                        />
                        <span
                          style="
                            margin-top: 20px;
                            margin-left: -10px;
                            cursor: pointer;
                          "
                          @click="showPassword = !showPassword"
                          _ngcontent-xra-c19=""
                          class="material-icons icon-image-preview"
                          >remove_red_eye</span
                        >
                      </div>
                      <label
                        style="margin-left: 55px"
                        id="required-error"
                        v-show="errors.has('password')"
                        :class="{ error: errors.has('password') }"
                        for="password"
                        >Password is required.</label
                      >
                    </span>
                  </div>
                  <div class="card-footer justify-content-center">
                    <div class="loader" v-show="isFormSubmitted" style="margin-bottom:62px;"></div>
                    <button
                      @click.prevent="login"
                      v-show="isShowLoginButton"
                      class="btn btn-info btn-round"
                      style="margin-bottom: 20px"
                    >
                      Login <i class="material-icons">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import CrudDataServices from "../services/CrudDataServices";
//Utils
import { toaster } from "@/utils/toaster.js";

export default {
  name: "Login",
  data: () => {
    return {
      isFormSubmitted: false,
      isShowLoginButton: true,
      showPassword: false,
      loginInfo: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then((result) => {
        if (result) {
            NProgress.start();
          this.isFormSubmitted = true;
          this.isShowLoginButton = false;
         setTimeout(() => {
           this.callAPI(this.loginInfo);
             NProgress.done();
         }, 2000); 
          return true;
        } else {
          this.isFormSubmitted = false;
        }
      });
    },
    async callAPI(loginInfo) {
      let user = await this.$store.dispatch("users/login", loginInfo);
      if (user.isLoginError) {
        let notifParams = {
          type: "error",
          title: "Error",
          message: user.errorMessage,
        };
        toaster.toasterType(notifParams);
        this.isFormSubmitted = false;
        this.isShowLoginButton = true;
      } else {
        alert("Welcome " + user.name);
        setTimeout(() => {
         if (user.role == "Admin") {
          this.$router.push("/dashboard");
         } else if(user.role == "Cashier") {
          this.$router.push("/dashboard");
         }
         else if(ser.role == "Staff"){
          this.$router.push("/dashboard");
         }
         else{
            this.$router.push("/login");
         }
        }, 2000);
      }
    },
  },
  mounted() {
    $(document).ready(function () {
      md.checkFullPageBackgroundImage();
      setTimeout(function () {
        // after 1000 ms we add the class animated to the login/register card
        $(".card").removeClass("card-hidden");
      }, 700);
    });
  },
};
</script>
<style  scoped>
.form-control, .is-focused .form-control
{
    background-image: linear-gradient(to top, #445fca 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, #d2d2d2 1px, rgba(210, 210, 210, 0) 1px);
}
.card-login {
  height: 470px;
}
.card-body {
  margin-top: 50px;
}
.avatar {
  vertical-align: middle;
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

</style>