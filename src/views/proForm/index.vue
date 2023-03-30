<template>
	<div>
		<el-card class="card-box">
			<template #header>
				<div class="card-header">
					<span>表单</span>
				</div>
			</template>
			<tasily-form v-bind="formOpts"></tasily-form>
		</el-card>
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import TasilyForm from "@/components/TasilyForm.vue";
const formOpts = reactive<Form.FormOptions>({
	data: {
		name: "zyp",
		age: 18
	},
	rules: {
		name: [{ required: true, message: "请输入名字", trigger: "blur" }],
		age: [{ required: true, message: "请输入年龄", trigger: "blur" }]
	},
	fieldArray: [
		{
			field: "name",
			label: "名字",
			type: "input"
		},
		{
			field: "age",
			label: "年龄",
			type: "input-number"
		}
	],
	submit: () => {
		console.log("submit!!!!");
	}
});
onMounted(() => {});
</script>
<style lang="less" scoped></style>
