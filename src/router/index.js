import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/user/Login';
import HomeLayout from '@/layouts/HomeLayout';
import store from '@/store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'homelayout',
    redirect: '/welcome',  // 重定向:重新指向其它path,会改变网址
    component: HomeLayout,
    children:[
      {
        path:'/welcome',
        name:'welcome',
        component:() => import('@/views/other/welcome')
      },
      {
        path:'/users',
        name:'users',
        component:() => import('@/views/user/list')
      },
      {
        path:'/roles',
        name:'roles',
        component:() => import('@/views/rights/roleList')
      },
      {
        path:'/rights',
        name:'rights',
        component:() => import('@/views/rights/RightsList')
      },
      {
        path:'/goods',
        name:'goods',
        component:() => import('@/views/goods/List')
      },
      {
        path:'/params',
        name:'params',
        component:() => import('@/views/goods/Params')
      },
      {
        path:'/categories',
        name:'categories',
        component:() => import('@/views/goods/Categories')
      },
      {
        path:'/orders',
        name:'orders',
        component:() => import('@/views/order/List')
      },
      {
        path:'/reports',
        name:'reports',
        component:() => import('@/views/reports/Reports')
      },
      {
        path:'*',
        name:'404',
        component:()=>import('@/views/other/404')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  //如果是登录页 并且有token 那么就进入首页
  if(to.name==='login' && store.getters.token){
    return next({name:'homelayout'})
  }
  //如果不是登录页 并且没有token 那么就进入登录页
  if(to.name!=='login' && !store.getters.token){
    return next({name:'login'})
  }
  next();
})

export default router
