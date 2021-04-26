<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="editUserModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit User Detail</h4>
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditUsers.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.forEditUsers.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="!$v.forEditUsers.name.required && $v.forEditUsers.name.$dirty"
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.forEditUsers.name.minLength && $v.forEditUsers.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.forEditUsers.name.maxLength && $v.forEditUsers.name.$dirty
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditUsers.company_Name.$error,
                  }"
                >
                  <label for="company_Name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditUsers.company_Name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditUsers.company_Name.required &&
                      $v.forEditUsers.company_Name.$dirty
                    "
                    class="error"
                    >Company Name is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditUsers.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.forEditUsers.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditUsers.email.required && $v.forEditUsers.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="!$v.forEditUsers.email.email && $v.forEditUsers.email.$dirty"
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditUsers.phone.$error,
                  }"
                >
                  <label for="phone" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.forEditUsers.phone.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditUsers.phone.required && $v.forEditUsers.phone.$dirty
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
                    v-model="forEditUsers.role_id"
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
                      v-model="forEditUsers.is_active"
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditUsers.username.$error,
                  }"
                >
                  <label for="username" class="bmd-label-floating"
                    >Username</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditUsers.username.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditUsers.username.required &&
                      $v.forEditUsers.username.$dirty
                    "
                    class="error"
                    >Username is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditUsers.password.$error,
                  }"
                >
                  <label for="password" class="bmd-label-floating"
                    >Password</label
                  >
                  <input
                    type="password"
                    v-validate="'required'"
                    v-model.trim="$v.forEditUsers.password.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditUsers.password.required &&
                      $v.forEditUsers.password.$dirty
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
    };
    
  },
   validations: {
    forEditUsers: {
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
      forEditUsers: "users/getForEditUser",
    }),
    ...mapActions({
      loadAllUsers: "users/loadAllUsers",
    }),
  },
  methods: {
    onChange(event) {
      this.forEditUsers.role_id = parseInt(event.target.value);
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isFormSubmitted = true;
        this.isShowSubmitButton = false;
        this.forEditUsers.is_active = helpers.updateIsActiveStatus(
          this.forEditUsers.is_active
        );
        setTimeout(() => {
          this.callAPI(this.forEditUsers);
        }, 2000);
      } else {
        this.isFormSubmitted = false;
      }
    },
    onReset() {
      // reset form validation errors
      this.$v.$reset();
    },
    submit() {
       this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isFormSubmitted = true;
        this.isShowSubmitButton = false;
        this.forEditUsers.is_active = helpers.updateIsActiveStatus(
          this.forEditUsers.is_active
        );
        setTimeout(() => {
          this.callAPI(this.forEditUsers);
        }, 2000);
      } else {
        this.isFormSubmitted = false;
      }
    },
    backToMainState() {
       this.onReset();
      (this.isFormSubmitted = false),
        (this.isShowSubmitButton = true),
        $("#editUserModal").modal("hide");
      this.$store.dispatch("settingsService/loadAllRoles");
    },
    async callAPI(forEditUsers) {
      let response = await this.$store.dispatch(
        "users/updateUser",
        forEditUsers
      );
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
          message: "User successfully updated!",
        };
        toaster.toasterType(notifParams);
        await this.loadAllUsers;
        this.backToMainState();
        this.$store.dispatch("users/loadAllUsers");
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