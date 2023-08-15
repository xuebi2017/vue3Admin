<template>
	<el-dialog
		v-model="dialogVisible"
		:title="dialogTitle"
		draggable
		class="dialog-style"
		:fullscreen="fullScreen"
		:show-close="false"
		:width="typeof width === 'number' ? width + 'px' : width"
		append-to-body
		@close="handleCancel"
	>
		<template #header>
			<div class="dialog-header">
				<span>{{ title }}</span>
				<div class="right-btn">
					<!-- 全屏按钮 -->
					<el-tooltip class="box-item" effect="dark" :content="fullScreenContent" placement="bottom">
						<el-icon @click="changeScreen"><FullScreen /></el-icon>
					</el-tooltip>
					<!-- 关闭按钮 -->
					<el-tooltip class="box-item" effect="dark" content="关闭" placement="bottom">
						<el-icon @click="handleCancel"><Close /></el-icon>
					</el-tooltip>
				</div></div
		></template>
		<!-- 弹窗中间body -->
		<el-scrollbar>
			<div class="dialog-body">
				<div class="form-box">
					<el-form
						ref="ruleFormRef"
						:disabled="disabled"
						:rules="rules"
						:model="ruleForm"
						:size="formSize"
						:inline="inline"
						:label-width="typeof labelWidth === 'number' ? labelWidth + 'px' : labelWidth"
					>
						<TasilyGrid ref="gridRef" :gap="[20, 0]" :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }">
							<TasilyGridItem v-for="(item, index) in fieldArray" :key="item.field" :index="index">
								<el-form-item :label="`${item.label} :`" :prop="item.field">
									<FormItem :column="item" :form-data="ruleForm" />
								</el-form-item>
							</TasilyGridItem>
						</TasilyGrid>
					</el-form>
				</div>
			</div>
		</el-scrollbar>
		<!-- 弹窗底部 -->
		<template v-if="showFooter" #footer>
			<span class="dialog-footer">
				<el-button @click="handleCancel">取消</el-button
				><el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts" name="TasilyFormDialog">
import http from "@/http";
import { ref, reactive, onMounted, watch } from "vue";
// import type { FormInstance, FormRules } from "element-plus";
import type { FormInstance } from "element-plus";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import TasilyGrid from "@/components/TasilyGrid/index.vue";
import TasilyGridItem from "@/components/TasilyGrid/components/TasilyGridItem.vue";
import FormItem from "@/components/TasilyForm/components/FormItem.vue";
import type { PropType } from "vue";
import { GlobalStore } from "@/store";
import { FormDialog } from "./interface";
import { dialogWidth } from "@/constants";

const globalStore = GlobalStore();
const formSize = globalStore.themeConfig.assemblySize;
const ruleFormRef = ref<FormInstance>();
const props = withDefaults(defineProps<FormDialog>(), {
	visible: false,
	showFooter: false,
	fullScreen: false,
	title: "",
	width: dialogWidth(),
	disabled: false,
	inline: false,
	labelWidth: "80px",
	data: () => ({}),
	ok: () => {},
	hide: () => {}
});
let fullScreen = ref(props.fullScreen);
let dialogVisible = ref(props.visible);
let dialogTitle = ref(props.title);
let fullScreenContent = ref("最大化");
let loading = ref(false);
const handleCancel = () => {
	props.hide();
};
const handleSubmit = async () => {
	loading.value = true;
	await props.ok(ruleForm);
	loading.value = false;
};
let ruleForm = ref(props.data);
const changeScreen = () => {
	fullScreen.value = !fullScreen.value;
	fullScreenContent.value = fullScreenContent.value === "最大化" ? "最小化" : "最大化";
};
watch(
	() => props.visible,
	visible => {
		dialogVisible.value = visible;
		dialogTitle.value = props.title;
		ruleForm.value = props.data;
	}
);
onMounted(() => {});
</script>
<style lang="scss" scoped>
.dialog-header {
	line-height: var(--el-dialog-font-line-height);
	font-size: var(--el-dialog-title-font-size);
	color: var(--el-text-color-primary);
	.right-btn {
		float: right;
		.el-icon {
			margin-left: 10px;
			color: var(--el-color-info);
			cursor: pointer;
		}
	}
}
</style>
