<template>
	<el-dropdown trigger="click" :teleported="false">
		<div class="more-button">
			<i :class="'iconfont icon-arrow-down'"></i>
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="refresh">
					<el-icon><Refresh /></el-icon>刷新
				</el-dropdown-item>
				<el-dropdown-item @click="maximize">
					<el-icon><FullScreen /></el-icon>最大化
				</el-dropdown-item>
				<el-dropdown-item divided @click="closeCurrentTab">
					<el-icon><Remove /></el-icon>关闭当前页
				</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">
					<el-icon><CircleClose /></el-icon>关闭其他页
				</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">
					<el-icon><FolderDelete /></el-icon>关闭所有页
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { computed, inject, nextTick } from "vue";
import { HOME_URL } from "@/config";
import { GlobalStore } from "@/store";
import { TabsStore } from "@/store/modules/tabs";
import { KeepAliveStore } from "@/store/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);

const refreshCurrentPage: Function = inject("refresh") as Function;
// refresh current page
const refresh = () => {
	setTimeout(() => {
		keepAliveStore.removeKeepAliveName(route.name as string);
		refreshCurrentPage(false);
		nextTick(() => {
			keepAliveStore.addKeepAliveName(route.name as string);
			refreshCurrentPage(true);
		});
	}, 0);
};

// maximize current page
const maximize = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, maximize: true });
};

// Close Current
const closeCurrentTab = () => {
	if (route.meta.isAffix) return;
	tabStore.removeTabs(route.fullPath);
	keepAliveStore.removeKeepAliveName(route.name as string);
};

// Close Other
const closeOtherTab = () => {
	tabStore.closeMultipleTab(route.fullPath);
	keepAliveStore.setKeepAliveName([route.name] as string[]);
};

// Close All
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	keepAliveStore.setKeepAliveName();
	router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
