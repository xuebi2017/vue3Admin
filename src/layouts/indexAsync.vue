<!-- 💥 这里是异步加载 LayoutComponents -->
<template>
	<suspense>
		<template #default>
			<component :is="LayoutComponents[themeConfig.layout]" />
		</template>
		<template #fallback>
			<Loading />
		</template>
	</suspense>
	<MoreDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, defineAsyncComponent, type Component } from "vue";
import { GlobalStore } from "@/store";
import Loading from "@/components/Loading/index.vue";
import MoreDrawer from "./components/MoreDrawer/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	vertical: defineAsyncComponent(() => import("./LayoutVertical/index.vue")),
	classic: defineAsyncComponent(() => import("./LayoutClassic/index.vue")),
	transverse: defineAsyncComponent(() => import("./LayoutTransverse/index.vue")),
	comprehensive: defineAsyncComponent(() => import("./LayoutComprehensive/index.vue"))
};

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
