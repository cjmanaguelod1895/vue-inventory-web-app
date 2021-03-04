<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addTaxModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Tax</h4>
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
                   <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('name'),
                }"
              >
                <label for="code" class="bmd-label-floating"
                  >Tax Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="taxInfo.name"
                  class="form-control"
                  id="name"
                  name="name"
                />
                <label
                  id="name-error"
                  v-show="errors.has('name')"
                  :class="{ error: errors.has('name') }"
                  for="name"
                  >Tax name is required. </label>
                
              </div>
            </div>
              <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('rate'),
                }"
              >
                <label for="title" class="bmd-label-floating"
                  >Rate</label
                >
                <input
                  type="number"
                  v-validate="'required'"
                  v-model="taxInfo.rate"
                  class="form-control"
                  id="rate"
                  name="rate"
                />
                <label
                  id="rate-error"
                  v-show="errors.has('rate')"
                  :class="{ error: errors.has('rate') }"
                  for="name"
                  >Rate is required.</label>
                
              </div>
            </div>
              <div class="col-md-4">
                 <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="taxInfo.is_active"
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
      taxInfo: {
        name: "",
        rate: "",
        is_active: 1
      }
    };
  },
  computed: {
    
  },
  methods: {  
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
          setTimeout(() => {
            this.taxInfo.rate = parseInt(this.taxInfo.rate);
             if (this.taxInfo.is_active === false || this.taxInfo.is_active === "false") {
        this.taxInfo.is_active = 0;
      } else {
        this.taxInfo.is_active = 1;
      }
            this.callAPI(this.taxInfo);
          }, 2000);
          return true;
        } else {
          this.isFormSubmitted = false;
        }
      });
    },
    backToMainState() {
      this.$validator.reset();
      (this.isFormSubmitted = false),
        (this.isShowSubmitButton = true),
        (this.taxInfo = {
         name: "",
        rate: "",
        is_active: 1
        });

      $("#addTaxModal").modal("hide");
    },
    async callAPI(taxInfo) {
      let response = await this.$store.dispatch("settingsService/addNewTax", taxInfo);
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
          message: "Tax successfully saved!",
        };
        toaster.toasterType(notifParams);
        await this.$store.dispatch("settingsService/loadAllTaxes");
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