<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }"
        >管理员列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择">
          <el-option
            :label="item.rolename"
            :value="item.id"
            v-for="item in menuList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          buttonTitle
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: "", // 面包屑最后的文字
      buttonTitle: "", // 最后按钮的文字
      menuList: [],

      ruleForm: {
        // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
        roleid: "",
        username: "",
        password: "",
        status: true
      },
      rules: {
        // 每个表单元素的验证规则
        roleid: [
          { required: true, message: "请选择角色名称", trigger: "change" }
        ],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      // 点的是编辑修改
      this.title = "用户修改";
      this.buttonTitle = "修改";
      this.$http.get("/userinfo", { uid: this.id }).then(res => {
        console.log(res);
        this.ruleForm.roleid = res.data.list.roleid;
        this.ruleForm.username = res.data.list.username;
      });
    } else {
      // 点击的添加
      this.title = "用户添加";
      this.buttonTitle = "添加";
    }

    this.$http.get("/rolelist").then(res => {
      // console.log(res)
      this.menuList = res.data.list;
    });
  },
  methods: {
    submitForm(formName) {
      // formName就是 "ruleForm"
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过,调用修改接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          if (this.id) {
            this.$http
              .post("/useredit", { ...this.ruleForm, uid: this.id })
              .then(res => {
                // console.log(res);
                if (res.data.code == 200) {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.$router.back();
                }
              });
          } else {
            //添加的方法
            this.$http.post("/useradd", this.ruleForm).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                  this.$message({
                      message:"添加成功",
                      type:"success"
                  })
                this.$router.back();
              }
            });
          }
        } else {
          // 验证没通过
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>
