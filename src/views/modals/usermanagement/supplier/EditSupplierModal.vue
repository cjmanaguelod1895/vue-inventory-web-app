<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="editSupplierModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Supplier Details</h4>
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
              <h4 class="title">Update Supplier Logo</h4>
              <div
                id="editFileInputSupplier"
                class="fileinput fileinput-new text-center"
                data-provides="fileinput"
              >
                <div
                id="isShowFileInputAlreadyExists"
                  v-show="isShowFileInputAlreadyExists"
                  class="fileinput-new thumbnail"
                >
                  <img
                    :src="
                      forEditSupplier.image
                        ? 'https://localhost:5001/images/uploads/Supplier/' +
                          forEditSupplier.image
                        : defaultImage
                    "
                  />
                </div>
                <div
                  v-show="isShowFileInputNewThumbnail"
                  class="fileinput-preview fileinput-exists thumbnail"
                ></div>
                <div>
                  <span
                    class="btn btn-rose btn-round btn-file"
                    style="background-color: #0b52b5"
                  >
                    <span v-show="isShowUpdateImageButton" class="fileinput-new"
                      >Update image</span
                    >
                    <span v-show="isShowChangeButton" class="fileinput-exists"
                      >Change</span
                    >
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      @change="onFileChanged($event)"
                    />
                  </span>
                </div>
              </div>
            </div>
           <div class="col-md-4 col-xs-12" style="margin-top: 242px;">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.name.$error,
                  }"
                >
                  <label for="name" class="bmd-label-floating">Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.name.required &&
                      $v.forEditSupplier.name.$dirty
                    "
                    class="error"
                    >Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.forEditSupplier.name.minLength &&
                      $v.forEditSupplier.name.$dirty
                    "
                    class="error"
                    >Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.forEditSupplier.name.maxLength &&
                      $v.forEditSupplier.name.$dirty
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.company_name.$error,
                  }"
                >
                  <label for="company_name" class="bmd-label-floating"
                    >Company Name</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.company_name.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.company_name.required &&
                      $v.forEditSupplier.company_name.$dirty
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.email.$error,
                  }"
                >
                  <label for="email" class="bmd-label-floating"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    v-model.trim="$v.forEditSupplier.email.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.email.required &&
                      $v.forEditSupplier.email.$dirty
                    "
                    class="error"
                    >Email Address is required*</label
                  >
                  <label
                    v-if="
                      !$v.forEditSupplier.email.email &&
                      $v.forEditSupplier.email.$dirty
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
                    'has-danger': $v.forEditSupplier.phone_number.$error,
                  }"
                >
                  <label for="phone_number" class="bmd-label-floating"
                    >Phone Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.forEditSupplier.phone_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.phone_number.required &&
                      $v.forEditSupplier.phone_number.$dirty
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
                    'has-danger': $v.forEditSupplier.address.$error,
                  }"
                >
                  <label for="address" class="bmd-label-floating"
                    >Address</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.address.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.address.required &&
                      $v.forEditSupplier.address.$dirty
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.vat_number.$error,
                  }"
                >
                  <label for="vat_number" class="bmd-label-floating"
                    >Vat Number</label
                  >
                  <input
                    type="number"
                    v-model.trim="$v.forEditSupplier.vat_number.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.vat_number.required &&
                      $v.forEditSupplier.vat_number.$dirty
                    "
                    class="error"
                    >Vat number is required*</label
                  >
                </div>
              </div>
           <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.country.$error,
                  }"
                >
                  <label for="country" class="bmd-label-floating"
                    >Country</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.country.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.country.required &&
                      $v.forEditSupplier.country.$dirty
                    "
                    class="error"
                    >Country is required*</label
                  >
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.postal_code.$error,
                  }"
                >
                  <label for="postal_code" class="bmd-label-floating"
                    >Postal Code</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.postal_code.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.postal_code.required &&
                      $v.forEditSupplier.postal_code.$dirty
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
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.state.$error,
                  }"
                >
                  <label for="state" class="bmd-label-floating"
                    >State</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.state.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.state.required &&
                      $v.forEditSupplier.state.$dirty
                    "
                    class="error"
                    >State is required*</label
                  >
                </div>
              </div>
            <div class="col-md-4 col-xs-12">
                <div
                  :class="{
                    'form-group bmd-form-group is-focused': true,
                    'has-danger': $v.forEditSupplier.city.$error,
                  }"
                >
                  <label for="city" class="bmd-label-floating"
                    >City</label
                  >
                  <input
                    type="text"
                    v-model.trim="$v.forEditSupplier.city.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.forEditSupplier.city.required &&
                      $v.forEditSupplier.city.$dirty
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
                    v-model="forEditSupplier.is_active"
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
      defaultImage: "/static/img/image_placeholder.jpg",
      isShowFileInputAlreadyExists: true,
      isShowFileInputNewThumbnail: false,
      isShowUpdateImageButton: true,
      isShowChangeButton: false,
    };
  },
  computed: {
    ...mapGetters({
      forEditSupplier: "suppliers/getForEditSuppliers",
    }),
  },
   validations: {
    forEditSupplier: {
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
    onFileChanged(e) {
      if (e.target.value.length == 0) {
        $("#editFileInputSupplier").removeClass("fileinput-exists");
      this.isShowFileInputNewThumbnail = false;
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;
      }else{
      this.forEditSupplier.supplierImage.imageFile = e.target.files[0];
      this.isShowFileInputNewThumbnail = true;
      this.isShowFileInputAlreadyExists = false;
      this.isShowUpdateImageButton = false;
      this.isShowChangeButton = true;
      }

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
    makeFormData() {
      if (
        this.forEditSupplier.is_active === false ||
        this.forEditSupplier.is_active === "false"
      ) {
        this.forEditSupplier.is_active = 0;
      } else {
        this.forEditSupplier.is_active = 1;
      }
      const formData = new FormData();
      formData.append("supplierId", this.forEditSupplier.id);
      formData.append("name", this.forEditSupplier.name);
      formData.append("company_name", this.forEditSupplier.company_name);
      formData.append("email", this.forEditSupplier.email);
      formData.append("address", this.forEditSupplier.address);
      formData.append("phone_number", this.forEditSupplier.phone_number);
      formData.append("vat_number", this.forEditSupplier.vat_number);
      formData.append("postal_code", this.forEditSupplier.postal_code);
      formData.append("country", this.forEditSupplier.country);
      formData.append("city", this.forEditSupplier.city);
      formData.append("state", this.forEditSupplier.state);
      formData.append("is_active", this.forEditSupplier.is_active);
      formData.append("image", this.forEditSupplier.image);
      if (this.forEditSupplier.supplierImage.imageFile !== "") {
        formData.append("imageFile", this.forEditSupplier.supplierImage.imageFile);
      }

      setTimeout(() => {
        this.callAPI(formData);
      }, 2000);
    },
    backToMainState() {
     this.onReset();
      (this.isFormSubmitted = false),
        (this.defaultImage = "/static/img/image_placeholder.jpg"),
        (this.isShowSubmitButton = true);
        this.isShowFileInputAlreadyExists = true;
  
    $("#editFileInputSupplier").removeClass("fileinput-exists");
      this.isShowFileInputNewThumbnail = false;
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;
      $("#editSupplierModal").modal("hide");
    },
    async callAPI(forEditSupplier) {
      let response = await this.$store.dispatch("suppliers/updateSupplier", [
        this.forEditSupplier.id,
        forEditSupplier,
      ]);
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
          message: "Supplier successfully updated!",
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