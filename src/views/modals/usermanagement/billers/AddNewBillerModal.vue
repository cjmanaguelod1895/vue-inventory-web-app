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
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4 col-sm-4">
                      <h4 class="title">Regular Image</h4>
                      <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                        <!-- <div class="fileinput-new thumbnail">
                          <img src="../../assets/img/image_placeholder.jpg" alt="...">
                        </div> -->
                        <div class="fileinput-preview fileinput-exists thumbnail"></div>
                        <div>
                          <span class="btn btn-rose btn-round btn-file">
                            <span class="fileinput-new">Select image</span>
                            <span class="fileinput-exists">Change</span>
                            <input type="file" name="imageFile"  accept="image/*"
                  @change="onFileChanged($event)"/>
                          </span>
                        
                        </div>
                      </div>
                    </div>
                 <div class="col-md-4">
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
    //   userInfo: {
    //     name: "",
    //     company_Name: "",
    //     phone: "",
    //     email: "",
    //     role_id: 1,
    //     is_active: 1,
    //     username: "",
    //     password: "",
    //   },
    userInfo:{
        
        name: "test",
        billerImage:{
        imageFile: null,
        imageUrl: null
        },
        
    }
    };
  },
  computed: {
    ...mapGetters({
      roles: "settingsService/getRoles",
    }),
    ...mapActions({
      loadAllUsers: "users/loadAllUsers",
    }),
  },
  methods: {
     onFileChanged (e) {
      this.userInfo.billerImage.imageFile = e.target.files[0];
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

        const formData = new FormData()
        formData.append('name', this.userInfo.name);
        formData.append('imageFile', this.userInfo.billerImage.imageFile, this.userInfo.billerImage.imageFile);

        setTimeout(() => {
            this.callAPI(formData);
          }, 2000);

    },
    backToMainState() {
      this.$validator.reset();
      (this.isFormSubmitted = false),
        (this.isShowSubmitButton = true),
        (this.userInfo = {
          name: "",
          company_Name: "",
          phone: "",
          email: "",
          role_id: 1,
          is_active: 1,
          username: "",
          password: "",
        });
      $("#addUserModal").modal("hide");
    },
    async callAPI(userInfo) {
      let response = await this.$store.dispatch("billers/addNewBiller", userInfo);
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
        await this.$store.dispatch("users/loadAllUsers");
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