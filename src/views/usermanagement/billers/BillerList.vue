<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary card-header-icon">
        <div class="card-icon">
          <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title">Biller List</h4>
      </div>
      <vue-bootstrap4-table
        :rows="billers"
        :columns="columns"
        :config="config"
        :totalRows="total_rows"
        :actions="actions"
        @on-download="addNewBiller"
        @refresh-data="onRefreshData"
      >
        <template slot="empty-results"> No Billers found.. </template>
        <template slot="action-slot" slot-scope="props">
          <button
            type="button"
            title="Edit"
            class="btn btn-primary btn-link btn-sm"
            data-original-title="Edit Task"
            @click="editBillerDetails(props.row)"
          >
            <i class="material-icons">edit</i>
            <div class="ripple-container"></div>
          </button>
          <button
            type="button"
            rel="tooltip"
            title="Remove"
            class="btn btn-danger btn-link btn-sm"
            data-original-title="Remove"
            @click="deleteBillerDetails(props.row)"
          >
            <i class="material-icons">close</i>
          </button>
        </template>
      </vue-bootstrap4-table>
    </div>
    <!-- Modal -->
    <AddNewBillerModal></AddNewBillerModal>  
    <!-- <EditCustomerModal></EditCustomerModal> -->
  </div>
</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
import AddNewBillerModal from "../../modals/usermanagement/billers/AddNewBillerModal";
//import EditBillerModal from "../../modals/usermanagement/customer/EditBillerModal";
export default {
  components: {
    VueBootstrap4Table,
    AddNewBillerModal,
    //EditBillerModal,
  },
  computed: {
    ...mapState({
      billers: (state) => state.billers.billers
    }),
    ...mapGetters({
    //   getRoles: "settingsService/getRoles",
    }),
  },
  data() {
    return {
      rows: [],
      columns: [
        {
          label: "Image",
          name: "image",
          sort: true,
        },
        {
          label: "Name",
          name: "name",
          sort: true,
        },
         {
          label: "Company Name",
          name: "company_name",
          sort: true,
        },
        {
          label: "Email",
          name: "email",
          sort: true,
        },
        {
          label: "Phone Number",
          name: "phone_number",
          sort: true,
        },
        {
          label: "Vat Number",
          name: "vat_number",
          sort: true,
        },
        {
          label: "Address",
          name: "address",
          sort: true,
        },
         {
          label: "State",
          name: "state",
          sort: true,
        },
         {
          label: "City",
          name: "city",
          sort: true,
        },
         {
          label: "Postal Code",
          name: "postal_code",
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
          btn_text: "Add New Biller",
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
    addNewBiller() {
      $("#addBillerModal").modal({
        backdrop: "static",
      });
      //this.$store.dispatch("settingsService/loadGroupNames");
    },
    editBillerDetails(rowData) {
      $("#editBillerModal").modal({
        backdrop: "static",
      });
      this.$store.dispatch("billers/getBiller", rowData.id);
    },
   async deleteBillerDetails(rowData) {
     let confirmation = confirm("Are you sure you want to delete this biller?");
     
     if (confirmation) {
       let response = await this.$store.dispatch("billers/deleteBiller", rowData.id);
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
          message: "Biller successfully deleted!",
        };
        toaster.toasterType(notifParams);
         setTimeout(() => {
           this.$store.dispatch("billers/loadAllBillers");
         }, 2000); 
      }
     }
      
    },
    onRefreshData() {
      this.$store.dispatch("users/loadCurrent");
      this.$store.dispatch("billers/loadAllBillers");
    },
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