<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addCustomerModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Customer</h4>
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
                  class="form-group bmd-form-group is-focused"
                  style="margin-top: 2px"
                >
                  <label for="role" class="bmd-label-floating"
                    >Customer Group</label
                  >
                  <select
                    class="form-control"
                    id="role"
                    v-model="customerInfo.customer_group_id"
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
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.customerInfo.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.name.required &&
                      $v.customerInfo.name.$dirty
                    "
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.customerInfo.name.minLength &&
                      $v.customerInfo.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.customerInfo.name.maxLength &&
                      $v.customerInfo.name.$dirty
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
                    'has-danger': $v.customerInfo.company_Name.$error,
                  }"
                >
                  <label for="company_Name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.customerInfo.company_Name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.company_Name.required &&
                      $v.customerInfo.company_Name.$dirty
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
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.customerInfo.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.email.required &&
                      $v.customerInfo.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="
                      !$v.customerInfo.email.email &&
                      $v.customerInfo.email.$dirty
                    "
                    class="error"
                    >Must be a valid Email Address*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.phone_number.$error,
                  }"
                >
                  <label for="phone_number" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.customerInfo.phone_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.phone_number.required &&
                      $v.customerInfo.phone_number.$dirty
                    "
                    class="error"
                    >Phone number is required*</label
                  >
                </div>
              </div>

              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.tax_no.$error,
                  }"
                >
                  <label for="tax_no" class="bmd-label-floating"
                    >Tax Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.customerInfo.tax_no.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.tax_no.required &&
                      $v.customerInfo.tax_no.$dirty
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
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.address.$error,
                  }"
                >
                  <label for="address" class="bmd-label-floating"
                    >Address</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.customerInfo.address.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.address.required &&
                      $v.customerInfo.address.$dirty
                    "
                    class="error"
                    >Address is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.city.$error,
                  }"
                >
                  <label for="city" class="bmd-label-floating"
                    >City</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.customerInfo.city.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.city.required &&
                      $v.customerInfo.city.$dirty
                    "
                    class="error"
                    >City is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.country.$error,
                  }"
                >
                  <label for="country" class="bmd-label-floating"
                    >Country</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.customerInfo.country.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.country.required &&
                      $v.customerInfo.country.$dirty
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
                    'form-group bmd-form-group': true,
                    'has-danger': $v.customerInfo.state.$error,
                  }"
                >
                  <label for="state" class="bmd-label-floating"
                    >State</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.customerInfo.state.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.customerInfo.state.required &&
                      $v.customerInfo.state.$dirty
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
                      v-model="customerInfo.is_active"
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
      showPassword: false,
      customerInfo: {
        name: "",
        company_Name: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        country: "",
        state: "",
        tax_no: "",
        customer_group_id: 1,
      },
    };
  },
  validations: {
    customerInfo: {
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
    }),
    ...mapActions({
      loadAllUsers: "users/loadAllUsers",
    }),
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isFormSubmitted = true;
        this.isShowSubmitButton = false;
        this.customerInfo.is_active = helpers.updateIsActiveStatus(
          this.customerInfo.is_active
        );
        setTimeout(() => {
          this.callAPI(this.customerInfo);
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
        (this.customerInfo = {
          name: "",
          company_Name: "",
          phone_number: "",
          email: "",
          address: "",
          city: "",
          country: "",
          tax_no: "",
          customer_group_id: 1,
        });
      $("#addCustomerModal").modal("hide");
    },
    async callAPI(customerInfo) {
      let response = await this.$store.dispatch(
        "customers/addNewCustomer",
        customerInfo
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