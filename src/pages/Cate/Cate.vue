<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="分类编号" width="80"> </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="120">
      </el-table-column>

      <!-- 上传到商品分类页面的图片是个本地地址，用插槽语法和拼接的方式给上端口地址让其可以正常显示 -->
      <el-table-column label="图片" width="300">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" alt="">
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
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getList();
    //获取了角色列表
    this.$http.get("/catelist", {istree: true}).then(res => {
      // console.log(res)
      this.tableData = res.data.list;
    });
  },
  methods: {
    getList() {
      this.$http.get("/catelist", { size: 10, page: 1 }).then(res => {
        // console.log(res);
        this.tableData = res.data.list;
      });
    },
    //修改
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push("/cate/edit?id=" + row.id);
    },
    del(id) {
      console.log(id);
      // 调用删除的接口
      this.$http.post("/catedelete", { id }).then(res => {
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
      this.$router.push("/cate/add");
    }
  }
};
</script>

<style lang="stylus" scoped>
img {
    width: 250px;
}
</style>
