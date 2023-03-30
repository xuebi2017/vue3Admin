<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutComponents[themeConfig.layout]" />
	<MoreDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { GlobalStore } from "@/store";
import MoreDrawer from "./components/MoreDrawer/index.vue";
import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutComprehensive from "./LayoutComprehensive/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	vertical: LayoutVertical,
	classic: LayoutClassic,
	transverse: LayoutTransverse,
	comprehensive: LayoutComprehensive
};

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
