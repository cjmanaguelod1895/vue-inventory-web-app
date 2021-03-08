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
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
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
            <div class="col-md-4" style="margin-top: 242px">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('name'),
                }"
              >
                <label for="name" class="bmd-label-floating">Name</label>
                <input
                  type="text"
                  v-validate="'required|alpha_spaces'"
                  v-model="forEditSupplier.name"
                  class="form-control"
                />
                <label
                  id="name-error"
                  v-show="errors.has('name')"
                  :class="{ error: errors.has('name') }"
                  for="name"
                  >Name is required and may only contain alphabetic
                  characters.</label
                >
              </div>
            </div>
            <div class="col-md-4" style="margin-top: 242px">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('company_name'),
                }"
              >
                <label for="company_name" class="bmd-label-floating"
                  >Company Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditSupplier.company_name"

                  class="form-control"
                />
                <label
                  id="company_name-error"
                  v-show="errors.has('company_name')"
                  :class="{ error: errors.has('company_name') }"
                  for="company_name"
                  >Company Name is required.</label
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
                  'has-danger': errors.has('email'),
                }"
              >
                <label for="email" class="bmd-label-floating"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-validate="'required|email'"
                  v-model="forEditSupplier.email"
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
                  v-model="forEditSupplier.phone_number"
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
                  'has-danger': errors.has('address'),
                }"
              >
                <label for="address" class="bmd-label-floating">Address</label>
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditSupplier.address"
                  class="form-control"
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
          </div>
          <br />
          <div class="row">
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('vat_number'),
                }"
              >
                <label for="vat_number" class="bmd-label-floating"
                  >Vat Number</label
                >
                <input
                  type="number"
                  v-validate="'required'"
                  v-model="forEditSupplier.vat_number"
                  class="form-control"
                  id="vat_number"
                  name="vat_number"
                />
                <label
                  id="vat_number-error"
                  v-show="errors.has('vat_number')"
                  :class="{ error: errors.has('vat_number') }"
                  for="vat_number"
                  >Vat Number is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('country'),
                }"
              >
                <label for="country" class="bmd-label-floating">Country</label>
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditSupplier.country"
                  class="form-control"
                />
                <label
                  id="country-error"
                  v-show="errors.has('country')"
                  :class="{ error: errors.has('country') }"
                  for="country"
                  >Country is required.</label
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
                  v-model="forEditSupplier.postal_code"
                  class="form-control"
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
                <label for="state" class="bmd-label-floating">State</label>
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditSupplier.state"
                  class="form-control"
                />
              </div>
              <label
                id="state-error"
                v-show="errors.has('state')"
                :class="{ error: errors.has('state') }"
                for="state"
                >State is required.</label
              >
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('city'),
                }"
              >
                <label for="city" class="bmd-label-floating">City</label>
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditSupplier.city"
                  class="form-control"
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
              <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="forEditSupplier.is_active"
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
          this.makeFormData();
          return true;
        } else {
          this.isFormSubmitted = false;
        }
      });
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
      this.$validator.reset();
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