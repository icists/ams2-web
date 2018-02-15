<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1"><a href="#">{{title}}</a></el-menu-item>
        <el-menu-item class="float-right" index="2">{{name}}</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        title: 'ICISTS 2018',
        name: 'Park Junwoo',
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<style scoped>
  .el-header {
    color: #333;
    line-height: 60px;
  }
  .float-right {
    float: right;
  }
</style>
