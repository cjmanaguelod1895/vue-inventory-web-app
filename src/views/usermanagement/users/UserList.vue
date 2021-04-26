<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary card-header-icon">
        <div class="card-icon">
          <i class="material-icons">assignment</i>
        </div>
        <h4 class="card-title">User List</h4>
      </div>
      <vue-bootstrap4-table
        :rows="users"
        :columns="columns"
        :config="config"
        :totalRows="total_rows"
        :actions="actions"
        @on-download="addNewUser"
        @refresh-data="onRefreshData"
      >
        <template slot="empty-results"> No Users found.. </template>
        <template slot="action-slot" slot-scope="props">
          <a data-original-title="Edit Task" title="Edit" @click="editUserDetails(props.row)" class="btn btn-link btn-primary btn-just-icon like"><i class="material-icons">edit</i><div class="ripple-container"></div></a>
          <a data-original-title="Remove" title="Remove" @click="deleteUserDetails(props.row)" class="btn btn-link btn-danger btn-just-icon like"><i class="material-icons">close</i><div class="ripple-container"></div></a>
        </template>
      </vue-bootstrap4-table>
    </div>
    <!-- Modal -->
    <AddNewUserModal></AddNewUserModal>
    <EditUserModal></EditUserModal>
  </div>
</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
const AddNewUserModal = () => import ('../../modals/usermanagement/users/AddNewUserModal');
const EditUserModal = () => import ('../../modals/usermanagement/users/EditUserModal');
export default {
  components: {
    VueBootstrap4Table,
    AddNewUserModal,
    EditUserModal,
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      roles: (state) => state.roles.roles,
    }),
    ...mapGetters({
      getRoles: "settingsService/getRoles",
    }),
  },
  data() {
    return {
      rows: [],
      columns: [
        {
          label: "Name",
          name: "name",
          sort: true,
          uniqueId: true,
        },
        {
          label: "Username",
          name: "username",
          sort: true,
        },
        {
          label: "Email",
          name: "email",
          sort: true,
        },
        {
          label: "Company Name",
          name: "company_Name",
          sort: true,
        },
        {
          label: "Role",
          name: "role",
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
          btn_text: "Add New User",
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
    addNewUser() {
      $("#addUserModal").modal({
        backdrop: "static",
      });
      // this.$store.dispatch("settingsService/loadAllRoles");
    },
    editUserDetails(rowData) {
      $("#editUserModal").modal({
        backdrop: "static",
      });
      this.$store.dispatch("users/getUser", rowData.id);
    },
   async deleteUserDetails(rowData) {
     let confirmation = confirm("Are you sure you want to delete this user?");
     
     if (confirmation) {
       NProgress.start();
       let response = await this.$store.dispatch("users/deleteUser", rowData.id);
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
          message: "User successfully deleted!",
        };
        setTimeout(() => {
           toaster.toasterType(notifParams);
           this.onRefreshData();
           NProgress.done();
         }, 2000); 
      }
     }
      
    },
    onRefreshData() {
      this.$store.dispatch("users/loadCurrent");
      this.$store.dispatch("users/loadAllUsers");
      this.$store.dispatch("settingsService/loadAllRoles");
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