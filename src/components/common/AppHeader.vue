<template>
  <h1
    class="header"
    :style="style"
  >
    {{text}}
  </h1>
</template>

<script>
  export default {
    name: 'AppHeader',

    props: {
      text: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: '#000',
      },
      size: {
        type: Number,
        default: 2,
      },
    },

    data() {
      return {
        style: {
          color: this.color,
          fontSize: `${this.size}rem`,
        },
      };
    },
  };
</script>

<style scoped>
  .header {
    letter-spacing: -0.8px;
    font-weight: bolder;
  }
</style>
