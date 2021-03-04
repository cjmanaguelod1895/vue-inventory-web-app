<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary card-header-icon">
        <div class="card-icon">
          <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title">Unit of Measures List</h4>
      </div>
      <!-- <CoolLightBox 
      :items="billerImages" 
      :index="index"
      @close="index = null">
    </CoolLightBox> -->
      <vue-bootstrap4-table
        :rows="unitOfMeasures"
        :columns="columns"
        :config="config"
        :totalRows="total_rows"
        :actions="actions"
        @on-download="addNewUnitOfMeasures"
        @refresh-data="onRefreshData"
      >
        <template slot="empty-results"> No Unit of Measures found.. </template>
        <template slot="action-slot" slot-scope="props">
          <a data-original-title="Edit Task" title="Edit" @click="editUnitOfMeasuresDetails(props.row)" class="btn btn-link btn-primary btn-just-icon like"><i class="material-icons">edit</i><div class="ripple-container"></div></a>
          <!-- <a v-show="props.row.image !== null" data-original-title="View Image" title="View Image" @click="index = props.row.billerImageIndex" class="btn btn-link btn-success btn-just-icon like"><i class="material-icons" v-show="props.row.image !== null" >remove_red_eye</i><div class="ripple-container"></div></a>  -->
          <a data-original-title="Remove" title="Remove" @click="deleteUnitOfMeasuresDetails(props.row)" class="btn btn-link btn-danger btn-just-icon like"><i class="material-icons">close</i><div class="ripple-container"></div></a>
        </template>
      </vue-bootstrap4-table>
    </div>
    <!-- Modal -->
    <AddNewUnitOfMeasuresModal></AddNewUnitOfMeasuresModal>  
    <EditUnitOfMeasuresModal></EditUnitOfMeasuresModal>

  </div>
</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
import AddNewUnitOfMeasuresModal from "../../modals/settings/units/AddNewUnitOfMeasuresModal";
import EditUnitOfMeasuresModal from "../../modals/settings/units/EditUnitOfMeasuresModal";
export default {
  components: {
    VueBootstrap4Table,
    AddNewUnitOfMeasuresModal,
    EditUnitOfMeasuresModal,
  },
  computed: {
    ...mapState({
      unitOfMeasures: (state) => state.settingsService.unitOfMeasures
    }),
    ...mapGetters({
      getUnitOfMeasures: "settingsService/getUnitOfMeasures",
    }),
  },
  data: function() {
    return {
      index: null,
      rows: [],
      columns: [
         {
          label: "Code",
          name: "unit_code",
          sort: true,
        },
        {
          label: "Unit Name",
          name: "unit_Name",
          sort: true,
        },
        {
          label: "Base Unit",
          name: "base_unit",
          sort: true,
        },
        {
          label: "Operator",
          name: "operator",
          sort: true,
        },
           {
          label: "Operation Value",
          name: "operation_value",
          sort: true,
        },
          {
          label: "Status",
          name: "is_active",
          sort: true,
        },
         {
          label: "Date Created",
          name: "created_at",
          sort: true,
        },
        {
          label: "Actions",
          name: "",
          slot_name: "action-slot",
        }
      ],
      actions: [
        {
          btn_text: "Add New Unit of Measures",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {},
        },
      ],
      config: {
        card_mode: false,
        selected_rows_info: false,
        pagination: true,
        pagination_info: true,
        num_of_visibile_pagination_buttons: 7,
        per_page: 5,
        checkbox_rows: false,
        highlight_row_hover: true,
        rows_selectable: true,
        highlight_row_hover_color: "#d6d6d6",
        global_search: {
          placeholder: "Search",
          visibility: true,
          case_sensitive: false,
        },
        per_page_options: [5, 10, 20, 30],
        preservePageOnDataChange: true,
        show_reset_button: false,
        show_refresh_button: false,
      },
      total_rows: 5,
    };
  },
  mounted() {
    this.onRefreshData();
  },
  methods: {
    addNewUnitOfMeasures() {
      $("#addUnitOfMeasuresModal").modal({
        backdrop: "static",
      });
    },
    editUnitOfMeasuresDetails(rowData) {
      $("#editUnitOfMeasuresModal").modal({
        backdrop: "static",
      });
      
      this.$store.dispatch("settingsService/getUnitOfMeasures", rowData.id);
    },
   async deleteUnitOfMeasuresDetails(rowData) {
     let confirmation = confirm("Are you sure you want to delete this unit?");
     
     if (confirmation) {
       let response = await this.$store.dispatch("settingsService/deleteUnitOfMeasures", rowData.id);
      if (response.isError) {
        let notifParams = {
          type: "error",
          title: "Error",
          message: response.errorMessage,
        };
        toaster.toasterType(notifParams);
      } else {
        let notifParams = {
          type: "success",
          title: "Success",
          message: "Unit of Measures successfully deleted!",
        };
        toaster.toasterType(notifParams);
         setTimeout(() => {
           this.$store.dispatch("settingsService/loadAllUnitOfMeasures");
         }, 2000); 
      }
     }
      
    },
    onRefreshData() {
      this.$store.dispatch("settingsService/loadAllUnitOfMeasures");
    }
  },
};
</script>
<style>
.page-item {
  margin-top: 12px;
}
.text-right.justify-content-center {
  margin-top: 12px;
}
th.vbt-column-header.text-center.vbt-sort-cursor,
th.vbt-column-header.text-center {
  font-weight: bolder;
}
#dropdownMenuLink {
  background-color: #0b52b5;
}
</style>