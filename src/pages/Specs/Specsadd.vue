<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
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
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in ruleForm.attrs"
        :label="'规格属性' + index"
        :key="index"
      >
        <el-input v-model="item.value"></el-input>
        <el-button @click="addDomain" v-if="index == 0">新增规格属性</el-button>
        <el-button
          @click.prevent="removeDomain(item)"
          v-if="index !== 0"
          style=" background-color:red;color:white"
          >删除</el-button
        >
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
      // menuList: [],

      ruleForm: {
        // 对象里面存储了上面所有表单元素的值，而且这个对象也是我们最终调用接口发走的对象参数
        specsname: "", // 菜单名称
        attrs: [
          {
            value: ""
          }
        ],
        status: true
      },
      rules: {
        // 每个表单元素的验证规则
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
      }
    };
  },
  mounted() {
    // 这个组件既做添加也做编辑
    // 1. 面包屑导航文字 2. 最下面的按钮   3. 编辑有回显
    // 获取路由参数id
    // console.log(this);
    this.id = this.$route.query.id;
    if (this.id) {
      // 说明是点击的编辑
      this.title = "规格修改";
      this.buttonTitle = "修改";
      this.$http.get("/specsinfo", { id: this.id }).then(res => {
        this.ruleForm = {
          ...res.data.list[0],
          attrs: res.data.list[0].attrs.map(item => {
            return { value: item };
          }),
          status: res.data.list[0].status == 1 ? true : false
        };
        // console.log(this.ruleForm);
      });
    } else {
      // 说明是点击的添加
      this.title = "规格添加";
      this.buttonTitle = "添加";
    }

  },
  methods: {
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: ""
      });
    },
    submitForm(formName) {
      // formName "ruleForm"
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，调用修改的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          //遍历每个输入框，把其中的值取出来，组成字符串形式向后端发送
          this.ruleForm.attrs = this.ruleForm.attrs
            .map(item => {
              return item.value;
            })
            .join(",");
          if (this.id) {
            this.$http.post("/specsedit", this.ruleForm).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$router.back();
              }
            });
          } else {
            this.$http.post("/specsadd", this.ruleForm).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
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
