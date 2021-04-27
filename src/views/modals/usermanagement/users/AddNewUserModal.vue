<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addUserModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New User</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            <i class="material-icons">clear</i>
          </button>
        </div>
        <form @submit.prevent="submit" @reset="onReset">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.userInfo.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.userInfo.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="!$v.userInfo.name.required && $v.userInfo.name.$dirty"
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.userInfo.name.minLength && $v.userInfo.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.userInfo.name.maxLength && $v.userInfo.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 30 characters in length or
                    less*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.userInfo.company_Name.$error,
                  }"
                >
                  <label for="company_Name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.userInfo.company_Name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.userInfo.company_Name.required &&
                      $v.userInfo.company_Name.$dirty
                    "
                    class="error"
                    >Company Name is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.userInfo.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.userInfo.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.userInfo.email.required && $v.userInfo.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="!$v.userInfo.email.email && $v.userInfo.email.$dirty"
                    class="error"
                    >Must be a valid Email Address*</label
                  >
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.userInfo.phone.$error,
                  }"
                >
                  <label for="phone" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.userInfo.phone.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.userInfo.phone.required && $v.userInfo.phone.$dirty
                    "
                    class="error"
                    >Phone number is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  class="form-group bmd-form-group is-focused"
                  style="margin-top: 7px"
                >
                  <label for="role" class="bmd-label-floating">Role</label>
                  <select
                    class="form-control"
                    id="role"
                    v-model="userInfo.role_id"
                  >
                    <option
                      v-for="(role) in roles"
                      :key="role.id"
                      :value="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div class="form-check mr-auto" style="margin-top: 25px">
                  <label class="form-check-label">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_active"
                      v-model="userInfo.is_active"
                      checked
                      aria-required="true"
                    />
                    Active
                    <span class="form-check-sign">
                      <span class="check"></span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.userInfo.username.$error,
                  }"
                >
                  <label for="username" class="bmd-label-floating"
                    >Username</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.userInfo.username.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.userInfo.username.required &&
                      $v.userInfo.username.$dirty
                    "
                    class="error"
                    >Username is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.userInfo.password.$error,
                  }"
                >
                  <label for="password" class="bmd-label-floating"
                    >Password</label
                  >
                  <input
                    type="password"
                    v-validate="'required'"
                    v-model.trim="$v.userInfo.password.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.userInfo.password.required &&
                      $v.userInfo.password.$dirty
                    "
                    class="error"
                    >Password is required*</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="loader" v-show="isFormSubmitted"></div>
            <button
              class="btn btn btn-primary my-custom-class"
              v-show="isShowSubmitButton"
            >
              Submit
              <div class="ripple-container"></div>
              <i class="material-icons">send</i>
            </button>
            <button
              type="button"
              class="btn btn-danger btn-link"
              @click.prevent="backToMainState"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from "vuelidate/lib/validators";
import { mapState, mapGetters, mapActions } from "vuex";
//Utils
import { toaster } from "@/utils/toaster.js";
import { helpers } from "@/utils/helpers.js";

export default {
  data: () => {
    return {
      isFormSubmitted: false,
      isShowSubmitButton: true,
      showPassword: false,
      userInfo: {
        name: "",
        company_Name: "",
        phone: "",
        email: "",
        role_id: 1,
        is_active: 1,
        username: "",
        password: "",
      },
    };
  },
  validations: {
    userInfo: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      },
      company_Name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters({
      roles: "settingsService/getRoles",
    }),
    ...mapActions({
      loadAllUsers: "users/loadAllUsers",
    }),
  },
  methods: {
    submit() {
      
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.isFormSubmitted = true;
        this.isShowSubmitButton = false;
        this.userInfo.is_active = helpers.updateIsActiveStatus(
          this.userInfo.is_active
        );
        setTimeout(() => {
          this.callAPI(this.userInfo);
          NProgress.done();
        }, 2000);
      } else {
        this.isFormSubmitted = false;
      }
    },
    onReset() {
      // reset form validation errors
      this.$v.$reset();
    },
    backToMainState() {
      this.onReset();
      (this.isFormSubmitted = false),
        (this.isShowSubmitButton = true),
         this.userInfo=  {
        name: "",
        company_Name: "",
        phone: "",
        email: "",
        role_id: 1,
        is_active: 1,
        username: "",
        password: "",
      },
      $("#addUserModal").modal("hide");
    },
    async callAPI(userInfo) {
      let response = await this.$store.dispatch("users/addNewUser", userInfo);
      if (response.isError) {
        let notifParams = {
          type: "error",
          title: "Error",
          message: response.errorMessage,
        };
        toaster.toasterType(notifParams);
        this.isFormSubmitted = false;
        this.isShowSubmitButton = true;
      } else {
        let notifParams = {
          type: "success",
          title: "Success",
          message: "User successfully saved!",
        };
        toaster.toasterType(notifParams);
        await this.$store.dispatch("users/loadAllUsers");
        this.backToMainState();
      }
    },
  },
};
</script>
<style scoped>
.error {
  color: #f44336;
}
</style>