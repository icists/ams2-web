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
    letter-spacing: -0.2px;
    margin: 0.4rem;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    display: inline-block;

    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
</style>
