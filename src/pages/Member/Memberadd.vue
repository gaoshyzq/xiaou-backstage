<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }"
        >会员列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>会员修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
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
      menuList: [],

      ruleForm: {
        // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: true
      },
      rules: {
        // 每个表单元素的验证规则
        nickname: [
          { required: true, message: "请选择昵称", trigger: "change" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.$http.get("/memberinfo", { uid: this.id }).then(res => {
        console.log(res);
        this.ruleForm = res.data.list
        this.ruleForm.status = 1 ? true : false
        this.ruleForm.password = ""
      });
    }

    this.$http.get("/memberlist").then(res => {
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
          this.$http
            .post("/memberedit", { ...this.ruleForm, uid: this.id })
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
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>
