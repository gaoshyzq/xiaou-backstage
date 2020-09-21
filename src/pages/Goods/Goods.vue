<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="goAdd">添加</el-button>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" width="80"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120">
      </el-table-column>

      <!-- 上传到商品分类页面的图片是个本地地址，用插槽语法和拼接的方式给上端口地址让其可以正常显示 -->
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isnew == 1">{{
            scope.row.isnew | ishotFormat
          }}</el-tag>
          <el-tag v-if="scope.row.isnew == 2" type="danger">{{
            scope.row.isnew | ishotFormat
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ishot == 1">{{
            scope.row.ishot | ishotFormat
          }}</el-tag>
          <el-tag v-if="scope.row.ishot == 2" type="danger">{{
            scope.row.ishot | ishotFormat
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status | statusFormat }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="你确定要删除吗" @onConfirm="del(scope.row.id)">
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      :current-page="current"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total:0,
      current:1, 
    };
  },
  mounted() {
    this.getList();
    this.$http.get("/goodscount").then(res => {
      this.total = res.data.list[0].total;
    });
  },
  methods: {
    currentChange(page) {
      //当前页码被改变时触发的事件
      this.current = page;
      this.getList();
    },
    getList() {
      //渲染页面的方法
      this.$http
        .get("/goodslist", { page: this.current, size: 2 })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    //修改
    handleEdit(index, row) {
      this.$router.push("/goods/edit?id=" + row.id);
    },
    del(id) {
      console.log(id);
      // 调用删除的接口
      this.$http.post("/goodsdelete", { id }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
      });
    },
    goAdd() {
      this.$router.push("/goods/add");
    }
  }
};
</script>

<style lang="stylus" scoped>
img {
    width: 150px;
}
</style>
