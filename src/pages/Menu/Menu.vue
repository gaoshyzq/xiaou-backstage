<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>菜单添加</el-breadcrumb-item> -->
    </el-breadcrumb>

    <!-- 添加按钮 -->
    <el-button type="primary" @click="goAdd">添加</el-button>

    <!-- 表格数据 -->
    <el-table :data="menulist" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="id" label="菜单编号" width="80">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址">
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status | statusFormat}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="menuedit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除吗" @onConfirm="del(scope.row.id)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
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
        id: '',
        menulist: [],
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.$http.get("/menulist", {
          istree: true
        }).then(res => {
          this.menulist = res.data.list
        })
      },
      //删除方法
      del(id) {
        this.$http.post("/menudelete", {
          id
        }).then(res => {
          if (res.data.code == 200) {
            this.getList()
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        })

      },
      goAdd() {
        this.$router.push("/menu/add") //跳转页面
      },
      menuedit(row) {
        this.$router.push("/menu/edit?id=" + row.id) //跳转到修改页面同时把这一行数据的id传递过来
      },

    },
  }

</script>

<style scoped>

</style>
