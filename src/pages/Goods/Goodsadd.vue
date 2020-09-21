<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
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
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select
          v-model="ruleForm.first_cateid"
          placeholder="请选择"
          @change="catetree"
        >
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in list"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in menuList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
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

      <el-form-item label="商品规格" prop="specsid">
        <el-select
          v-model="ruleForm.specsid"
          placeholder="请选择"
          @change="getAttr"
        >
          <el-option
            :label="item.specsname"
            :value="item.id"
            v-for="item in goodslist"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择">
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in attrlist"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="商品描述" style="width:65%">
        <div id="editor"></div>
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
import E from "wangeditor";
export default {
  data() {
    return {
      id: "",
      title: "", // 面包屑最后的文字
      buttonTitle: "", // 最后按钮的文字
      list: [], //一级分类的值
      menuList: [], //二级分类下拉框的值
      goodslist: [], //商品规格下拉框的值
      attrlist: [], //商品属性下拉框的值
      imglist: [], //图片组件的属性 该属性将filelist绑定成动态的 为了能够回显

      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        status: true
      },
      rules: {
        // 每个表单元素的验证规则
        first_cateid: [
          { required: true, message: "请输入数字", trigger: "blur" }
        ],
        second_cateid: [
          { required: true, message: "请输入数字", trigger: "blur" }
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      // 点的编辑修改跳的页面
      this.title = "商品分类修改";
      this.buttonTitle = "修改";
      //点击编辑的回显
      this.$http.get("/goodsinfo", { id: this.id }).then(res => {
        // console.log(res.data.list);
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
        this.imglist = [
          {
            name: res.data.list.catename,
            url: "http://localhost:3000" + res.data.list.img
          }
        ];
        console.log(this.ruleForm);
      });
    } else {
      //点击添加跳的页面
      this.title = "商品分类添加";
      this.buttonTitle = "添加";
    }
    //一级分类下拉框的值
    this.$http.get("/getcatetree").then(res => {
      this.list = res.data.list;
    });
    //商品规格和属性下拉框的值
    this.$http.get("/specslist").then(res => {
      this.goodslist = res.data.list;
    });
    //富文本编辑器
    let editor = new E("#editor");
    editor.customConfig.onchange = html => {
      this.form.description = html;
    };
    editor.create();
  },
  methods: {
    //绑定在图片上传组件上的方法，当发生change事件时则会触发,其内部有两个对象，file和filelist 一个是对象一个是数组，在js原生语法上file内的raw存储的就是上传上去的图片文件本身的信息,filelist.url上的就是图片的路径  "blob:http://localhost:8080/7112adfd-7bf0-45ce-9be9-906a79e42ebe"
    change(file, filelist) {
      this.ruleForm.img = file.raw;
    },
    //根据一级分类获取二级分类的方法
    catetree() {
      let cateid = this.ruleForm.first_cateid;
      this.$http.get("/getcatetree").then(res => {
        this.menuList = res.data.list.filter(item => {
          return cateid == item.id;
        })[0].children;
      });
    },
    //根据商品规格获取商品属性的方法
    getAttr() {
      let attrid = this.ruleForm.specsid;
      this.$http.get("/specslist").then(res => {
        this.attrlist = res.data.list.filter(item => {
          return attrid == item.id;
        })[0].attrs;
      });
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
            form.append("id", this.id);
            this.$http.post("/goodsedit", form).then(res => {
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
            this.$http.post("/goodsadd", form).then(res => {
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
