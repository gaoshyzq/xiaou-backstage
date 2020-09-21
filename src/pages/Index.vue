<template>
  <div id="app">
    <el-container>
      
      <el-aside width="200px">

          <Navbar />
        </el-aside>
      <el-container>
        <el-header>{{admin}}<i class="el-icon-setting"></i></el-header>
        <el-main>

          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  export default {
    name: 'App',
    components: {
      Navbar
    },
    computed: {
      admin(){
        return this.$store.state.user.username
      }
    },
  }

</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app,
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }

  .el-aside {
    background-color: rgb(67, 74, 80);
    color: #333;
    text-align: center;
    height: 100%;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    height: 100%;
  }

  .el-button--primary {
    margin: 10px 0;
  }

  .el-menu-item,
  .el-submenu {
    width: 200px;
  }

  .el-form-item .el-form-item {
    margin-bottom: 0;
    margin-left: -80px;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 70%;
}
.el-form-item {
    margin-bottom: 22px;
    margin-top: 20px;
}
/* element.style {
    background-color: rgb(67, 74, 80);
} */

</style>
