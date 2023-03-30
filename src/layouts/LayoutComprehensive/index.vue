<!-- 综合布局 -->
<template>
	<el-container class="layout">
		<el-container class="comprehensive-content">
			<el-aside :class="{ 'not-aside': !subMenu.length }" :style="{ width: isCollapse ? '65px' : '210px' }">
				<div class="logo flx-center">
					<span v-show="subMenu.length" class="logo-text">{{ isCollapse ? "V" : title }}</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:router="false"
						:collapse="isCollapse"
						:collapse-transition="false"
						:unique-opened="true"
						background-color="#191a20"
						text-color="#bdbdc0"
						active-text-color="#ffffff"
					>
						<SubMenu :menuList="subMenu" />
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<el-container class="comprehensive-main">
				<el-header>
					<div class="header-lf">
						<ToolBarLeft />
						<div class="aside-split">
							<el-scrollbar>
								<div class="split-list">
									<div
										class="split-item"
										:class="{ 'split-active': splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path }"
										v-for="item in menuList"
										:key="item.path"
										@click="changeSubMenu(item)"
									>
										<el-icon>
											<component :is="item.meta.icon"></component>
										</el-icon>
										<span class="title">{{ item.meta.title }}</span>
									</div>
								</div>
							</el-scrollbar>
						</div>
					</div>
					<ToolBarRight />
				</el-header>
				<Main />
			</el-container>
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="LayoutComprehensive">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";

const title = import.meta.env.VITE_APP_TITLE;
const route = useRoute();
const router = useRouter();
const authStore = AuthStore();
const globalStore = GlobalStore();
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => authStore.showMenuListGet);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);

const subMenu = ref<Menu.MenuOptions[]>([]);
const splitActive = ref<string>("");
watch(
	() => [menuList, route],
	() => {
		// 当前菜单没有数据直接 return
		if (!menuList.value.length) return;
		splitActive.value = route.path;
		const menuItem = menuList.value.filter(
			(item: Menu.MenuOptions) => route.path === item.path || `/${route.path.split("/")[1]}` === item.path
		);
		if (menuItem[0].children?.length) return (subMenu.value = menuItem[0].children);
		subMenu.value = [];
	},
	{
		deep: true,
		immediate: true
	}
);

// 切换 SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
	splitActive.value = item.path;
	if (item.children?.length) return (subMenu.value = item.children);
	subMenu.value = [];
	router.push(item.path);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.comprehensive {
	.comprehensive-content {
		height: 100%; // 减去头部高度
		.comprehensive-main {
			display: flex;
			flex-direction: column;
		}
	}
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: #060708;
				&::before {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					width: 4px;
					content: "";
					background: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
