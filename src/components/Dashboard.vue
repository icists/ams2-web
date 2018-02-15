<template>
  <div class="main">
    <app-header :text="welcome_msg"></app-header>
    <app-button color="blue" link="/registrations/"></app-button>`
    <br/>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        welcome_msg: 'Welcome to ICISTS 2018',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
