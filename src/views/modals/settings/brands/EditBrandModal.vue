<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="editBrandModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Brand Details</h4>
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
              <h4 class="title">Update Brand Logo</h4>
              <div
                id="editFileInputBrand"
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
                      forEditBrand.image
                        ? 'https://localhost:5001/images/uploads/Brand/' +
                          forEditBrand.image
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
                  'has-danger': errors.has('title'),
                }"
              >
                <label for="title" class="bmd-label-floating"
                  >Brand Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditBrand.title"
                  class="form-control"
                  id="title"
                  name="title"
                />
                <label
                  id="title-error"
                  v-show="errors.has('title')"
                  :class="{ error: errors.has('title') }"
                  for="name"
                  >Brand Name is required. </label>
                
              </div>
            </div>
           <div class="col-md-4" style="margin-top: 242px;">
                 <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="forEditBrand.is_active"
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
      forEditBrand: "settingsService/getforEditBrands",
    }),
  },
  methods: {
    onFileChanged(e) {
      if (e.target.value.length == 0) {
        $("#editFileInputBrand").removeClass("fileinput-exists");
      this.isShowFileInputNewThumbnail = false;
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;
      }else{
      this.forEditBrand.brandImage.imageFile = e.target.files[0];
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
        this.forEditBrand.is_active === false ||
        this.forEditBrand.is_active === "false"
      ) {
        this.forEditBrand.is_active = 0;
      } else {
        this.forEditBrand.is_active = 1;
      }
      const formData = new FormData();
      formData.append("brandId", this.forEditBrand.id);
      formData.append("title", this.forEditBrand.title);
      formData.append("is_active", this.forEditBrand.is_active);
      formData.append("image", this.forEditBrand.image);
      if (this.forEditBrand.brandImage.imageFile !== "") {
        formData.append("imageFile", this.forEditBrand.brandImage.imageFile);
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
  
    $("#editFileInputBrand").removeClass("fileinput-exists");
      this.isShowFileInputNewThumbnail = false;
      this.isShowUpdateImageButton = true;
      this.isShowChangeButton = false;
      $("#editBrandModal").modal("hide");
    },
    async callAPI(forEditBrand) {
      let response = await this.$store.dispatch("settingsService/updateBrand", [
        this.forEditBrand.id,
        forEditBrand,
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
          message: "Brand successfully updated!",
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