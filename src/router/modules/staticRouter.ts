import { RouteRecordRaw } from "vue-router";
import { LOGIN_URL, HOME_URL } from "@/config";
export const staticRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: HOME_URL
	},
	{
		path: LOGIN_URL,
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/layout",
		name: "layout",
		component: () => import("@/layouts/index.vue"),
		// component: () => import("@/layouts/indexAsync.vue"),
		redirect: HOME_URL,
		children: []
	},
	//解决刷新页面，路由警告
	{
		path: "/:pathMatch(.*)*",
		// name: "404", //不能写name属性  写了所有动态路由在刷新后都会被匹配到404
		component: () => import("@/views/error/404.vue")
	}
];
