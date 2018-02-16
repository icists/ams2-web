<template>
  <div
    class="nav-bar"
    :style="{ backgroundColor: color }"
  >
    <base-row>
      <slot/>
    </base-row>
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

    components: {
      BaseRow: () => import('./BaseRow'),
    },
  };
</script>

<style scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1rem 0;
  }
</style>
