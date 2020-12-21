<template>
  <!-- Classic Modal -->
  <div
    class="modal fade"
    id="myModalt"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New User</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            <i class="material-icons">clear</i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group bmd-form-group">
                <label for="name" class="bmd-label-floating">Name</label>
                <input type="text" class="form-control" id="name" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group bmd-form-group">
                <label for="address" class="bmd-label-floating">Address</label>
                <input type="text" class="form-control" id="address" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group bmd-form-group" style="margin-top: 2px;">
  <select class="form-control" id="sel1">
      <option>Select Role</option>
    <option>Admin</option>
    <option>Cashier</option>
    <option>Staff</option>
  </select>
</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-group bmd-form-group">
                <label for="age" class="bmd-label-floating">Age</label>
                <input type="number" class="form-control" id="age" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group bmd-form-group">
                <label for="emailAddress" class="bmd-label-floating"
                  >Email Address</label
                >
                <input type="email" class="form-control" id="emailAddress" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group bmd-form-group">
                <label for="userName" class="bmd-label-floating"
                  >Username</label
                >
                <input type="text" class="form-control" id="userName" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link">Nice Button</button>
          <button
            type="button"
            class="btn btn-danger btn-link"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      isFormSubmitted: false,
      isShowLoginButton: true,
      showPassword: false,
      loginInfo: {
        userName: "",
        password: "",
      },
    };
  },
};
</script>