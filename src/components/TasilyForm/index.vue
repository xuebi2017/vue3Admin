<template>
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
			<TasilyGrid ref="gridRef" :gap="[20, 0]">
				<TasilyGridItem v-for="(item, index) in fieldArray" :key="item.field" :index="index">
					<el-form-item :label="`${item.label} :`" :prop="item.field">
						<FormItem :column="item" :form-data="ruleForm" />
					</el-form-item>
				</TasilyGridItem>
			</TasilyGrid>
			<el-form-item v-if="showFooter">
				<el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
				<el-button @click="resetForm(ruleFormRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { PropType } from "vue";
import TasilyGrid from "@/components/TasilyGrid/index.vue";
import TasilyGridItem from "@/components/TasilyGrid/components/TasilyGridItem.vue";
import FormItem from "./components/FormItem.vue";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();
const formSize = globalStore.themeConfig.assemblySize;
const ruleFormRef = ref<FormInstance>();
const props = defineProps({
	//表单是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//表单是否默认显示提交/重置按钮
	showFooter: {
		type: Boolean,
		default: true
	},
	//表单填写规则
	rules: {
		type: Object as PropType<FormRules>,
		default: () => {}
	},
	//表单数据
	data: {
		type: Object,
		default: () => {
			return {};
		}
	},
	//表单inline
	inline: {
		type: Boolean,
		default: false
	},
	//表单label宽度
	labelWidth: {
		type: [Number, String],
		default: "80px"
	},
	//表单元素
	fieldArray: {
		type: Array<Form.FieldProps>,
		default: () => {
			return [];
		}
	},
	//表单元素
	submit: {
		type: Function,
		default: () => {}
	}
});
const ruleForm = reactive(props.data);
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log("submit!");
			props.submit();
		} else {
			console.log("error submit!", fields);
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	console.log("reset!");
	formEl.resetFields();
};
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
