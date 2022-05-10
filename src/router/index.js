import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
     redirect: "/home"
  },
  // 首页
  {
    path: "/home",
    component: () => import("views/home/Home")
  },
  // 分类
  {
    path: "/category",
    component: () => import("views/category/Category")
  },
  // 购物车
  {
    path: "/cart",
    component: () => import("views/cart/Cart")
  },
  // 我的
  {
    path: "/profile",
    component: () => import("views/profile/Profile")
  },
  // 详情页
  {
    path: "/detail",
    component: () => import("views/detail/Detail")
  }
]

const router = createRouter({
  // Vue.js 3.0下 vue-router 4.0 hash模式 
  history: createWebHashHistory(),

  // Vue.js 3.0下vue-router 4.0 history模式
  // history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
