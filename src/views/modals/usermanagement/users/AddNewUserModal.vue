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
        <div class="modal-body">
          <!-- <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <div class="row">
              <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('test'),
                }"
              >
                <label for="test" class="bmd-label-floating">test</label>
                <input
                  name="test"
                  v-model="userInfo.test"
                  type="text"
                  class="form-control"
                  id="test"
                />
                <label
                  id="test-error"
                  for="test"
                  >{{errors.test}}</label
                >
              </div>
            </div>
            </div>
          </Form> -->
          <div class="row">
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('name'),
                }"
              >
                <label for="name" class="bmd-label-floating">Name</label>
                <input
                  v-validate="'required|alpha_spaces'"
                  v-model="userInfo.name"
                  type="text"
                  class="form-control"
                />
                <label
                  id="name-error"
                  v-show="errors.has('name')"
                  :class="{ error: errors.has('name') }"
                  for="name"
                  >Name is required and may only contain alphabetic characters.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('company_Name'),
                }"
              >
                <label for="company_Name" class="bmd-label-floating"
                  >Company Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="userInfo.company_Name"
                  class="form-control"
                />
                <label
                  id="name-error"
                  v-show="errors.has('company_Name')"
                  :class="{ error: errors.has('company_Name') }"
                  for="company_Name"
                  >Company Name is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('email'),
                }"
              >
                <label for="email" class="bmd-label-floating"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-validate="'required|email'"
                  v-model="userInfo.email"
                  class="form-control"
                />
                <label
                  id="email-error"
                  v-show="errors.has('email')"
                  :class="{ error: errors.has('email') }"
                  for="email"
                  >Email Address should be valid.</label
                >
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('phone'),
                }"
              >
                <label for="phone" class="bmd-label-floating"
                  >Phone Number</label
                >
                <input
                  type="number"
                  v-validate="'required|numeric'"
                  v-model="userInfo.phone"
                  class="form-control"
                  id="phone"
                  name="phone"
                />
                <label
                  id="phone-error"
                  v-show="errors.has('phone')"
                  :class="{ error: errors.has('phone') }"
                  for="phone"
                  >Phone number is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                class="form-group bmd-form-group is-focused"
                style="margin-top: 2px"
              >
                <label for="role" class="bmd-label-floating">Role</label>
                <select
                  class="form-control"
                  id="role"
                  v-model="userInfo.role_id"
                >
                  <!-- <option value="0" selected disabled>Select Role</option> -->
                  <option
                    v-for="(role, i) in roles"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="userInfo.is_active"
                    checked
                    required=""
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
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('username'),
                }"
              >
                <label for="username" class="bmd-label-floating"
                  >Username</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="userInfo.username"
                  class="form-control"
                />
                <label
                  id="username-error"
                  v-show="errors.has('username')"
                  :class="{ error: errors.has('username') }"
                  for="username"
                  >Username is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('username'),
                }"
              >
                <label for="password" class="bmd-label-floating"
                  >Password</label
                >
                <input
                  type="password"
                  v-validate="'required'"
                  v-model="userInfo.password"
                  class="form-control"
                />
              </div>
              <label
                id="password-error"
                v-show="errors.has('password')"
                :class="{ error: errors.has('password') }"
                for="password"
                >Password is required.</label
              >
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="loader" v-show="isFormSubmitted"></div>
          <button
            class="btn btn-info btn-round"
            @click.prevent="submit"
            v-show="isShowSubmitButton"
            style="background: linear-gradient(60deg, #0b52b5, #8e24aa)"
          >
            Submit
            <div class="ripple-container"></div>
          </button>
          <button
            type="button"
            class="btn btn-danger btn-link"
            @click.prevent="backToMainState"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Form, Field } from 'vee-validate';
// import * as Yup from 'yup';
import { mapState, mapGetters, mapActions } from "vuex";
//Utils
import { toaster } from "@/utils/toaster.js";

export default {
  // components: {
  //       Form,
  //       Field,
  //   },
  //   setup() {
  //       const schema = Yup.object().shape({
  //           test: Yup.string()
  //               .required('Test is required')
  //       });

  //       const onSubmit = values => {
  //           // display form values on success
  //           alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
  //       }

  //       return {
  //           schema,
  //           onSubmit
  //       };
  //   },
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
        test: ""
      },
    };
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
          setTimeout(() => {
            this.callAPI(this.userInfo);
          }, 2000);
          return true;
        } else {
          this.isFormSubmitted = false;
        }
      });
    },
    backToMainState() {
      this.$validator.reset();
      (this.isFormSubmitted = false),
        (this.isShowSubmitButton = true),
        (this.userInfo = {
          name: "",
          company_Name: "",
          phone: "",
          email: "",
          role_id: 1,
          is_active: 1,
          username: "",
          password: "",
        });
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