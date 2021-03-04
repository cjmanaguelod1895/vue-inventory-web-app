<template>
     <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-minimize">
              <button id="minimizeSidebar" class="btn btn-just-icon btn-white btn-fab btn-round">
                <i class="material-icons text_align-center visible-on-sidebar-regular" @click="makesideBarMini">more_vert</i>
                <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini" @click="makesideBarLarge">view_list</i>
              </button>
            </div>
            <a class="navbar-brand" href="javascript:;">Inventory Management System</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link" href="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="material-icons">person</i>
                  <p class="d-lg-none d-md-block">
                    Account
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
          <router-link :to="{ name: 'userProfileIndex' }" class="dropdown-item">
           Profile
          </router-link>
                  <a class="dropdown-item" href="#">Settings</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item"  @click="logoutUser">Log out</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{

    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  methods:{
    makesideBarMini(){
      $("body").addClass("sidebar-mini");
    },
    makesideBarLarge(){
       $("body").removeClass("sidebar-mini");
    },
    logoutUser() {
      setTimeout(() => {
      this.$store.dispatch("users/logout");
      this.$router.push("/");
      }, 1000);
    }
  }
}
</script>