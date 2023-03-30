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
			<template v-for="(item, index) in fieldArray" :key="index">
				<el-form-item :prop="item.field" :label-width="item.labelWidth" :label="item.label">
					<!-- input相关 -->
					<el-input
						:disabled="item.disabled"
						v-if="item.type === 'input'"
						v-model="ruleForm[item.field]"
						placeholder="请输入"
						clearable
					/>
					<el-input
						:disabled="item.disabled"
						v-else-if="item.type === 'input-password'"
						v-model="ruleForm[item.field]"
						show-password
						placeholder="请输入"
						clearable
					/>
					<el-input
						:disabled="item.disabled"
						v-else-if="item.type === 'input-textarea'"
						:width="item.textareaWidth"
						:autosize="item.autosize"
						v-model="ruleForm[item.field]"
						placeholder="请输入"
						:rows="item.rows"
						type="textarea"
						clearable
					/>
					<el-input-number
						:disabled="item.disabled"
						v-else-if="item.type === 'input-number'"
						v-model="ruleForm[item.field]"
						placeholder="请输入"
						type="number"
						clearable
					/>
					<el-autocomplete
						:disabled="item.disabled"
						v-else-if="item.type === 'input-autocomplete'"
						v-model="ruleForm[item.field]"
						:fetch-suggestions="item.querySearchAsync"
						placeholder="请输入"
						clearable
					/>
					<!-- select相关 -->
					<el-select
						:disabled="item.disabled"
						v-else-if="item.type === 'select-value'"
						v-model="ruleForm[item.field]"
						placeholder="请选择"
						clearable
					>
						<el-option v-for="option in item.options" :key="option.key" :label="option.value" :value="option.value" />
					</el-select>
					<el-select
						:disabled="item.disabled"
						v-else-if="item.type === 'select-key'"
						v-model="ruleForm[item.field]"
						placeholder="请选择"
						clearable
					>
						<el-option v-for="option in item.options" :key="option.key" :label="option.value" :value="Number(option.key)" />
					</el-select>
					<el-select
						:disabled="item.disabled"
						v-else-if="item.type === 'select-multiple-value'"
						v-model="ruleForm[item.field]"
						clearable
						placeholder="请选择"
						multiple
					>
						<el-option v-for="option in item.options" :key="option.key" :label="option.value" :value="option.value" />
					</el-select>
					<el-select
						:disabled="item.disabled"
						v-else-if="item.type === 'select-multiple-key'"
						v-model="ruleForm[item.field]"
						clearable
						placeholder="请选择"
						multiple
					>
						<el-option v-for="option in item.options" :key="option.key" :label="option.value" :value="Number(option.key)" />
					</el-select>
					<!-- time相关 -->
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'datetime'"
						v-model="ruleForm[item.field]"
						clearable
						placeholder="请选择"
						value-format="yyyy-MM-dd HH:mm:ss"
						type="datetime"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'datetimerange'"
						v-model="ruleForm[item.field]"
						clearable
						type="datetimerange"
						value-format="yyyy-MM-dd HH:mm:ss"
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'date'"
						v-model="ruleForm[item.field]"
						clearable
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="请选择"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'daterange'"
						v-model="ruleForm[item.field]"
						clearable
						type="daterange"
						value-format="yyyy-MM-dd"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'dates'"
						v-model="ruleForm[item.field]"
						clearable
						type="dates"
						value-format="yyyy-MM-dd"
						placeholder="请选择"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'month'"
						v-model="ruleForm[item.field]"
						clearable
						type="month"
						value-format="yyyy-MM"
						placeholder="请选择"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'monthrange'"
						v-model="ruleForm[item.field]"
						clearable
						type="monthrange"
						value-format="yyyy-MM"
						range-separator="至"
						start-placeholder="开始月份"
						end-placeholder="结束月份"
					/>
					<el-date-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'week'"
						v-model="ruleForm[item.field]"
						clearable
						type="week"
						value-format="yyyy-WW"
						placeholder="请选择"
					/>
					<el-time-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'time'"
						v-model="ruleForm[item.field]"
						clearable
						value-format="HH:mm:ss"
						placeholder="请选择"
					/>
					<el-time-picker
						:disabled="item.disabled"
						v-else-if="item.type === 'timerange'"
						v-model="ruleForm[item.field]"
						is-range
						clearable
						range-separator="至"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						placeholder="选择时间范围"
					/>
					<el-checkbox
						:disabled="item.disabled"
						v-else-if="item.type === 'checkbox'"
						:true-label="1"
						:false-label="0"
						v-model="ruleForm[item.field]"
					></el-checkbox>
					<div v-else-if="item.type === 'editor'">
						<Toolbar />
						<Editor v-model="ruleForm[item.field]" />
					</div>
				</el-form-item>
			</template>
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
