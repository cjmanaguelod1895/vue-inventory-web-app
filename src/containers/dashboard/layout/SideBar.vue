<template>
  <div
    class="sidebar"
    data-color="rose"
    data-background-color="black"
    data-image="../assets/img/sidebar-1.jpg"
  >
    <div class="logo">
      <a href="#" class="simple-text logo-mini">  </a>
      <a href="#" class="simple-text logo-normal">
       IMS
      </a>
    </div>
    <div class="sidebar-wrapper">
      <div class="user">
        <div class="photo">
          <img src="static/img/cj.jpg" />
        </div>
        <div class="user-info">
          <a data-toggle="collapse" href="#collapseExample" class="username">
            <span>
              {{ currentUser.name }}
            </span>
          </a>
        </div>
      </div>
      <ul class="nav" v-for="item in sideBarRouteNames" :key="item.home">
        <li class="nav-item" v-if="currentUser.role === 'Admin'">
          <router-link :to="{ name: 'dashboard' }" class="nav-link">
            <i class="material-icons">dashboard</i>
            <p>{{ item.dashboard }}</p>
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.role === 'Admin'">
          <router-link :to="{ name: 'userManagementIndex' }" class="nav-link">
            <i class="material-icons">person</i>
            <p>{{ item.userManagement }}</p>
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.role === 'Admin'">
          <router-link :to="{ name: 'settingsIndex' }" class="nav-link">
            <i class="material-icons">build</i>
            <p>{{ item.settings }}</p>
          </router-link>
        </li>
        <li class="nav-item" v-if="currentUser.role === 'Cashier'">
          <router-link :to="{ name: 'cashierManagementIndex' }" class="nav-link" >
            <i class="material-icons">person</i>
            <p>{{ item.cashierManagement }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
   computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  data() {
    return {
      sideBarRouteNames: [
        {
          dashboard: "Dashboard",
          userManagement: "User Management",
          settings: "Settings",
          cashierManagement: "Cashier Management"
        },
      ],
    };
  },
};
</script>
<style  scoped>

.router-link-exact-active{
font-weight: 700;
 border-radius: 10px;
  font-variant: italic;
}

</style>