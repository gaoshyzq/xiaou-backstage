<template>
  <div>
    <main>
        <h1>登录</h1>
      <el-input v-model="username" placeholder="请输入内容" class="logininput"></el-input>

      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password class="logininput"
        @keydown.enter.native="login"
      ></el-input>

      <el-button type="primary" @click="login">登录</el-button>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
      login(){
        console.log(1);
          this.$http.post("userlogin",{username: this.username,password: this.password}).then(res=>{
              console.log(res.data.list);
              if(res.data.code == 200){
                  this.$store.commit("setUser",res.data.list)
                  this.$message({
                      message:"登录成功",
                      type:"success"
                  })
                  this.$router.push("/home")
              }
          })
      }
  },
};
</script>

<style scoped>
    main{
        width: 300px;
        height: 230px;
        display: flex;
        flex-direction: column;
        text-align: center;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left:-150px ;
        margin-top: -115px;
    }
        
    .logininput{
        width: 100%;
        flex: 1;
    }
    .el-button el-button--primary{
        flex: 1;
    }
    h1{
        flex: 1;
    }
</style>
