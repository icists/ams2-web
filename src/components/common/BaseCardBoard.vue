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
    font-weight: bold;
    margin-bottom: 3rem;
    padding: 0.5rem 1rem 1rem;
    text-decoration: none;
    display: block;
    overflow: auto;
  }
</style>
