<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }"
        >轮播图列表</el-breadcrumb-item
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
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="img">
        <!--图片上传组件  -->
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="change"
          :file-list="imglist"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
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
        title: "",
        img: "",
        status: true
      },
      //图片组件的属性 该属性将filelist绑定成动态的 为了能够回显
      imglist: [],

      rules: {
        // 每个表单元素的验证规则
        title: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      // 点的是编辑修改
      this.title = "轮播图修改";
      this.buttonTitle = "修改";
      //点击编辑的回显
      this.$http.get("/bannerinfo", { id: this.id }).then(res => {
        console.log(res.data.list);
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
        this.imglist = [
          {
            name: res.data.list.catename,
            url: "http://localhost:3000" + res.data.list.img
          }
        ];
      });
    } else {
      // 点击的添加
      this.title = "轮播图添加";
      this.buttonTitle = "添加";
    }
    //下拉框的值 调用接口获取
    this.$http.get("/bannerlist", { istree: true }).then(res => {
      this.menuList = res.data.list;
    });
  },
  methods: {
    //绑定在图片上传组件上的方法，当发生change事件时则会触发,其内部有两个对象，file和filelist 一个是对象一个是数组，在js原生语法上file内的raw存储的就是上传上去的图片文件本身的信息,filelist.url上的就是图片的路径  "blob:http://localhost:8080/7112adfd-7bf0-45ce-9be9-906a79e42ebe"
    change(file, filelist) {
      this.ruleForm.img = file.raw;
    },
    submitForm(formName) {
      // formName就是 "ruleForm"
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过,调用修改接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          //之前先实例化一个formdata，因为后端的写法需要传递的是一个form对象形式
          let form = new FormData();
          //在对象中加入键值对
          for (let key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          console.log(this.ruleForm);

          if (this.id) {
            form.append("id",this.id)
            this.$http
              .post("/banneredit", form)
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
            this.$http.post("/banneradd", form).then(res => {
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
