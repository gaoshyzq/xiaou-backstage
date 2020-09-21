<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cate' }">商品分类管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">商品规格列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }">轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div id="myChart" :style="{ width: '1000px', height: '400px' }"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "近一周订单数量",
          left: "center",
          textStyle: {
            fontSize: 16,
            fontWeight: "normal"
          }
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  #myChart
    margin 240px auto 
  
</style>
