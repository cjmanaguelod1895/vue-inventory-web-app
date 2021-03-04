<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="editCustomerModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Customer Details</h4>
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
            <div class="row">
                <div class="col-md-4">
                <div
                class="form-group bmd-form-group is-focused"
                style="margin-top: 2px"
              >
                <label for="role" class="bmd-label-floating">Customer Group</label>
                <select
                  class="form-control"
                  id="role"
                  @change="onChange($event)"
                >
                  <!-- <option value="0" selected disabled>Select Role</option> -->
                  <option
                    v-for="(group, i) in groups"
                    :key="group.id"
                    :value="group.id"
                    :selected="group.id === forEditCustomers.customer_group_id"
                  >
                    {{ group.name }}
                  </option>
                </select>
              </div>
            </div>
            
             <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('name'),
                }"
              >
                <label for="name" class="bmd-label-floating">Name</label>
                <input
                  v-validate="'required|alpha_spaces'"
                  name="name"
                  v-model="forEditCustomers.name"
                  type="text"
                  class="form-control"
                  id="name"
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
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('company_Name'),
                }"
              >
                <label for="company_Name" class="bmd-label-floating"
                  >Company Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCustomers.company_Name"
                  name="company_Name"
                  class="form-control"
                  id="company_Name"
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
            </div>
          <div class="row">
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('email'),
                }"
              >
                <label for="email" class="bmd-label-floating"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-validate="'required|email'"
                  v-model="forEditCustomers.email"
                  class="form-control"
                  id="email"
                  name="email"
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
                    <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('phone_number'),
                }"
              >
                <label for="phone_number" class="bmd-label-floating"
                  >Phone Number</label
                >
                <input
                  type="number"
                  v-validate="'required|numeric'"
                  v-model="forEditCustomers.phone_number"
                  class="form-control"
                  id="phone_number"
                  name="phone_number"
                />
                <label
                  id="phone_number-error"
                  v-show="errors.has('phone_number')"
                  :class="{ error: errors.has('phone_number') }"
                  for="phone_number"
                  >Phone number is required.</label
                >
              </div>
            </div>
            
              <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('tax_no'),
                }"
              >
                <label for="phone" class="bmd-label-floating"
                  >Tax Number</label
                >
                <input
                  type="number"
                  v-validate="'required|numeric'"
                  v-model="forEditCustomers.tax_no"
                  class="form-control"
                  id="tax_no"
                  name="tax_no"
                />
                <label
                  id="tax_no-error"
                  v-show="errors.has('tax_no')"
                  :class="{ error: errors.has('tax_no') }"
                  for="tax_no"
                  >Tax number is required.</label
                >
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-4">
                <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('address'),
                }"
              >
                <label for="address" class="bmd-label-floating"
                  >Address</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCustomers.address"
                  name="address"
                  class="form-control"
                  id="address"
                />
                <label
                  id="address-error"
                  v-show="errors.has('address')"
                  :class="{ error: errors.has('address') }"
                  for="address"
                  >Address is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
                <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('city'),
                }"
              >
                <label for="city" class="bmd-label-floating"
                  >City</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCustomers.city"
                  name="city"
                  class="form-control"
                  id="city"
                />
                <label
                  id="city-error"
                  v-show="errors.has('city')"
                  :class="{ error: errors.has('city') }"
                  for="city"
                  >City is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
                <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('postal_code'),
                }"
              >
                <label for="postal_code" class="bmd-label-floating"
                  >Postal Code</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCustomers.postal_code"
                  name="postal_code"
                  class="form-control"
                  id="postal_code"
                />
                <label
                  id="postal_code-error"
                  v-show="errors.has('postal_code')"
                  :class="{ error: errors.has('postal_code') }"
                  for="postal_code"
                  >Postal Code is required.</label
                >
              </div>
            </div>
          </div>
          <br />
          <div class="row">
              <div class="col-md-4">
                <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('state'),
                }"
              >
                <label for="state" class="bmd-label-floating"
                  >State</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCustomers.state"
                  name="state"
                  class="form-control"
                  id="state"
                />
                <label
                  id="state-error"
                  v-show="errors.has('state')"
                  :class="{ error: errors.has('state') }"
                  for="postal_statecode"
                  >State is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="forEditCustomers.is_active"
                    checked
                    required=""
                    aria-required="true"
                    @change="checkIsActivatedAccount"
                  />
                  Active
                  <span class="form-check-sign">
                    <span class="check"></span>
                  </span>
                </label>
              </div>
            </div>
            <!-- <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('username'),
                }"
              >
                <label for="username" class="bmd-label-floating"
                  >Username</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCustomers.username"
                  class="form-control"
                  id="username"
                  name="username"
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
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('username'),
                }"
              >
                <label for="password" class="bmd-label-floating"
                  >Password</label
                >
                <input
                  type="password"
                  v-validate="'required'"
                  v-model="forEditCustomers.password"
                  class="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <label
                id="password-error"
                v-show="errors.has('password')"
                :class="{ error: errors.has('password') }"
                for="password"
                >Password is required.</label
              >
            </div> -->
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
import { mapState, mapGetters, mapActions } from "vuex";
//Utils
import { toaster } from "@/utils/toaster.js";

export default {
  data: () => {
    return {
      isFormSubmitted: false,
      isShowSubmitButton: true,
      showPassword: false
    };
  },
  computed: {
    ...mapGetters({
      groups: "settingsService/getGroups",
      forEditCustomers: 'customers/getForEditCustomers'
    }),
    ...mapActions({
      loadAllUsers: "users/loadAllUsers",
    }),
  },
  methods: {
      onChange(event){
          this.forEditCustomers.customer_group_id = parseInt(event.target.value);
      },
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
          this.checkIsActivatedAccount();
          setTimeout(() => {
            this.callAPI(this.forEditCustomers);
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
      $("#editCustomerModal").modal("hide");
    },
    checkIsActivatedAccount() {
      if (
        this.forEditCustomers.is_active === true ||
        this.forEditCustomers.is_active === 1
      ) {
        this.forEditCustomers.is_active = 1;
      } else {
        this.forEditCustomers.is_active = 0;
      }
    },
    async callAPI(forEditCustomers) {
      let response = await this.$store.dispatch("customers/updateCustomer", forEditCustomers);
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
          message: "Customer successfully saved!",
        };
        toaster.toasterType(notifParams);
        await this.$store.dispatch("customers/loadAllCustomers");
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