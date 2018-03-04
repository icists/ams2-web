<template>
  <el-switch
    :value="value"
    @input="updateValue($event)"
    :active-color="colors.green"
    :active-text="active_text"
  >
  </el-switch>
</template>


<script>
  export default {
    name: 'SwitchInput',

    props: {
      value: {
        type: Boolean,
        required: true,
      },
      active_text: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        colors: this.$store.state.colors,
      };
    },

    methods: {
      updateValue(value) {
        this.$emit('input', value);
      },
    },
  };
</script>
