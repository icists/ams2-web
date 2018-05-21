<template>
  <div
    class="nav-bar"
    :style="{ backgroundColor: color }"
  >
    <sui-container text>
      <slot/>
    </sui-container>
  </div>
</template>

<script>
  export default {
    name: 'BaseNavBar',
    props: {
      color: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1rem 0;

    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);

    z-index: 3;
  }
</style>
