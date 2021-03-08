<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card card-profile">
        <div class="card-avatar">
          <a href="#pablo">
            <img class="img" :src="defaultImage" />
          </a>
        </div>
        <div class="card-body">
          <h6 class="card-category text-gray">CEO / Co-Founder</h6>
          <h4 class="card-title">{{getCurrentUserLoggedIn.name}}</h4>
          <p class="card-description">
            Don't be scared of the truth because we need to restart the human
            foundation in truth And I love you like Kanye loves Kanye I love
            Rick Owens’ bed design but the back is...
          </p>
          <a href="#pablo" class="btn btn-primary btn-round">Follow</a>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card">
        <div class="card-header card-header-icon card-header-primary">
          <div class="card-icon">
            <i class="material-icons">perm_identity</i>
          </div>
          <h4 class="card-title">
            Edit Profile -
            <small class="category">Complete your profile</small>
          </h4>
        </div>
        <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group bmd-form-group is-filled">
                  <label class="bmd-label-floating">Name</label>
                  <input type="text" class="form-control" v-model="getForEditUserLoggedIn.name" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group bmd-form-group is-filled">
                  <label class="bmd-label-floating">Username</label>
                  <input type="text" class="form-control" name="currentUserLoggedInUserName" id="currentUserLoggedInUserName" v-model="getForEditUserLoggedIn.username" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group bmd-form-group is-filled">
                  <label class="bmd-label-floating">Company Name</label>
                  <input type="text" class="form-control" v-model="getForEditUserLoggedIn.company_Name" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group bmd-form-group is-filled">
                  <label class="bmd-label-floating">Email Address</label>
                  <input type="email" class="form-control" v-model="getForEditUserLoggedIn.email" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="form-group bmd-form-group is-filled">
                  <label class="bmd-label-floating">Phone</label>
                  <input type="text" class="form-control" v-model="getForEditUserLoggedIn.phone" />
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group bmd-form-group is-filled">
                  <label class="bmd-label-floating">Role</label>
                  <input type="text" class="form-control" v-model="getForEditUserLoggedIn.role" disabled />
                </div>
              </div>
                 <div class="col-md-4">
                 <div class="form-check mr-auto" style="margin-top: 25px">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_active"
                    v-model="getForEditUserLoggedIn.is_active"
                    checked
                    required=""
                    aria-required="true" disabled
                  />
                  {{ getForEditUserLoggedIn.is_active == 1 ? "Active" : "Deactivated"   }}
                  <span class="form-check-sign">
                    <span class="check"></span>
                  </span>
                </label>
              </div>
            </div>
            </div>
                     <br>
            <div class="loader pull-right" v-show="isFormSubmitted"></div>
          <button
            class="btn btn-info pull-right"
            @click.prevent="submit"
            v-show="isShowSubmitButton"
            style="background: linear-gradient(60deg, #0b52b5, #8e24aa)"
          >
             Update Profile
          </button>
            <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toaster } from "@/utils/toaster.js";
import { mapState, mapActions, mapGetters } from "vuex";
import VueBootstrap4Table from "vue-bootstrap4-table";
import CrudDataServices from "@/services/CrudDataServices";
export default {
  components: {
    VueBootstrap4Table,
  },
  computed: {
    ...mapGetters({
      getForEditUserLoggedIn: 'users/getForEditUser',   
      getCurrentUserLoggedIn: 'users/getCurrentUser',
    }),
  },
  data: function () {
    return {
        isFormSubmitted: false,
      isShowSubmitButton: true,
        defaultImage: "/static/img/image_placeholder.jpg"
    };
  },
  mounted() {
      
  },
  methods: {
       submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isFormSubmitted = true;
          this.isShowSubmitButton = false;
          setTimeout(() => {
            this.callAPI(this.getForEditUserLoggedIn);
          }, 2000);
          return true;
        } else {
          this.isFormSubmitted = false;
        }
      });
       },
       async callAPI(getForEditUserLoggedIn) {
      let response = await this.$store.dispatch(
        "users/updateUser",
        getForEditUserLoggedIn
      );
      if (response.isError) {
        let notifParams = {
          type: "error",
          title: "Error",
          message: response.errorMessage,
        };
        toaster.toasterType(notifParams);
        this.isFormSubmitted = false;
        this.isShowSubmitButton = true;
      } else {
        let notifParams = {
          type: "success",
          title: "Success",
          message: "Profile successfully updated!",
        };
        toaster.toasterType(notifParams);
        this.isFormSubmitted = false;
        this.isShowSubmitButton = true;
        this.$store.dispatch("users/loadAllUsers");
        this.$store.dispatch("users/updateCurrentUser", getForEditUserLoggedIn);
        this.$store.dispatch("users/getUser", getForEditUserLoggedIn.id);
      }
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