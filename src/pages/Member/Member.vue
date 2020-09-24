<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" width="80"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="280"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="300"></el-table-column>
     

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
      rolelist: []
    };
  },
  filters: {
    roleFormat(roleid, rolelist) {
      // 过滤器在上面调用把数据传过来，用find做查找，再把需要显示的值返回
      if (rolelist.length > 0) {
        let item = rolelist.find(item => {
          return item.id == roleid;
        });
        return item.rolename;
      }
    }
  },
  mounted() {
    this.getList();
    //获取了角色列表
    this.$http.get("/rolelist").then(res => {
      this.rolelist = res.data.list;
    });
  },
  methods: {
    getList() {
      this.$http.get("/memberlist").then(res => {
        console.log(res);
        this.tableData = res.data.list;
      });
    },
    //修改
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push("/member/edit?id=" + row.uid);
    },
  }
};
</script>

<style lang="stylus" scoped>
    .el-table--border
        margin-top 20px
</style>
