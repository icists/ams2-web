<template>
  <h1
    class="header"
    :style="style"
  >
    <span v-if="chunks">
      <span v-for="chunk in chunks">
        {{chunk}}
        <br class="rwd-break">
      </span>
    </span>
    <span v-else>
    {{text}}
    </span>
  </h1>
</template>

<script>
  export default {
    name: 'BaseHeader',

    props: {
      text: {
        type: String,
        required: true,
      },
      chunks: {
        type: Array,
        required: false,
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
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: bolder;
    margin-top: 0.67em;
  }

  .lg .rwd-break {
    display: none;
  }
</style>
