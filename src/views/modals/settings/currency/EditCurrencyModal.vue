<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="editCurrencyModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Currency Details</h4>
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
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('code'),
                }"
              >
                <label for="code" class="bmd-label-floating"
                  >Code</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="forEditCurrency.code"
                  class="form-control"

                />
                <label
                  id="code-error"
                  v-show="errors.has('code')"
                  :class="{ error: errors.has('code') }"
                  for="code"
                  >Code is required. </label>
                
              </div>
            </div>
              <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('name'),
                }"
              >
                <label for="title" class="bmd-label-floating"
                  >Name</label
                >
                <input
                  type="text"
                  v-validate="'required|alpha_spaces'"
                  v-model="forEditCurrency.name"
                  class="form-control"
      
                />
                <label
                  id="name-error"
                  v-show="errors.has('name')"
                  :class="{ error: errors.has('name') }"
                  for="name"
                  >Name is required and may only contain alphabetic characters.</label>
                
              </div>
            </div>
            <div class="col-md-4">
                  <div
                :class="{
                  'form-group bmd-form-group is-focused': true,
                  'has-danger': errors.has('exchange_rate'),
                }"
              >
                <label for="title" class="bmd-label-floating"
                  >Exchange rate is required.</label
                >
                <input
                  type="number"
                  v-validate="'required'"
                  v-model="forEditCurrency.exchange_rate"
                  class="form-control"
                  id="exchange_rate"
                  name="exchange_rate"
                  min="0" value="0" step="0.01" pattern="^\d+(?:\.\d{1,2})?$" 
                />
                <label
                  id="exchange_rate-error"
                  v-show="errors.has('exchange_rate')"
                  :class="{ error: errors.has('exchange_rate') }"
                  for="exchange_rate"
                  >Exchange rate is required and must have at least 2 decimal value.</label>
                
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
      forEditCurrency: "settingsService/getForEditCurrency",
    }),
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
    
          setTimeout(() => {
          this.forEditCurrency.exchange_rate = parseFloat(this.forEditCurrency.exchange_rate);
          this.callAPI(this.forEditCurrency);
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
        (this.isShowSubmitButton = true);
      $("#editCurrencyModal").modal("hide");
    },
    async callAPI(forEditCurrency) {
      let response = await this.$store.dispatch("settingsService/updateCurrency", [
        this.forEditCurrency.id,
        forEditCurrency,
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
          message: "Currency successfully updated!",
        };
        toaster.toasterType(notifParams);
        await this.$store.dispatch("settingsService/loadAllCurrencies");
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