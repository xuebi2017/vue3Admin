<template>
	<el-space direction="vertical">
		<div class="content-box">
			<tasily-table
				:fieldArray="fieldArray"
				:table-data="tableData"
				@row-click="clickRow"
				@handle-current-row-change="handleCurrentRowChange"
				:total="total"
				@handle-current-change="handleCurrentChange"
				@handle-size-change="handleSizeChange"
				:page-size="searchInfo.pageSize"
				:current-page="searchInfo.pageIndex"
				index-type="index"
			>
				<template #TableHead>
					<tasily-search-form
						v-bind="searchOpts"
						@find-by-page="findByPage"
						@handle-insert="handleInsert"
						@handle-reset="handleReset"
					></tasily-search-form>
				</template>
				<template #operation="scope">
					<el-button :size="globalStore.themeConfig.assemblySize" type="warning" @click="handleUpdate(scope.row)">修改</el-button>
					<el-button :size="globalStore.themeConfig.assemblySize" type="danger" @click="handleDeleteOne(scope.row)"
						>删除</el-button
					>
				</template>
			</tasily-table>
		</div>
		<div class="content-box">
			<tasily-table
				:fieldArray="fieldArray"
				:table-data="tableData"
				@row-click="clickRow"
				@handle-current-row-change="handleCurrentRowChange"
				:total="total"
				@handle-current-change="handleCurrentChange"
				@handle-size-change="handleSizeChange"
				:page-size="searchInfo.pageSize"
				:current-page="searchInfo.pageIndex"
				index-type="index"
			>
				<template #TableHead>
					<tasily-search-form
						v-bind="searchOpts"
						@find-by-page="findByPage"
						@handle-insert="handleInsert"
						@handle-reset="handleReset"
					></tasily-search-form>
				</template>
				<template #operation="scope">
					<el-button :size="globalStore.themeConfig.assemblySize" type="warning" @click="handleUpdate(scope.row)">修改</el-button>
					<el-button :size="globalStore.themeConfig.assemblySize" type="danger" @click="handleDeleteOne(scope.row)"
						>删除</el-button
					>
				</template>
			</tasily-table>
			<tasily-dialog v-bind="dialogOpts">
				<div class="layout-form">
					<el-alert :title="alertMessage" type="warning" v-if="alertMessage.length > 0" style="margin-bottom: 10px"> </el-alert>
					<tasily-form v-bind="formOpts"></tasily-form>
				</div>
			</tasily-dialog>
		</div>
	</el-space>
</template>
<script setup lang="tsx">
import { ref, reactive } from "vue";
import { GlobalStore } from "@/store";
import { FormInstance } from "element-plus";

const globalStore = GlobalStore();
type user = {
	name: string;
	age: number;
	sex: string;
};
let tableData = reactive<user[]>([
	{
		name: "zyp1",
		age: 18,
		sex: "女"
	},
	{
		name: "zyp2",
		age: 18,
		sex: "男"
	},
	{
		name: "zyp1",
		age: 18,
		sex: "女"
	},
	{
		name: "zyp2",
		age: 18,
		sex: "男"
	},
	{
		name: "zyp1",
		age: 18,
		sex: "女"
	}
	// {
	// 	name: "zyp1",
	// 	age: 18,
	// 	sex: "女"
	// },
	// {
	// 	name: "zyp2",
	// 	age: 18,
	// 	sex: "男"
	// },
	// {
	// 	name: "zyp1",
	// 	age: 18,
	// 	sex: "女"
	// },
	// {
	// 	name: "zyp2",
	// 	age: 18,
	// 	sex: "男"
	// },
	// {
	// 	name: "zyp1",
	// 	age: 18,
	// 	sex: "女"
	// },
	// {
	// 	name: "zyp1",
	// 	age: 18,
	// 	sex: "女"
	// },
	// {
	// 	name: "zyp1",
	// 	age: 18,
	// 	sex: "女"
	// },
	// {
	// 	name: "zyp2",
	// 	age: 18,
	// 	sex: "男"
	// },
	// {
	// 	name: "zyp1",
	// 	age: 18,
	// 	sex: "女"
	// },
	// {
	// 	name: "zyp2",
	// 	age: 18,
	// 	sex: "男"
	// }
]);
let total = ref(0);
let searchOpts = reactive<SearchForm.SearchFormOptions>({
	data: {
		name: "",
		age: 18
	},
	fieldArray: [
		{
			field: "name",
			label: "名字",
			type: "input"
		}
	]
});
let searchInfo = reactive<Search>({
	pageSize: 15,
	pageIndex: 1,
	condition: searchOpts.data
});
const fieldArray = reactive<Table.FieldArrayProps[]>([
	{
		field: "name",
		label: "名字",
		showOverflowTooltip: true
	},
	{
		field: "age",
		label: "年龄"
	},
	{
		field: "sex",
		label: "性别",
		formatter: (row: user) => {
			return <el-tag>{row.sex}</el-tag>;
		}
	}
]);
const alertMessage = "";
let formOpts = reactive<Form.FormOptions>({
	showFooter: false,
	inline: true,
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
	]
});
const dialogOpts = reactive<Dialog.dialogOptions>({
	hide: () => {
		dialogOpts.visible = false;
	},
	ok: () => {
		dialogOpts.hide();
	}
});
const currentRow = ref<user>();

const handleCurrentRowChange = (val: user | undefined) => {
	currentRow.value = val;
};
const handleCurrentChange = (val: number) => {};
const handleSizeChange = (val: number) => {};
const clickRow = (val: user) => {};
const findByPage = async () => {
	console.log("searchInfo", searchInfo);
};
const handleReset = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	console.log("reset!");
	formEl.resetFields();
};
const handleInsert = async () => {
	dialogOpts.title = "添加";
	dialogOpts.visible = true;
};
const handleUpdate = async (row: user) => {
	console.log("🚀 ~ file: index.vue:111 ~ handleUpdate ~ row:", row);
};
const handleDeleteOne = async (row: user) => {};
</script>
