<template>
  <div class="wrapper">
    <!-- SideBar -->
    <SideBar></SideBar>
    <div class="main-panel">
      <!-- NavBar -->
      <NavBar></NavBar>
      <div class="content">
        <!-- <transition name="view"> -->
        <router-view />
        <!-- </transition> -->
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
<style>
/* .view-enter-active, .view-leave-active {
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
} */
</style>