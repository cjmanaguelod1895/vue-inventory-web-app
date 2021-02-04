<template>
          <div class="row">
        <div
          class="col-lg-4 col-md-6"
          v-for="item in userProfileListData"
          :key="item.id"
        >
          <div class="card card-profile">
            <div class="card-avatar">
              <a href="#pablo">
                <img class="img" :src="item.url" />
              </a>
            </div>
            <div class="card-body">
              <h6 class="card-category text-gray">{{ item.role }}</h6>
              <h4 class="card-title">{{ item.name }}</h4>
              <p class="card-description">
                {{ item.description }}
              </p>
              <a href="#pablo" class="btn btn-rose btn-round">Follow</a>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      // userProfileListData: [
      //   {
      //     name: "Roy Liwanag",
      //     position: "CEO",
      //     description:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      //     url: "../../../static/img/tito_roy.jpg",
      //   },
      //   {
      //     name: "Roie Liwanag",
      //     position: "CO-CEO",
      //     description:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      //     url: "../../../../static/img/roie.jpg",
      //   },
      //   {
      //     name: "CJ Managuelod",
      //     position: "Web Developer",
      //     description:
      //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      //     url: "../../../../static/img/cj.jpg",
      //   },
      // ],
    };
  },
  methods: {},
    computed: {
      ...mapState({
        userProfileListData: state => state.users.users
      })
    },
  
};
</script>