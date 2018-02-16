<template>
  <router-link
    :to="link"
    class="button"
    :style="outline ? styles.outline : styles.solid"
  >
    <slot/>
  </router-link>
</template>

<script>
  export default {
    name: 'BaseButton',

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
    font-size: 1.3rem;
    font-weight: bolder;
    margin: 0.4rem;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    display: inline-block;
    float: right;
  }
</style>
