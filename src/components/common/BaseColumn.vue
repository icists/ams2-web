<template>
  <div>
    <mq-layout mq="xs" class="col" :style="{ width: getWidth(xs) }">
      <slot/>
    </mq-layout>
    <mq-layout mq="sm" class="col" :style="{ width: getWidth(sm) }">
      <slot/>
    </mq-layout>
    <mq-layout mq="md" class="col" :style="{ width: getWidth(md) }">
      <slot/>
    </mq-layout>
    <mq-layout mq="lg" class="col" :style="{ width: getWidth(lg) }">
      <slot/>
    </mq-layout>
  </div>
</template>

<script>
  export default {
    name: 'BaseColumn',

    props: {
      xs: {
        type: Number,
        required: true,
      },
      sm: {
        type: Number,
        required: true,
      },
      md: {
        type: Number,
        required: true,
      },
      lg: {
        type: Number,
        required: true,
      },
    },

    methods: {
      getWidth(numCol) {
        return `${((25 / 3) * numCol) - 2}%`;
      },
    },
  };
</script>

<style scoped>
  .col {
    margin: 0.8% 1%;
    float: left;
  }
</style>
