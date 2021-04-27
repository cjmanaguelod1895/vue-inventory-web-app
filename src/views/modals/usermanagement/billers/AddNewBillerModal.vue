<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addBillerModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Biller</h4>
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
            <div class="col-md-4">
                      <h4 class="title">Add Biller Logo</h4>
                      <div id="fileInputTest" class="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div class="fileinput-new thumbnail">
                          <img :src="defaultImage" alt="...">
                        </div>
                        <div id="fileInputExists" class="fileinput-preview fileinput-exists thumbnail"></div>
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
                    'has-danger': $v.billerInfo.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.name.required &&
                      $v.billerInfo.name.$dirty
                    "
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.billerInfo.name.minLength &&
                      $v.billerInfo.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.billerInfo.name.maxLength &&
                      $v.billerInfo.name.$dirty
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
                    'has-danger': $v.billerInfo.company_name.$error,
                  }"
                >
                  <label for="company_name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.company_name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.company_name.required &&
                      $v.billerInfo.company_name.$dirty
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
                    'has-danger': $v.billerInfo.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.billerInfo.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.email.required &&
                      $v.billerInfo.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="
                      !$v.billerInfo.email.email &&
                      $v.billerInfo.email.$dirty
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
                    'has-danger': $v.billerInfo.phone_number.$error,
                  }"
                >
                  <label for="phone_number" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.billerInfo.phone_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.phone_number.required &&
                      $v.billerInfo.phone_number.$dirty
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
                    'has-danger': $v.billerInfo.address.$error,
                  }"
                >
                  <label for="address" class="bmd-label-floating"
                    >Address</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.address.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.address.required &&
                      $v.billerInfo.address.$dirty
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
                    'has-danger': $v.billerInfo.vat_number.$error,
                  }"
                >
                  <label for="vat_number" class="bmd-label-floating"
                    >Vat Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.billerInfo.vat_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.vat_number.required &&
                      $v.billerInfo.vat_number.$dirty
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
                    'has-danger': $v.billerInfo.country.$error,
                  }"
                >
                  <label for="country" class="bmd-label-floating"
                    >Country</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.country.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.country.required &&
                      $v.billerInfo.country.$dirty
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
                    'has-danger': $v.billerInfo.postal_code.$error,
                  }"
                >
                  <label for="postal_code" class="bmd-label-floating"
                    >Postal Code</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.postal_code.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.postal_code.required &&
                      $v.billerInfo.postal_code.$dirty
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
                    'has-danger': $v.billerInfo.state.$error,
                  }"
                >
                  <label for="state" class="bmd-label-floating"
                    >State</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.state.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.state.required &&
                      $v.billerInfo.state.$dirty
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
                    'has-danger': $v.billerInfo.city.$error,
                  }"
                >
                  <label for="city" class="bmd-label-floating"
                    >City</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.billerInfo.city.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.billerInfo.city.required &&
                      $v.billerInfo.city.$dirty
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
                    v-model="billerInfo.is_active"
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
import { helpers } from "@/utils/helpers.js";

export default {
  data: () => {
    return {
      isFormSubmitted: false,
      isShowSubmitButton: true,
      showPassword: false,
      isShowUpdateImageButton: true,
      isShowChangeButton: false,
      defaultImage: "/static/img/image_placeholder.jpg",
      billerInfo: {
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
        billerImage:{
        imageFile: null
        },
      }
    };
  },
    validations: {
    billerInfo: {
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
      this.billerInfo.billerImage.imageFile = e.target.files[0];
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
          this.callAPI(this.billerInfo);
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

      if (this.billerInfo.is_active === false || this.billerInfo.is_active === "false") {
        this.billerInfo.is_active = 0;
      } else {
        this.billerInfo.is_active = 1;
      }

        const formData = new FormData()
        formData.append('name', this.billerInfo.name);
        formData.append('company_name', this.billerInfo.company_name);
        formData.append('email', this.billerInfo.email);
        formData.append('address', this.billerInfo.address);
        formData.append('phone_number', this.billerInfo.phone_number);
        formData.append('vat_number', this.billerInfo.vat_number);
        formData.append('postal_code', this.billerInfo.postal_code);
        formData.append('country', this.billerInfo.country);
        formData.append('city', this.billerInfo.city);
        formData.append('state', this.billerInfo.state);
        formData.append('is_active', this.billerInfo.is_active);
        formData.append('imageFile', this.billerInfo.billerImage.imageFile);

        setTimeout(() => {
            this.callAPI(formData);
          }, 2000);

    },
    backToMainState() {
      this.onReset();
      (this.isFormSubmitted = false),
      this.defaultImage = "/static/img/image_placeholder.jpg",
        (this.isShowSubmitButton = true),
        (this.billerInfo = {
          name: "",
        company_name: "",
        email: "",
        address: "",
        phone_number: "",
        postal_code: "",
        vat_number: "",
        is_active: 1,
        billerImage:{
        imageFile: null
        }
        });

      const item = document.querySelector("#fileInputExists");
      while (item.firstChild) {
        item.removeChild(item.firstChild);
      }

      $("#fileInputTest").removeClass("fileinput-exists");
      $("#editBillerModal").modal("hide");
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;

      $("#addBillerModal").modal("hide");
    },
    async callAPI(billerInfo) {
      let response = await this.$store.dispatch("billers/addNewBiller", billerInfo);
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
        await this.$store.dispatch("billers/loadAllBillers");
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