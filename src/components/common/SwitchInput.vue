<template>
  <el-switch
    v-model="value"
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
  };
</script>
