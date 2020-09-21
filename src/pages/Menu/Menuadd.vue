<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu'}">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item v-show="flag==true">菜单添加</el-breadcrumb-item>
      <el-breadcrumb-item v-show="flag==false">菜单修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option :label="item.title" :value="item.id" v-for="item in menuList" :key="item.id"></el-option>

        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单图标" prop="icon" v-show="ruleForm.type == 1">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" prop="url" v-show="ruleForm.type == 2">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-show="flag==true">添加</el-button>
        <el-button type="primary" @click="editForm('ruleForm')" v-show="flag==false">修改</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuList: [],
        flag: true,
        ruleForm: { //这个对象存储了所有表单元素的值，直接就可以把它发给后台
          title: '',
          pid: '',
          type: '',
          url: '',
          icon: '',
          status: true,
          id: ''
        },
        rules: {
          title: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
          }],
          pid: [{
            required: true,
            message: '请选择上级菜单',
            trigger: 'change'
          }]


        }
      };
    },
    mounted() {
      this.id = this.$route.query.id
      if (this.id) { //点的是修改
        this.flag = false
        this.$http.get("/menuinfo", {
          id: this.id
        }).then(res => {
          let {
            status
          } = res.data.list
          this.ruleForm = {
            ...res.data.list,
            status: status == 1 ? true : false
          }
        })
      }
      this.$http.get("/menulist", {
        istree: true
      }).then(res => {
        this.menuList = res.data.list
      })

    },
    methods: {
      submitForm(formName) { //添加的方法
        this.$refs[formName].validate((valid) => { //validate验证之意
          if (valid) { //验证通过，调用添加接口
            this.ruleForm.status = this.ruleForm.status ? 1 : 2
            this.$http.post("/menuadd", this.ruleForm).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              if (res.data.code == 200) {
                this.ruleForm = {
                  title: '',
                  pid: '',
                  type: '',
                  url: '',
                  icon: '',
                  status: true,
                  id: ''
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      editForm() { //修改的方法
        this.ruleForm.id = this.$route.query.id; //必须有id
        this.ruleForm.status = this.ruleForm.status ? 1 : 2
        this.ruleForm.type = this.ruleForm.type * 1 //type必须为数字类型
        this.$http.post("/menuedit", this.ruleForm).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
             this.$router.back();
          }


        })

      }
    }
  }

</script>

<style lang="stylus" scoped></style>
