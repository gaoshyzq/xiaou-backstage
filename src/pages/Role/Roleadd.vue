<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item v-show="flag == true">角色添加</el-breadcrumb-item>
      <el-breadcrumb-item v-show="flag == false">角色修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <!--树形控件  -->
      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1,2]"
          :default-checked-keys="checkAll"
          ref="mytree"
          :props="defaultProps"
          check-strictly
        >
        </el-tree>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-show="flag == true"
          >添加</el-button
        >
        <el-button
          type="primary"
          @click="editForm('ruleForm')"
          v-show="flag == false"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      checkAll: [], //default-checked-keys="checkAll" 是默认被选中的标签
      menuList: [],
      flag: true,
      ruleForm: {
        //这个对象存储了所有表单元素的值，直接就可以把它发给后台
        rolename: "",
        menus: [],
        status: true
      },
      rules: {
        // 每个表单元素的验证规则
        rolename: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          }
        ]
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      //有id传过来说明点的是修改
      this.flag = false;
      this.$http
        .get("/roleinfo", {
          id: this.id
        })
        .then(res => {
          let { status } = res.data.list;
          this.ruleForm = {
            ...res.data.list,
            status: status == 1 ? true : false
          };
          this.checkAll = res.data.list.menus.split(","); //把传进来的数据分割成数组，使得页面按要求显示
        });
    }
    //进来就渲染列表
    this.$http.get("/menulist", {istree: true}).then(res => {
        this.data = res.data.list;
      });
  },
  methods: {
    submitForm(formName) {
      //添加的方法
      this.$refs[formName].validate(valid => {
        //validate验证之意
        if (valid) {
          //验证通过，调用添加接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.menus = this.$refs.mytree.getCheckedKeys();
          this.$http.post("/roleadd", this.ruleForm).then(res => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            if (res.data.code == 200) {
              this.$router.back();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editForm() {
      //修改的方法
      this.ruleForm.id = this.$route.query.id; //必须有id
      this.ruleForm.status = this.ruleForm.status ? 1 : 2;
      this.ruleForm.menus = this.$refs.mytree.getCheckedKeys();

      this.$http.post("/roleedit", this.ruleForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>
