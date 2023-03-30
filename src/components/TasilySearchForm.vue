<template>
	<div class="search-form-box flx-justify-between">
		<tasily-form v-bind="formOpts"></tasily-form>
		<div v-if="showOperate" class="operation">
			<el-button v-if="showAdd" :size="globalStore.themeConfig.assemblySize" type="primary" @click="findByPage">查询</el-button>
			<el-button v-if="showReset" :size="globalStore.themeConfig.assemblySize" type="primary" @click="handleReset(ruleFormRef)"
				>重置</el-button
			>
			<el-button v-if="showInsert" :size="globalStore.themeConfig.assemblySize" type="primary" @click="handleInsert"
				>添加</el-button
			>
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import TasilyForm from "@/components/TasilyForm.vue";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();
const emit = defineEmits(["find-by-page", "handle-reset", "handle-insert"]);
const props = defineProps({
	data: {
		type: Object,
		default: {}
	},
	rules: {
		type: Object,
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
	showAdd: {
		type: Boolean,
		default: true
	},
	showReset: {
		type: Boolean,
		default: true
	},
	showInsert: {
		type: Boolean,
		default: true
	}
});
const formOpts = reactive<Form.FormOptions>({
	showFooter: false,
	inline: true,
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
const handleInsert = () => {
	emit("handle-insert");
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.operation {
	margin-bottom: 18px;
}
</style>
