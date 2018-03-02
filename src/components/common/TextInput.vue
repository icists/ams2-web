<template>
  <el-input :type="type" :rows="rows" placeholder="Please input"></el-input>
</template>


<script>
  export default {
    name: 'TextInput',

    props: {
      type: {
        type: String,
        required: true,
      },
      rows: {
        type: Number,
        required: true,
      },
    },
  };
</script>
