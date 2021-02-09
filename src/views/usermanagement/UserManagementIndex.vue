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
            <a class="nav-link active show" data-toggle="tab" href="#link1" role="tablist">
              <i class="material-icons">supervised_user_circle</i> User
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#link2" role="tablist">
              <i class="material-icons">supervisor_account</i> Customer
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#link3" role="tablist">
              <i class="material-icons">account_box</i> Biller
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#link10"
              role="tablist"
            >
              <i class="material-icons">backup_table</i> Supplier
            </a>
          </li>
        </ul>
        <div class="tab-content tab-space tab-subcategories">
          <div class="tab-pane active show" id="link1">
            <UserList></UserList>
          </div>
          <div class="tab-pane" id="link2">
            <CustomerList></CustomerList>
          </div>
          <div class="tab-pane" id="link3">
            <br><br>
            <BillerList></BillerList>
          </div>
          <div class="tab-pane" id="link10">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Help center</h4>
                <p class="card-category">More information here</p>
              </div>
              <div class="card-body">
                From the seamless transition of glass and metal to the
                streamlined profile, every detail was carefully considered to
                enhance your experience. So while its display is larger, the
                phone feels just right.
                <br />
                <br />
                Another Text. The first thing you notice when you hold the phone
                is how great it feels in your hand. The cover glass curves down
                around the sides to meet the anodized aluminum enclosure in a
                remarkable, simplified design.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BillerList from "../usermanagement/billers/BillerList";
import CustomerList from "../usermanagement/customer/CustomerList";
import UserList from "../usermanagement/users/UserList";
export default {
  components: {
    BillerList,
    UserList,
    CustomerList
  },
  data() {
    return {};
  },
  methods: {},
};
</script>