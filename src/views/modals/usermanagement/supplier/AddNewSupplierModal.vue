<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addSupplierModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Supplier</h4>
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
                      <h4 class="title">Add Supplier Logo</h4>
                      <div id="fileInputTestSupplier" class="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div class="fileinput-new thumbnail">
                          <img :src="defaultImage" alt="...">
                        </div>
                        <div id="fileInputExistsSupplier" class="fileinput-preview fileinput-exists thumbnail"></div>
                        <div>
                          <span class="btn btn-rose btn-round btn-file" style="background-color:#0b52b5">
                            <span v-show="isShowUpdateImageButton" class="fileinput-new">Select image</span>
                            <span v-show="isShowChangeButton" class="fileinput-exists">Change</span>
                            <input type="file" name="imageFile"  accept="image/*"
                  @change="onFileChanged($event)"/>
                          </span>
                        
        </div>
                    </div>
            </div>
          <div class="col-md-4 col-xs-12" style="margin-top: 242px;">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.supplierInfo.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.name.required &&
                      $v.supplierInfo.name.$dirty
                    "
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.supplierInfo.name.minLength &&
                      $v.supplierInfo.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.supplierInfo.name.maxLength &&
                      $v.supplierInfo.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 30 characters in length or
                    less*</label
                  >
                </div>
              </div>
             <div class="col-md-4 col-xs-12" style="margin-top: 242px;">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.supplierInfo.company_name.$error,
                  }"
                >
                  <label for="company_name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.company_name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.company_name.required &&
                      $v.supplierInfo.company_name.$dirty
                    "
                    class="error"
                    >Company Name is required*</label
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
                    'has-danger': $v.supplierInfo.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.supplierInfo.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.email.required &&
                      $v.supplierInfo.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="
                      !$v.supplierInfo.email.email &&
                      $v.supplierInfo.email.$dirty
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
                    'has-danger': $v.supplierInfo.phone_number.$error,
                  }"
                >
                  <label for="phone_number" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.supplierInfo.phone_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.phone_number.required &&
                      $v.supplierInfo.phone_number.$dirty
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
                    'has-danger': $v.supplierInfo.address.$error,
                  }"
                >
                  <label for="address" class="bmd-label-floating"
                    >Address</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.address.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.address.required &&
                      $v.supplierInfo.address.$dirty
                    "
                    class="error"
                    >Address is required*</label
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
                    'has-danger': $v.supplierInfo.vat_number.$error,
                  }"
                >
                  <label for="vat_number" class="bmd-label-floating"
                    >Vat Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.supplierInfo.vat_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.vat_number.required &&
                      $v.supplierInfo.vat_number.$dirty
                    "
                    class="error"
                    >Vat number is required*</label
                  >
                </div>
              </div>
           <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.supplierInfo.country.$error,
                  }"
                >
                  <label for="country" class="bmd-label-floating"
                    >Country</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.country.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.country.required &&
                      $v.supplierInfo.country.$dirty
                    "
                    class="error"
                    >Country is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.supplierInfo.postal_code.$error,
                  }"
                >
                  <label for="postal_code" class="bmd-label-floating"
                    >Postal Code</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.postal_code.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.postal_code.required &&
                      $v.supplierInfo.postal_code.$dirty
                    "
                    class="error"
                    >Postal Code is required*</label
                  >
                </div>
              </div>
          </div>
          <br>
          <div class="row">
             <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.supplierInfo.state.$error,
                  }"
                >
                  <label for="state" class="bmd-label-floating"
                    >State</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.state.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.state.required &&
                      $v.supplierInfo.state.$dirty
                    "
                    class="error"
                    >State is required*</label
                  >
                </div>
              </div>
            <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.supplierInfo.city.$error,
                  }"
                >
                  <label for="city" class="bmd-label-floating"
                    >City</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.supplierInfo.city.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.supplierInfo.city.required &&
                      $v.supplierInfo.city.$dirty
                    "
                    class="error"
                    >City is required*</label
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
                    v-model="supplierInfo.is_active"
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

export default {
  data: () => {
    return {
      isFormSubmitted: false,
      isShowSubmitButton: true,
      showPassword: false,
      isShowUpdateImageButton: true,
      isShowChangeButton: false,
      defaultImage: "/static/img/image_placeholder.jpg",
      supplierInfo: {
        name: "",
        company_name: "",
        email: "",
        address: "",
        state: "",
        country: "",
        city: "",
        phone_number: "",
        postal_code: "",
        vat_number: "",
        is_active: 1,
        supplierImage:{
        imageFile: null
        },
      }
    };
  },
   validations: {
    supplierInfo: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      },
      company_name: {
        required,
      },
      email: {
        required,
        email,
      },
      address: {
        required,
      },
      country:{
        required
      },
      state:{
required
      },
      city: {
        required,
      },
      phone_number: {
        required,
      },
      postal_code:{
        required
      },
      vat_number:{
        required
      }
    }
  },
  methods: {
     onFileChanged (e) {
      this.supplierInfo.supplierImage.imageFile = e.target.files[0];
      this.isShowUpdateImageButton = false;
      this.isShowChangeButton = true;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
          NProgress.start();
        this.isFormSubmitted = true;
        this.isShowSubmitButton = false;
                  this.makeFormData();
        setTimeout(() => {
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
    makeFormData(){

      if (this.supplierInfo.is_active === false || this.supplierInfo.is_active === "false") {
        this.supplierInfo.is_active = 0;
      } else {
        this.supplierInfo.is_active = 1;
      }

        const formData = new FormData()
        formData.append('name', this.supplierInfo.name);
        formData.append('company_name', this.supplierInfo.company_name);
        formData.append('email', this.supplierInfo.email);
        formData.append('address', this.supplierInfo.address);
        formData.append('phone_number', this.supplierInfo.phone_number);
        formData.append('vat_number', this.supplierInfo.vat_number);
        formData.append('postal_code', this.supplierInfo.postal_code);
        formData.append('country', this.supplierInfo.country);
        formData.append('city', this.supplierInfo.city);
        formData.append('state', this.supplierInfo.state);
        formData.append('is_active', this.supplierInfo.is_active);
        formData.append('imageFile', this.supplierInfo.supplierImage.imageFile);

        setTimeout(() => {
            this.callAPI(formData);
          }, 2000);

    },
    backToMainState() {
      this.onReset();
      (this.isFormSubmitted = false),
      this.defaultImage = "/static/img/image_placeholder.jpg",
        (this.isShowSubmitButton = true),
        (this.supplierInfo = {
          name: "",
        company_name: "",
        email: "",
        address: "",
        phone_number: "",
        postal_code: "",
        vat_number: "",
        is_active: 1,
        supplierImage:{
        imageFile: null
        }
        });

      const item = document.querySelector("#fileInputExistsSupplier");
      while (item.firstChild) {
        item.removeChild(item.firstChild);
      }

      $("#fileInputTestSupplier").removeClass("fileinput-exists");
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;

      $("#addSupplierModal").modal("hide");
    },
    async callAPI(supplierInfo) {
      let response = await this.$store.dispatch("suppliers/addNewSupplier", supplierInfo);
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
        await this.$store.dispatch("suppliers/loadAllSuppliers");
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