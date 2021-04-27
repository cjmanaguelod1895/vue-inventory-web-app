<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addBrandModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Brand</h4>
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
                      <h4 class="title">Add Brand Logo</h4>
                      <div id="fileInputTestBrand" class="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div class="fileinput-new thumbnail">
                          <img :src="defaultImage" alt="...">
                        </div>
                        <div id="fileInputExistsBrand" class="fileinput-preview fileinput-exists thumbnail"></div>
                        <div>
                          <span class="btn btn-rose btn-round btn-file" style="background-color:#0b52b5">
                            <span v-show="isShowUpdateImageButton" class="fileinput-new">Select image</span>
                            <span v-show="isShowChangeButton" class="fileinput-exists">Change</span>
                            <input type="file" title="imageFile"  accept="image/*"
                  @change="onFileChanged($event)"/>
                          </span>
                        
        </div>
                    </div>
            </div>
               <div class="col-md-4 col-xs-12" style="margin-top: 242px;">
                <div
                  :class="{
                    'form-group bmd-form-group': true,
                    'has-danger': $v.brandInfo.title.$error,
                  }"
                >
                  <label for="title" class="bmd-label-floating">Brand Name</label>
                  <input
                    type="text"
                    v-model.trim="$v.brandInfo.title.$model"
                    class="form-control"
                  />
                  <label
                    v-if="
                      !$v.brandInfo.title.required &&
                      $v.brandInfo.title.$dirty
                    "
                    class="error"
                    >Brand Name is required*</label
                  >
                  <label
                    v-if="
                      !$v.brandInfo.title.minLength &&
                      $v.brandInfo.title.$dirty
                    "
                    class="error"
                    >Brand Name must be atlease 3 characters in length*</label
                  >
                  <label
                    v-if="
                      !$v.brandInfo.title.maxLength &&
                      $v.brandInfo.title.$dirty
                    "
                    class="error"
                    >Brand Name must be atlease 30 characters in length or
                    less*</label
                  >
                </div>
              </div>
            <div class="col-md-4" style="margin-top: 242px;">
                 <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="brandInfo.is_active"
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
      brandInfo: {
        title: "",
        is_active: 1,
        brandImage:{
        imageFile: null
        },
      }
    };
  },
  validations: {
    brandInfo: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      }
    }
  },
  methods: {
     onFileChanged (e) {
      this.brandInfo.brandImage.imageFile = e.target.files[0];
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

        if (this.brandInfo.is_active === false || this.brandInfo.is_active === "false") {
          this.brandInfo.is_active = 0;
        } else {
          this.brandInfo.is_active = 1;
        }

        const formData = new FormData()
        formData.append('title', this.brandInfo.title);
        formData.append('is_active', this.brandInfo.is_active);
        formData.append('imageFile', this.brandInfo.brandImage.imageFile);

        setTimeout(() => {
            this.callAPI(formData);
          }, 2000);

    },
    backToMainState() {
      this.onReset();
      (this.isFormSubmitted = false),
      this.defaultImage = "/static/img/image_placeholder.jpg",
        (this.isShowSubmitButton = true),
        (this.brandInfo = {
          title: "",
        is_active: 1,
        brandImage:{
        imageFile: null
        }
        });

      const item = document.querySelector("#fileInputExistsBrand");
      while (item.firstChild) {
        item.removeChild(item.firstChild);
      }

      $("#fileInputTestBrand").removeClass("fileinput-exists");
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;

      $("#addBrandModal").modal("hide");
    },
    async callAPI(brandInfo) {
      let response = await this.$store.dispatch("settingsService/addNewBrand", brandInfo);
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
          message: "Brand successfully saved!",
        };
        toaster.toasterType(notifParams);
        await this.$store.dispatch("settingsService/loadAllBrands");
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