<template>
  <div class="content">
    <div class="container-fluid">
      <div class="page-categories">
        <h3 class="title text-center">Settings</h3>
        <br />
        <ul
          class="nav nav-pills nav-pills-warning nav-pills-icons justify-content-center"
          role="tablist"
        >
          <li class="nav-item">
            <a class="nav-link active show" data-toggle="tab" href="#brand" role="tablist">
              <i class="material-icons">dynamic_form</i> Brand
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#unitOfMeasures" role="tablist">
              <i class="material-icons">grid_4x4</i> Units
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#currency" role="tablist">
              <i class="material-icons">attach_money</i> Currencies
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#tax"
              role="tablist"
            >
              <i class="material-icons">money</i> Tax
            </a>
          </li>
        </ul>
        <div class="tab-content tab-space tab-subcategories">
          <div class="tab-pane active show" id="brand">
            <BrandList></BrandList>
            
          </div>
          <div class="tab-pane" id="unitOfMeasures">
            <UnitOfMeasuresList></UnitOfMeasuresList>
          </div>
          <div class="tab-pane" id="currency">
            <br><br>
            <!-- <BillerList></BillerList> -->
          </div>
          <div class="tab-pane" id="tax">
             <!-- <SupplierList></SupplierList> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BrandList from "../settings/brands/BrandList";
import UnitOfMeasuresList from "../settings/units/UnitOfMeasuresList";
// import BillerList from "../usermanagement/billers/BillerList";
// import SupplierList from "../usermanagement/suppliers/SupplierList";
export default {
  components: {
    BrandList,
    UnitOfMeasuresList,
    // CustomerList,
    // SupplierList
  },
  data() {
    return {};
  },
  methods: {},
};
</script>