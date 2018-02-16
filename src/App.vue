<template>
  <div id="app">
    <base-nav-bar :color="colors.icistsBlue">
      <base-nav-bar-item
        to="/"
        text="ICISTS 2018"
        bold
      />
      <base-nav-bar-item
        to="/dashboard"
        text="Gunwoo Kim"
        right
      />
    </base-nav-bar>
    <router-view id="router-view"/>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data() {
      return {
        colors: {
          icistsBlue: '#09073B',
        },
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
    margin-top: 5rem;
  }
</style>
