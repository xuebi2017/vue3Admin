import { RouteRecordRaw } from "vue-router";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/Home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: "登录",
    },
  },
];
