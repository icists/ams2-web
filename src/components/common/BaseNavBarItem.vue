<template>
  <router-link
    class="nav-bar-item"
    :class="{ right, bold }"
    :to="to"
  >
    <slot v-if="text === ''"/>
    {{text}}
  </router-link>
</template>

<script>
  export default {
    name: 'BaseNavBarItem',
    props: {
      to: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        default: '',
      },
      right: {
        type: Boolean,
        default: false,
      },
      bold: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>
  .nav-bar-item {
    font-size: 1.1rem;
    margin: 0 1rem;
    text-decoration: none;
    color: white;
    letter-spacing: -0.5px;
  }

  .right {
    float: right;
  }

  .bold {
    font-weight: bold;
  }
</style>
