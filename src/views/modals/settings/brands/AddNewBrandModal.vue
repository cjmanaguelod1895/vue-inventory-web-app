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
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
                      <h4 class="title">Add Brand Logo</h4>
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
              <div class="col-md-4" style="margin-top: 242px;">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('title'),
                }"
              >
                <label for="title" class="bmd-label-floating"
                  >Brand Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="brandInfo.title"
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
                    v-model="brandInfo.is_active"
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
  computed: {
    
  },
  methods: {
     onFileChanged (e) {
      this.brandInfo.brandImage.imageFile = e.target.files[0];
      this.isShowUpdateImageButton = false;
      this.isShowChangeButton = true;
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
      this.$validator.reset();
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

      const item = document.querySelector("#fileInputExists");
      while (item.firstChild) {
        item.removeChild(item.firstChild);
      }

      $("#fileInputTest").removeClass("fileinput-exists");
      $("#editBrandModal").modal("hide");
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