<template>
  <el-col :span="24">
    <el-menu default-active="2" class="el-menu-vertical-demo" router background-color="rgb(67, 74, 80)" text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu :index="index.toString()" v-for="(item,index) in navbar" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <!-- 二级分类 -->
        <el-menu-item :index="item.url" v-for="(item,index) in navbar[index].children" :key="index">{{item.title}}</el-menu-item>
      </el-submenu>

    </el-menu>
  </el-col>
</template>

<script>
  export default {
    computed: {
      navbar(){
        return this.$store.state.user.menus
      },
    },
  }

</script>

<style scoped>
  /* .el-menu-item:hover {background-color:#333!important;} */

</style>
