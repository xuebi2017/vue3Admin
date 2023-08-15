<template>
	<div>
		<el-form ref="ruleFormRef" :rules="formOpts.rules" :model="formOpts.data" :size="formSize">
			<TasilyGrid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]">
				<TasilyGridItem v-for="(item, index) in formOpts.fieldArray" :key="item.field" :index="index">
					<el-form-item :label="`${item.label} :`">
						<SearchFormItem :column="item" :search-param="formOpts.data" />
					</el-form-item>
				</TasilyGridItem>
				<TasilyGridItem suffix>
					<div class="operation">
						<el-button
							v-if="showSearch"
							:size="globalStore.themeConfig.assemblySize"
							type="primary"
							:icon="Search"
							@click="findByPage"
							>查询</el-button
						>
						<el-button
							v-if="showReset"
							:size="globalStore.themeConfig.assemblySize"
							type="primary"
							:icon="Delete"
							@click="handleReset"
							>重置</el-button
						>
						<el-button v-if="showCollapse" plain class="search-isOpen" @click="collapsed = !collapsed">
							{{ collapsed ? "展开" : "合并" }}
							<el-icon class="el-icon--right">
								<component :is="collapsed ? ArrowDown : ArrowUp"></component>
							</el-icon>
						</el-button>
						<slot></slot>
					</div>
				</TasilyGridItem>
			</TasilyGrid>
		</el-form>
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import TasilyGrid from "@/components/TasilyGrid/index.vue";
import TasilyGridItem from "@/components/TasilyGrid/components/TasilyGridItem.vue";
import SearchFormItem from "./components/SearchFormItem.vue";
import { GlobalStore } from "@/store";
import mittBus from "@/utils/mittBus";
import type { FormRules } from "element-plus";
import type { PropType } from "vue";
import { Delete, Search, ArrowDown, ArrowUp } from "@element-plus/icons-vue";

const globalStore = GlobalStore();
const emit = defineEmits(["find-by-page", "handle-reset", "handle-insert"]);
const props = defineProps({
	data: {
		type: Object,
		default: {}
	},
	rules: {
		type: Object as PropType<FormRules>,
		default: {}
	},
	fieldArray: {
		type: Array<Form.FieldProps>,
		default: {}
	},
	showOperate: {
		type: Boolean,
		default: true
	},
	showSearch: {
		type: Boolean,
		default: true
	},
	showReset: {
		type: Boolean,
		default: true
	},
	showCollapse: {
		type: Boolean,
		default: true
	}
});
const collapsed = ref(true);
const formSize = globalStore.themeConfig.assemblySize;
const formOpts = reactive<Form.FormOptions>({
	data: props.data,
	rules: props.rules,
	fieldArray: props.fieldArray
});

const findByPage = () => {
	emit("find-by-page", formOpts.data);
};
const handleReset = () => {
	emit("handle-reset");
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.operation {
	// margin-bottom: 10px;
	display: flex;
	justify-content: flex-end;
}
.single-row {
	height: 50px;
	overflow: hidden;
}
</style>
