import { createRouter, createWebHashHistory } from "vue-router";
import { staticRoutes } from "./modules/staticRouter";
import { initDynamicRouter } from "./modules/dynamicRouter";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { LOGIN_URL } from "@/config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
	// const globalStore = GlobalStore();
	const authStore = AuthStore();

	// NProgress 开始
	NProgress.start();

	// 动态设置标题
	const title = import.meta.env.VITE_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

	//登录页单独处理
	if (to.path.toLocaleLowerCase() === LOGIN_URL) {
		return next();
	}

	// 添加动态路由
	if (!authStore.authMenuListGet.length) {
		await initDynamicRouter();
		return next({ ...to, replace: true });
	}
	//跳转
	console.log(333);
	next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});

export default router;
