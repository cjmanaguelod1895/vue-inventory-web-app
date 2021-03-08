<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary card-header-icon">
        <div class="card-icon">
          <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title">Brand List</h4>
      </div>
      <!-- <CoolLightBox 
      :items="billerImages" 
      :index="index"
      @close="index = null">
    </CoolLightBox> -->
      <vue-bootstrap4-table
        :rows="brands"
        :columns="columns"
        :config="config"
        :totalRows="total_rows"
        :actions="actions"
        @on-download="addNewBrand"
        @refresh-data="onRefreshData"
      >
        <template slot="empty-results"> No Brands found.. </template>
        <template slot="action-slot" slot-scope="props">
          <a data-original-title="Edit Task" title="Edit" @click="editBrandDetails(props.row)" class="btn btn-link btn-primary btn-just-icon like"><i class="material-icons">edit</i><div class="ripple-container"></div></a>
          <a data-original-title="Remove" title="Remove" @click="deleteBrandDetails(props.row)" class="btn btn-link btn-danger btn-just-icon like"><i class="material-icons">close</i><div class="ripple-container"></div></a>
        </template>
      </vue-bootstrap4-table>
    </div>
    <!-- Modal -->
    <AddNewBrandModal></AddNewBrandModal>  
    <EditBrandModal></EditBrandModal>

  </div>

</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
const AddNewBrandModal = () => import ('../../modals/settings/brands/AddNewBrandModal');
const EditBrandModal = () => import ('../../modals/settings/brands/EditBrandModal');
export default {
  components: {
    VueBootstrap4Table,
    AddNewBrandModal,
    EditBrandModal,
  },
  computed: {
    ...mapState({
      brands: (state) => state.settingsService.brands
    }),
    ...mapGetters({
      getBrands: "settingsService/getBrands",
    }),
  },
  data: function() {
    return {
      index: null,
      rows: [],
      columns: [
         {
          label: "Brand Name",
          name: "title",
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
          btn_text: "Add New Brand",
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
    addNewBrand() {
      $("#addBrandModal").modal({
        backdrop: "static",
      });
    },
    editBrandDetails(rowData) {
      $("#editBrandModal").modal({
        backdrop: "static",
      });
      
      this.$store.dispatch("settingsService/getBrands", rowData.id);
    },
   async deleteBrandDetails(rowData) {
     let confirmation = confirm("Are you sure you want to delete this brand?");
     
     if (confirmation) {
       let response = await this.$store.dispatch("settingsService/deleteBrand", rowData.id);
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
          message: "Brand successfully deleted!",
        };
        toaster.toasterType(notifParams);
         setTimeout(() => {
           this.$store.dispatch("settingsService/loadAllBrands");
         }, 2000); 
      }
     }
      
    },
    onRefreshData() {
      this.$store.dispatch("settingsService/loadAllBrands");
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