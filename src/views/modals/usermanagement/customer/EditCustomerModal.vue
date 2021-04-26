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
        <form @submit.prevent="submit" @reset="onReset">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4 col-xs-12" style="margin-top:5px;">
                <div
                  class="form-group bmd-form-group is-focused is-focused"
                  style="margin-top: 2px"
                >
                  <label for="role" class="bmd-label-floating"
                    >Customer Group</label
                  >
                  <select
                    class="form-control"
                    id="role"
                    v-model="forEditCustomers.customer_group_id"
                  >
                    <option
                      v-for="group in groups"
                      :key="group.id"
                      :value="group.id"
                    >
                      {{ group.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditCustomers.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.forEditCustomers.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.name.required &&
                      $v.forEditCustomers.name.$dirty
                    "
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.forEditCustomers.name.minLength &&
                      $v.forEditCustomers.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.forEditCustomers.name.maxLength &&
                      $v.forEditCustomers.name.$dirty
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
                    'has-danger': $v.forEditCustomers.company_Name.$error,
                  }"
                >
                  <label for="company_Name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditCustomers.company_Name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.company_Name.required &&
                      $v.forEditCustomers.company_Name.$dirty
                    "
                    class="error"
                    >Company Name is required*</label
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditCustomers.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.forEditCustomers.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.email.required &&
                      $v.forEditCustomers.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="
                      !$v.forEditCustomers.email.email &&
                      $v.forEditCustomers.email.$dirty
                    "
                    class="error"
                    >Must be a valid Email Address*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditCustomers.phone_number.$error,
                  }"
                >
                  <label for="phone_number" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.forEditCustomers.phone_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.phone_number.required &&
                      $v.forEditCustomers.phone_number.$dirty
                    "
                    class="error"
                    >Phone number is required*</label
                  >
                </div>
              </div>

              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditCustomers.tax_no.$error,
                  }"
                >
                  <label for="tax_no" class="bmd-label-floating"
                    >Tax Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.forEditCustomers.tax_no.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.tax_no.required &&
                      $v.forEditCustomers.tax_no.$dirty
                    "
                    class="error"
                    >Tax number is required*</label
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
                    'has-danger': $v.forEditCustomers.address.$error,
                  }"
                >
                  <label for="address" class="bmd-label-floating"
                    >Address</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditCustomers.address.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.address.required &&
                      $v.forEditCustomers.address.$dirty
                    "
                    class="error"
                    >Address is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditCustomers.city.$error,
                  }"
                >
                  <label for="city" class="bmd-label-floating"
                    >City</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditCustomers.city.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.city.required &&
                      $v.forEditCustomers.city.$dirty
                    "
                    class="error"
                    >City is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditCustomers.country.$error,
                  }"
                >
                  <label for="country" class="bmd-label-floating"
                    >Country</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditCustomers.country.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.country.required &&
                      $v.forEditCustomers.country.$dirty
                    "
                    class="error"
                    >Country is required*</label
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
                    'has-danger': $v.forEditCustomers.state.$error,
                  }"
                >
                  <label for="state" class="bmd-label-floating"
                    >State</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditCustomers.state.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditCustomers.state.required &&
                      $v.forEditCustomers.state.$dirty
                    "
                    class="error"
                    >State is required*</label
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
                    />
                    Active
                    <span class="form-check-sign">
                      <span class="check"></span>
                    </span>
                  </label>
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
      showPassword: false
    };
  },
    validations: {
    forEditCustomers: {
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
      address: {
        required,
      },
      city: {
        required,
      },
      country: {
        required,
      },
      state: {
        required,
      },
      tax_no: {
        required,
      },
      phone_number: {
        required,
      },
    }
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
       this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isFormSubmitted = true;
        this.isShowSubmitButton = false;
        this.forEditCustomers.is_active = helpers.updateIsActiveStatus(
          this.forEditCustomers.is_active
        );
        setTimeout(() => {
          this.callAPI(this.forEditCustomers);
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
      this.$validator.reset();
      (this.isFormSubmitted = false),
        (this.isShowSubmitButton = true),
      $("#editCustomerModal").modal("hide");
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