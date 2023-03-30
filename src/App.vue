<template>
	<el-config-provider :button="config" :size="assemblySize" :locale="zhCn">
		<router-view></router-view>
	</el-config-provider>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import { GlobalStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: true
});
// 配置全局组件大小
const assemblySize = computed(() => globalStore.themeConfig.assemblySize);
</script>
<style lang="scss">
@import "./assets/styles/publicStyle.scss";
</style>
