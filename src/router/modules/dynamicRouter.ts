import router from "@/router/index";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import { isType } from "@/utils/tools";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
	try {
		const globalStore = GlobalStore();
		const authStore = AuthStore();

		//获取菜单列表
		await authStore.getAuthMenuList();

		authStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) == "string") {
				item.component = modules["/src/views" + item.component + ".vue"];
			}
			if (item.meta.isFull) {
				//添加全屏页面
				router.addRoute(item);
			} else {
				//添加layout目录下的页面
				router.addRoute("layout", item);
			}
		});
	} catch (error) {}
};
