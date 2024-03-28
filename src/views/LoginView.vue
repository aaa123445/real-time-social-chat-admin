<template>
  <div style="overflow-y: hidden">
    <el-form
        class="login_container"
        :model="login"
        status-icon :rules="rules"
        ref="login"
        label-width="90px">
    <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
      <h3 class="login_title">后台管理系统</h3>
      <!-- prop对应rules里的键 -->
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="login.userName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
      </el-form-item>

        <div style="text-align: center">
          <el-button type="primary" style="margin: 0 auto;width: auto" @click="submitLoginFrom">
          登 录
        </el-button>
        </div>
    </el-form>
  </div>
</template>
<script>
import {login} from "@/api/UserRequest";


export default {
  name: 'LoginView',
  data() {
    return {
      login:{
        userName:'',
        password:''
      },
      // 校验规则
      rules: {
        userName:[{required:'true',message:'请输入用户名',trigger:'blur'}],
        password:[{required:'true',message:'请输入用户名',trigger:'blur'}]
      }

    }
  },
  methods: {
    submitLoginFrom(){
      this.$refs.login.validate((valid) => {
        if(valid){
          login(this.login).then(res=>{
            if(res.code === 200){
              this.$message({
                type:'success',
                message:'登录成功',
                duration:3000
              })
              localStorage.setItem('token',JSON.stringify(res.data.token));
              localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
              // 登录成功后,跳转到后台首页
              this.$router.push('/')
            }
          })
        }else{
          this.$message({
            type:'error',
            message:'请正确填写信息',
            duration:3000
          })
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 450px;
  border: 1px solid #eaeaea;

  // 居中
  margin: 250px auto;

  padding: 35px 35px 15px 35px;

  // 让padding在width里面
  box-sizing: border-box;

  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;

  .login_title {
    color: #505458;
    // 左右居中
    text-align: center;
    margin-bottom: 40px;
  }

  .el-input {
    width: 250px;
  }
}

</style>
