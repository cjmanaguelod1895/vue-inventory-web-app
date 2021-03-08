<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="addUnitOfMeasuresModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Unit of Measures</h4>
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
                  'has-danger': errors.has('unit_code'),
                }"
              >
                <label for="name" class="bmd-label-floating">Code</label>
                <input
                  v-validate="'required'"
                  name="unit_code"
                  v-model="unitOfMeasuresInfo.unit_code"
                  type="text"
                  class="form-control"
                />
                <label
                  id="unit_code-error"
                  v-show="errors.has('unit_code')"
                  :class="{ error: errors.has('unit_code') }"
                  for="unit_code"
                  >Code is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('unit_Name'),
                }"
              >
                <label for="unit_Name" class="bmd-label-floating"
                  >Unit Name</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="unitOfMeasuresInfo.unit_Name"
                  class="form-control"
                />
                <label
                  id="unit_Name-error"
                  v-show="errors.has('unit_Name')"
                  :class="{ error: errors.has('unit_Name') }"
                  for="unit_Name"
                  >Unit Name is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('base_unit'),
                }"
              >
                <label for="base_unit" class="bmd-label-floating"
                  >Base Unit</label
                >
                <input
                  type="number"
                  v-validate="'required'"
                  v-model="unitOfMeasuresInfo.base_unit"
                  class="form-control"
                  id="base_unit"
                  name="base_unit"
                />
                <label
                  id="base_unit-error"
                  v-show="errors.has('base_unit')"
                  :class="{ error: errors.has('base_unit') }"
                  for="base_unit"
                  >Base Unit is required.</label
                >
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('operator'),
                }"
              >
                <label for="operator" class="bmd-label-floating"
                  >Operator</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="unitOfMeasuresInfo.operator"
                  class="form-control"
                />
                <label
                  id="operator-error"
                  v-show="errors.has('operator')"
                  :class="{ error: errors.has('operator') }"
                  for="operator"
                  >Operator is required.</label
                >
              </div>
            </div>
            <div class="col-md-4">
              <div
                :class="{
                  'form-group bmd-form-group': true,
                  'has-danger': errors.has('operation_value'),
                }"
              >
                <label for="operation_value" class="bmd-label-floating"
                  >Operation Value</label
                >
                <input
                  type="text"
                  v-validate="'required'"
                  v-model="unitOfMeasuresInfo.operation_value"
                  class="form-control"
                />
                <label
                  id="operation_value-error"
                  v-show="errors.has('operation_value')"
                  :class="{ error: errors.has('operation_value') }"
                  for="operation_value"
                  >Operation Value is required.</label
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
                    v-model="unitOfMeasuresInfo.is_active"
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
          <br />
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
      unitOfMeasuresInfo: {
        unit_code: "",
        unit_Name: "",
        base_unit: 0,
        operator: "",
        operation_value: 1,
        is_active: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      //roles: "settingsService/getRoles",
    }),
    ...mapActions({
      //loadAllUsers: "users/loadAllUsers",
    }),
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
          setTimeout(() => {
            this.unitOfMeasuresInfo.base_unit = parseInt(
              this.unitOfMeasuresInfo.base_unit
            );
             this.unitOfMeasuresInfo.operation_value = parseInt(
              this.unitOfMeasuresInfo.operation_value
            );
            if (
              this.unitOfMeasuresInfo.is_active === false ||
              this.unitOfMeasuresInfo.is_active === "false"
            ) {
              this.unitOfMeasuresInfo.is_active = 0;
            } else {
              this.unitOfMeasuresInfo.is_active = 1;
            }
            this.callAPI(this.unitOfMeasuresInfo);
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
        (this.unitOfMeasuresInfo = {
          unit_code: "",
          unit_Name: "",
          base_unit: 0,
          operator: "",
          operation_value: 1,
          is_active: 0,
        });
      $("#addUnitOfMeasuresModal").modal("hide");
    },
    async callAPI(unitOfMeasuresInfo) {
      let response = await this.$store.dispatch(
        "settingsService/addNewUnitOfMeasures",
        unitOfMeasuresInfo
      );
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
          message: "Unit of Measures successfully saved!",
        };
        toaster.toasterType(notifParams);
        await this.$store.dispatch("settingsService/loadAllUnitOfMeasures");
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