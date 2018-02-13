<template>
  <a
    class="button"
    :href="link"
    :style="outline ? styles.outline : styles.solid"
  >
    Apply
  </a>
</template>

<script>
  export default {
    name: 'AppButton',

    props: {
      link: {
        type: String,
      },
      color: {
        type: String,
        required: true,
      },
      outline: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        styles: {
          solid: {
            color: '#FFF',
            backgroundColor: this.color,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
          },

          outline: {
            color: this.color,
            border: `2px solid ${this.color}`,
            background: 'transparent',
          },
        },
      };
    },
  };
</script>

<style scoped>
  .button {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.4rem;
    padding: 1rem 2rem;
    text-decoration: none;
    display: inline-block;
  }
</style>
