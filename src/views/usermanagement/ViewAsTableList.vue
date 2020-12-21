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
        
      >
        <template slot="action-slot" slot-scope="props">
          <button
            type="button"
            title=""
            class="btn btn-primary btn-link btn-sm"
            data-original-title="Edit Task"
            @click="onEdit(props.row)"
          >
            <i class="material-icons">edit</i>
            <div class="ripple-container"></div>
          </button>
          <button
            type="button"
            rel="tooltip"
            title=""
            class="btn btn-danger btn-link btn-sm"
            data-original-title="Remove"
            @click="onDelete(props.row)"
          >
            <i class="material-icons">close</i>
          </button>
          
        </template>
      </vue-bootstrap4-table>
      <button class="btn btn-primary btn-round">
                        Classic modal
                      </button>
    </div>
  <!-- Modal -->
  <AddNewUserModal></AddNewUserModal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "../../services/CrudDataServices";
import AddNewUserModal from "../modals/AddNewUserModal";
export default {
  components: {
    VueBootstrap4Table,
    AddNewUserModal
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
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
        },
        {
          label: "Age",
          name: "age",
          sort: true,
        },
        {
          label: "Address",
          name: "address",
          sort: true,
        },
        {
          label: "Email Address",
          name: "emailAddress",
          sort: true,
        },
        {
          label: "Username",
          name: "username",
          sort: true,
        },
        {
          label: "Role",
          name: "role",
          sort: true,
        },
        {
          label: "Actions",
          name: "",
          slot_name: "action-slot",
        },
      ],
      actions: [
        {
          btn_text: "Add New User",
          event_name: "on-download",
          class: "btn btn-primary my-custom-class",
          event_payload: {
    
          },
        },
      ],
      config: {
        card_mode: false,
        selected_rows_info: false,
        pagination: true,
        pagination_info: true,
        num_of_visibile_pagination_buttons: 7,
        per_page: 10,
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
      total_rows: 0,
    };
  },
  mounted() {
    this.$store.dispatch("users/loadCurrent");
    this.$store.dispatch("users/loadAllUsers");
  },
  methods: {
    addNewUser() {
    $("#myModalt").modal({
      backdrop:'static'
    });

    },
    onEdit(row) {
      alert("on edit clicked");
      console.log(row);
    },
    onDelete(row) {
      alert("on delete clicked");
      console.log(row);
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
</style>