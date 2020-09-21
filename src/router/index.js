import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/pages/Login/Login")
    },
    {
      path: "/",
      redirect: "/menu"
    },
    {
      path: "/index",
      component: () => import("@/pages/Index"),
      children: [
        {
          path: "/home",
          component: () => import("@/pages/Home/Home")
        },
        {
          path: "/menu", //列表
          component: () => import("@/pages/Menu/Menu")
        },
        {
          path: "/menu/add",
          component: () => import("@/pages/Menu/Menuadd")
        },
        {
          path: "/menu/edit", //列表修改の路由
          component: () => import("@/pages/Menu/Menuadd")
        },
        {
          path: "/role", //角色
          component: () => import("@/pages/Role/Role")
        },
        {
          path: "/role/add",
          component: () => import("@/pages/Role/Roleadd")
        },
        {
          path: "/role/edit", //角色添加和修改の路由
          component: () => import("@/pages/Role/Roleadd")
        },
        {
          path: "/user", //管理员
          component: () => import("@/pages/User/User")
        },
        {
          path: "/user/add", //管理员添加
          component: () => import("@/pages/User/Useradd")
        },
        {
          path: "/user/edit", //管理员修改の路由
          component: () => import("@/pages/User/Useradd")
        },
        {
          path: "/cate", //商品分类列表
          component: () => import("@/pages/Cate/Cate")
        },
        {
          path: "/cate/add", //商品分类列表添加
          component: () => import("@/pages/Cate/Cateadd")
        },
        {
          path: "/cate/edit", //商品分类列表修改の路由
          component: () => import("@/pages/Cate/Cateadd")
        },
        {
          path: "/specs", //商品规格列表
          component: () => import("@/pages/Specs/Specs")
        },
        {
          path: "/specs/add", //商品规格列表添加
          component: () => import("@/pages/Specs/Specsadd")
        },
        {
          path: "/specs/edit", //商品规格列表修改
          component: () => import("@/pages/Specs/Specsadd")
        },
        {
          path: "/goods", //商品管理列表
          component: () => import("@/pages/Goods/Goods")
        },
        {
          path: "/goods/add", //商品管理列表添加
          component: () => import("@/pages/Goods/Goodsadd")
        },
        {
          path: "/goods/edit", //商品管理列表修改
          component: () => import("@/pages/Goods/Goodsadd")
        },
        {
          path: "/member", //会员管理列表
          component: () => import("@/pages/Member/Member")
        },
        {
          path: "/member/edit", //会员管理列表修改
          component: () => import("@/pages/Member/Memberadd")
        },
        {
          path: "/banner", //轮播图管理列表
          component: () => import("@/pages/Banner/Banner")
        },
        {
          path: "/banner/add", //轮播图添加
          component: () => import("@/pages/Banner/Banneradd")
        },
        {
          path: "/banner/edit", //轮播图修改
          component: () => import("@/pages/Banner/Banneradd")
        }
      ]
    }
  ]
});
