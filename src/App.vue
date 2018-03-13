<template>
  <div id="app" v-if="$auth.ready()">
    <div>
      <base-nav-bar :color="colors.icistsBlue">
        <base-nav-bar-item
          to="/"
          text="ICISTS 2018"
          bold
        />
        <base-nav-bar-item
          v-if="$auth.check()"
          @click.native='logout()'
          to="/"
          text="Log Out"
          right
        />
        <base-nav-bar-item
          v-if="$auth.check()"
          to="/dashboard"
          :text="user.full_name"
          right
        />
      </base-nav-bar>
    </div>
    <router-view id="router-view"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'app',

    computed: mapGetters({
      user: 'user',
    }),

    methods: {
      logout() {
        this.$auth.logout({
          makeRequest: false,
          redirect: { path: '/login' },
        });
      },
    },

    data() {
      return {
        colors: this.$store.state.colors,
      };
    },

    components: {
      BaseNavBar: () => import('./components/common/BaseNavBar'),
      BaseNavBarItem: () => import('./components/common/BaseNavBarItem'),
    },
  };
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #router-view {
    margin-top: 8rem;
  }
</style>
