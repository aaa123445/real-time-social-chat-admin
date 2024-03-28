<template>
    <el-container class="main">
      <el-aside width="250px" class="aside-bar">
        <h1 style="text-align: center;margin: 20px;line-height: 20px;">社交平台后台管理系统</h1>
          <el-menu
            default-active="2"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="accountAudit">账号审核</el-menu-item>
                <el-menu-item index="accountManagement">用户管理</el-menu-item>
                <el-menu-item index="permissionsManagement">权限设置</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="articleAudit">文章审核</el-menu-item>
                <el-menu-item index="articleManagement">文章管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="systemSetting">系统设置</el-menu-item>
                <el-menu-item index="otherSetting">其他</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header-bar">
          <div class="header-bar-user">
            <i class="el-icon-switch-button" style="margin-left: 10px;cursor: pointer;" @click="logout">退出</i>
            <i class="el-icon-user-solid" style="margin-left: 10px;cursor: pointer;">{{adminUserInfo.nickName}}</i>
            <el-avatar  :src="adminUserInfo.avatar" :size="40" style="text-align: center"></el-avatar>
          </div>
        </el-header>
        <el-main class="main-route"><router-view></router-view></el-main>
      </el-container>
    </el-container>
</template>
<script>
import {logout} from "@/api/UserRequest";

export default {
  data(){
    return {
      adminUserInfo:{}
    }
  },
  mounted() {
    this.adminUserInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      this.$confirm('确定要退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(res=>{
          if (res.code === 200){
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            this.$router.push('/login')
          }
        })
      }).catch(() => {
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  .header-bar{
    background-color: #545c64;
    color: #fff;
    height: 60px !important;
    padding-right: 50px;
    .header-bar-user{
      height: 60px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
  }
  .aside-bar{
    height: 100vh;
    width: auto;
    background-color: #545c64;
    color: #fff;
    overflow-x: hidden;
    .el-menu-vertical{
      width: 250px;
    }
  }
  .main-route{
    background-color: #e9eef3;
    color: #333;
  }
}
</style>
