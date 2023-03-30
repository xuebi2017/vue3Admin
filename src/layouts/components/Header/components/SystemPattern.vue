<template>
	<el-dropdown trigger="click" @command="setPattern">
		<i :class="'iconfont icon-zhuti'" class="toolBar-icon"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in systemPatternList" :key="item" :disabled="systemPattern === item" :command="item">
					{{ systemPatternListCh[item] }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/store";
import { SystemPatternType } from "@/store/interface";
import { useTheme } from "@/hooks/useTheme";

const globalStore = GlobalStore();
const systemPattern = computed(() => globalStore.themeConfig.systemPattern);
const { switchPattern } = useTheme();

const systemPatternList: SystemPatternType[] = ["normal", "mg", "dark"];
const systemPatternListCh = reactive<{ [key: string]: string }>({
	normal: "日常模式",
	mg: "马钢模式",
	dark: "暗黑模式"
});

const setPattern = (item: SystemPatternType) => {
	if (systemPattern.value === item) return;
	globalStore.setSystemPatternSize(item);
	switchPattern();
};
</script>
<style lang="scss"></style>
