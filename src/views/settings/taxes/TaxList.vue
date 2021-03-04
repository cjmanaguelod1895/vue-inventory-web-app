<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary card-header-icon">
        <div class="card-icon">
          <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title">Tax List</h4>
      </div>
      <!-- <CoolLightBox 
      :items="billerImages" 
      :index="index"
      @close="index = null">
    </CoolLightBox> -->
      <vue-bootstrap4-table
        :rows="taxes"
        :columns="columns"
        :config="config"
        :totalRows="total_rows"
        :actions="actions"
        @on-download="addNewTax"
        @refresh-data="onRefreshData"
      >
        <template slot="empty-results"> No Tax found.. </template>
        <template slot="action-slot" slot-scope="props">
          <a data-original-title="Edit Task" title="Edit" @click="editTaxDetails(props.row)" class="btn btn-link btn-primary btn-just-icon like"><i class="material-icons">edit</i><div class="ripple-container"></div></a>
          <a data-original-title="Remove" title="Remove" @click="deleteTaxDetails(props.row)" class="btn btn-link btn-danger btn-just-icon like"><i class="material-icons">close</i><div class="ripple-container"></div></a>
        </template>
      </vue-bootstrap4-table>
    </div>
    <!-- Modal -->
    <AddNewTaxModal></AddNewTaxModal>  
    <EditTaxModal></EditTaxModal>

  </div>
</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
import AddNewTaxModal from "../../modals/settings/tax/AddNewTaxModal";
import EditTaxModal from "../../modals/settings/tax/EditTaxModal";
export default {
  components: {
    VueBootstrap4Table,
    AddNewTaxModal,
    EditTaxModal,
  },
  computed: {
    ...mapState({
      taxes: (state) => state.settingsService.taxes
    })
  },
  data: function() {
    return {
      index: null,
      rows: [],
      columns: [
         {
          label: "Tax Name",
          name: "name",
          sort: true,
        },
        {
          label: "Rate",
          name: "rate",
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
          btn_text: "Add New Tax",
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
    addNewTax() {
      $("#addTaxModal").modal({
        backdrop: "static",
      });
    },
    editTaxDetails(rowData) {
      $("#editTaxModal").modal({
        backdrop: "static",
      });
      
      this.$store.dispatch("settingsService/getTax", rowData.id);
    },
   async deleteTaxDetails(rowData) {
     let confirmation = confirm("Are you sure you want to delete this Tax?");
     
     if (confirmation) {
       let response = await this.$store.dispatch("settingsService/deleteTax", rowData.id);
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
          message: "Tax successfully deleted!",
        };
        toaster.toasterType(notifParams);
         setTimeout(() => {
           this.$store.dispatch("settingsService/loadAllTaxes");
         }, 2000); 
      }
     }
      
    },
    onRefreshData() {
      this.$store.dispatch("settingsService/loadAllTaxes");
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