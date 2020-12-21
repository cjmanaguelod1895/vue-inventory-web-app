<template>
  <div class="wrapper">
    <!-- SideBar -->
    <SideBar></SideBar>
    <div class="main-panel">
      <!-- NavBar -->
      <NavBar></NavBar>
      <div class="content">
        <router-view />
      </div>
      <!-- Footer -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
 this.$store.dispatch('users/loadCurrent');
  },
  components: {
    SideBar: () => import(/* webpackChunkName: "sidebar" */ "./layout/Sidebar"),
    NavBar: () => import(/* webpackChunkName: "header" */ "./layout/NavBar"),
    Footer: () => import(/* webpackChunkName: "header" */ "./layout/Footer")
  }
};
</script>