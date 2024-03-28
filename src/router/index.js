import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {isAuth: true,title:'主页'},
    component: HomeView,
    children: [
      {
        path:'accountManagement',
        name: 'accountManagement',
        meta: {isAuth: true,title:'用户管理'},
        component: () => import('@/components/account/AccountManagement.vue')
      },
      {
        path:'accountAudit',
        name: 'accountAudit',
        meta: {isAuth: true,title:'账号审核'},
        component: () => import('@/components/account/AccountAudit.vue')
      },
      {
        path:'permissionsManagement',
        name: 'permissionsManagement',
        meta: {isAuth: true,title:'权限管理'},
        component: () => import('@/components/account/PermissionsManagement.vue')
      },
      {
        path:'articleAudit',
        name: 'articleAudit',
        meta: {isAuth: true,title:'文章审核'},
        component: () => import('@/components/article/ArticleAudit.vue')
      },
      {
        path:'articleManagement',
        name: 'articleManagement',
        meta: {isAuth: true,title:'文章管理'},
        component: () => import('@/components/article/ArticleManagement.vue')
      },
      {
        path:'systemSetting',
        name: 'systemSetting',
        meta: {isAuth: true,title:'系统设置'},
        component: () => import('@/components/setting/SystemSetting.vue')
      },
      {
        path:'otherSetting',
        name: 'otherSetting',
        meta: {isAuth: true,title:'系统设置'},
        component: () => import('@/components/setting/OtherSetting.vue')
      }


    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {title:'登录'},
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {    //判断当前路由是否需要进行权限控制
    if (localStorage.getItem('token')) {    //权限控制的具体规则
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  } else {
    next() // 放行
  }
})

export default router
