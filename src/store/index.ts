import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { GlobalState, ThemeConfigProps, AssemblySizeType, SystemPatternType } from "./interface";
import { DEFAULT_PRIMARY } from "@/config";

export const GlobalStore = defineStore("GlobalState", {
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// token
		loginToken: {
			userId: 0,
			sname: ""
		},
		// userInfo
		userInfo: "",
		// menus
		menus: [],
		// themeConfig
		themeConfig: {
			// 当前页面是否全屏
			maximize: false,
			// 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 综合：comprehensive
			layout: "vertical",
			// element组件大小
			assemblySize: "default",
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 系统模式 ==>日常:normal | 马钢: mg | 暗黑: dark
			systemPattern: "normal",
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: true
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: LoginToken) {
			this.loginToken = token;
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		// setMenus
		setMenus(menus: Menu.MenuOptions[]) {
			this.menus = menus;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: AssemblySizeType) {
			this.themeConfig.assemblySize = assemblySize;
		},
		// setSystemPatternSize
		setSystemPatternSize(systemPattern: SystemPatternType) {
			this.themeConfig.systemPattern = systemPattern;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig;
		}
	},
	persist: true //persist设置为true默认state都存在localStorage里
	// persist: {
	// 	paths: ["loginToken", "userInfo", "assemblySize", "themeConfig"]
	// }
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
