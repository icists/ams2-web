<template>
  <div>
    <div class="before"></div>
    <mq-layout mq="xs" class="row xs">
      <slot/>
    </mq-layout>
    <mq-layout mq="sm" class="row sm">
      <slot/>
    </mq-layout>
    <mq-layout mq="md" class="row md">
      <slot/>
    </mq-layout>
    <mq-layout mq="lg" class="row lg">
      <slot/>
    </mq-layout>
    <div class="after"></div>
  </div>
</template>

<script>
  export default {
    name: 'BaseRow',
  };
</script>

<style scoped>
  .row {
    max-width: 1000px;
    zoom: 1;
    margin: auto;
  }

  .before {
    display: table;
  }

  .after {
    clear: both;
    display: table;
  }

  .xs {
    padding-left: 0;
    padding-right: 0;
  }

  .sm {
    padding-left: 2%;
    padding-right: 2%;
  }

  .md {
    padding-left: 5%;
    padding-right: 5%;
  }

  .lg {
    padding-left: 5%;
    padding-right: 5%;
  }
</style>
