<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="用户编号" width="80"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column label="所属角色">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.roleid | roleFormat(rolelist) }}</el-tag>
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
          <el-popconfirm title="你确定要删除吗" @onConfirm="del(scope.row.uid)">
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
      rolelist: [],
      total: 0,
      current: 1
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
    //分页
    this.$http.get("/usercount").then(res => {
      // console.log(res.data.list);
      this.total = res.data.list[0].total;
    });
  },
  methods: {
    //当前页码被改变时触发的事件
    currentChange(page) {
      this.current = page;
      this.getList();
    },
    getList() {
      this.$http.get("/userlist", { page: this.current, size: 2 }).then(res => {
        // console.log(res);
        this.tableData = res.data.list;
      });
    },
    //修改
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push("/user/edit?id=" + row.uid);
    },
    del(uid) {
      console.log(uid);
      // 调用删除的接口
      this.$http.post("/userdelete", { uid }).then(res => {
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
      this.$router.push("/user/add");
    }
  }
};
</script>

<style lang="stylus" scoped></style>
