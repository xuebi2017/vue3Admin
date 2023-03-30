export interface GlobalState {
	loginToken: LoginToken;
	userInfo: any;
	menus: Menu.MenuOptions[];
	themeConfig: ThemeConfigProps;
}

/* themeConfigProp */
export interface ThemeConfigProps {
	maximize: boolean;
	layout: LayoutType;
	assemblySize: AssemblySizeType;
	primary: string;
	systemPattern: SystemPatternType;
	isCollapse: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
}

export type AssemblySizeType = "default" | "small" | "large";

export type LayoutType = "vertical" | "classic" | "transverse" | "comprehensive";

export type SystemPatternType = "normal" | "mg" | "dark";

/* AuthState */
export interface AuthState {
	routeName: string;
	authButtonList: {
		[key: string]: string[];
	};
	authMenuList: Menu.MenuOptions[];
}

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[];
}
