<template>
  <div
    class="cardboard"
    :style="{ backgroundColor: color }"
  >
    <slot/>
  </div>

</template>

<script>
  export default {
    name: 'BaseCardBoard',

    props: {
      color: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .cardboard {
    font-size: 1rem;
    margin-bottom: 3rem;
    padding: 0.5rem 2rem 1rem;
    text-decoration: none;
    display: block;
    overflow: auto;

    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  }
</style>
