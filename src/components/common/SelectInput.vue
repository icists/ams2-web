<template>
  <el-select
    placeholder="Select"
    v-on:input="updateValue($event)"
    v-bind:value="value"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>


<script>
  export default {
    name: 'SelectInput',

    props: {
      options: {
        type: Array,
        required: true,
      },
      value: {
        required: true,
      },
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value);
      },
    },
  };
</script>
