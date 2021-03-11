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
                     <!-- <transition name="view"> -->
          <div class="tab-pane active show" id="brand">
            <BrandList></BrandList>

            
          </div>
                      <!-- </transition> -->
          <div class="tab-pane" id="unitOfMeasures">
            <UnitOfMeasuresList></UnitOfMeasuresList>
          </div>
          <div class="tab-pane" id="currency">
            <br><br>
            <CurrenciesList></CurrenciesList>
          </div>
          <div class="tab-pane" id="tax">
             <TaxList></TaxList>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
const BrandList = () => import ('../settings/brands/BrandList');
const UnitOfMeasuresList = () => import ('../settings/units/UnitOfMeasuresList');
const CurrenciesList = () => import ('../settings/currencies/CurrenciesList');
const TaxList = () => import ('../settings/taxes/TaxList');

export default {
  components: {
    BrandList,
    UnitOfMeasuresList,
    CurrenciesList,
    TaxList
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.view-enter-active, .view-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}
.view-enter-active {
  transition-delay: 0.5s;
}
.view-enter {
  opacity: 0;
  transform: translateY(-100px);
}
.view-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.view-leave {
  opacity: 1;
  transform: translateY(0px);
}
.view-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>