<template>
  <div class="cardboard rejected">
    <h2>{{ header }}</h2>

  </div>

</template>

<script>
  export default {
    name: 'CardBoard',

    data() {
      return {
        header: 'Accepted',
        comment: 'Congratulations',
        choices: ['Review Application', 'Order'],
      };
    },
  };
</script>

<style scoped>
  .cardboard {
    font-size: 1rem;
    font-weight: bold;
    margin: 0.4rem;
    padding: 1rem 2rem;
    text-decoration: none;
    color: white;
    display: inline-block;
  }

  .accepted {
    background-color: #2aaf1d;
  }

  .waiting {
    background-color: #f3b352;
  }

  .rejected {
    background-color: #d8453d;
  }
</style>
