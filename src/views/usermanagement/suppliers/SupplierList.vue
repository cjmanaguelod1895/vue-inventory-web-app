<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary card-header-icon">
        <div class="card-icon">
          <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title">Supplier List</h4>
      </div>
      <CoolLightBox 
      :items="supplierImages" 
      :index="index"
      @close="index = null">
    </CoolLightBox>
      <vue-bootstrap4-table
        :rows="suppliers"
        :columns="columns"
        :config="config"
        :totalRows="total_rows"
        :actions="actions"
        @on-download="addNewSupplier"
        @refresh-data="onRefreshData"
      >
        <template slot="empty-results"> No Supplier found.. </template>
        <template slot="action-slot" slot-scope="props">
          <a data-original-title="Edit Task" title="Edit" @click="editSupplierDetails(props.row)" class="btn btn-link btn-primary btn-just-icon like"><i class="material-icons">edit</i><div class="ripple-container"></div></a>
          <!-- <a v-show="props.row.image !== null"  data-original-title="View Image" title="View Image" @click="index = props.row.supplierImageIndex" class="btn btn-link btn-success btn-just-icon like"><i class="material-icons" >remove_red_eye</i><div class="ripple-container"></div></a> -->
          <a data-original-title="Remove" title="Remove" @click="deleteSupplierDetails(props.row)" class="btn btn-link btn-danger btn-just-icon like"><i class="material-icons">close</i><div class="ripple-container"></div></a>
        </template>
      </vue-bootstrap4-table>
    </div>
    <!-- Modal -->
    <AddNewSupplierModal></AddNewSupplierModal>  
    <EditSupplierModal></EditSupplierModal>
  </div>
</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
const AddNewSupplierModal = () => import ('../../modals/usermanagement/supplier/AddNewSupplierModal');
const EditSupplierModal = () => import ('../../modals/usermanagement/supplier/EditSupplierModal');

export default {
  components: {
    VueBootstrap4Table,
    AddNewSupplierModal,
    EditSupplierModal,
  },
  computed: {
    ...mapState({
      suppliers: (state) => state.suppliers.suppliers,
      supplierImages: (state) => state.suppliers.supplierImages
    }),
    ...mapGetters({
    //   getRoles: "settingsService/getRoles",
    }),
  },
  data: function() {
    return {
      index: null,
      rows: [],
      columns: [
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
          btn_text: "Add New Supplier",
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
  // mounted() {
  //   this.onRefreshData();
  // },
  methods: {
    addNewSupplier() {
      $("#addSupplierModal").modal({
        backdrop: "static",
      });
    },
    editSupplierDetails(rowData) {
      $("#editSupplierModal").modal({
        backdrop: "static",
      });
      this.$store.dispatch("suppliers/getSupplier", rowData.id);
    },
   async deleteSupplierDetails(rowData) {
     let confirmation = confirm("Are you sure you want to delete this supplier?");
     
     if (confirmation) {
       let response = await this.$store.dispatch("suppliers/deleteSupplier", rowData.id);
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
          message: "Supplier successfully deleted!",
        };
        toaster.toasterType(notifParams);
         setTimeout(() => {
           this.onRefreshData();
         }, 2000); 
      }
     }
      
    },
    onRefreshData() {
      this.$store.dispatch("suppliers/loadAllSuppliers");
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