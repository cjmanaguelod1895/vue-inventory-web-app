<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-categories">
        <h3 class="title text-center">User Profile List</h3>
        <br />
        <ul
          class="nav nav-pills nav-pills-warning nav-pills-icons justify-content-center"
          role="tablist"
        >
          <li class="nav-item">
            <a class="nav-link active show" data-toggle="tab" href="#user" role="tablist">
              <i class="material-icons">supervised_user_circle</i> User
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#customer" role="tablist">
              <i class="material-icons">supervisor_account</i> Customer
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#biller" role="tablist">
              <i class="material-icons">account_box</i> Biller
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#supplier"
              role="tablist"
            >
              <i class="material-icons">backup_table</i> Supplier
            </a>
          </li>
        </ul>
        <div class="tab-content tab-space tab-subcategories">
          <div class="tab-pane active show" id="user">
            <UserList></UserList>
          </div>
          <div class="tab-pane" id="customer">
            <CustomerList></CustomerList>
          </div>
          <div class="tab-pane" id="biller">
            <br><br>
            <BillerList></BillerList>
          </div>
          <div class="tab-pane" id="supplier">
             <SupplierList></SupplierList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserList from "../usermanagement/users/UserList";
import CustomerList from "../usermanagement/customer/CustomerList";
import BillerList from "../usermanagement/billers/BillerList";
import SupplierList from "../usermanagement/suppliers/SupplierList";
export default {
  components: {
    BillerList,
    UserList,
    CustomerList,
    SupplierList
  },
  data() {
    return {};
  },
  methods: {},
};
</script>