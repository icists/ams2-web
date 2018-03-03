<template>
  <div id="app">
    <div v-if="$auth.ready()">
      <base-nav-bar :color="colors.icistsBlue">
        <base-nav-bar-item
          to="/"
          text="ICISTS 2018"
          bold
        />
        <base-nav-bar-item
          to="/dashboard"
          :text="user.name"
          right
        />
      </base-nav-bar>
      <router-view id="router-view"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'app',

    computed: mapGetters({
      user: 'user',
    }),

    created() {
      this.$auth.login({
        data: { email: 'admin@icists.org', password: 'soloforever11' },
        rememberMe: true,
      })
        .then((res) => {
          console.log('success ', res);
          this.$auth.token(null, res.data.token);
          this.$store.dispatch('getUser');
          this.$store.dispatch('getApplication');
        }, (res) => {
          console.log('error ' + this.context);
          this.error = res.data;
        });
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
