<template>
  <el-input
    :type="type"
    :rows="rows"
    :value="value"
    @input="updateValue($event)"
    :placeholder="placeholder"
  ></el-input>
</template>


<script>
  export default {
    name: 'TextInput',

    props: {
      placeholder: {
        type: String,
      },
      type: {
        type: String,
        required: true,
      },
      rows: {
        type: Number,
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
