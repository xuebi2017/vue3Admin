<template>
	<div class="content-box">
		<el-space direction="vertical">
			<div class="table-box">
				<tasily-table
					index-type="index"
					:colums="colums"
					:data="tableData"
					:request-api="userListApi"
					:init-param="initParam"
					@handle-current-row-change="handleCurrentRowChange"
					@selection-change="handleSelectionChange"
				>
					<template #tableHead>
						<el-button type="primary" @click="handleInsert">添加</el-button>
						<el-button type="primary" plain @click="handleImport">批量导入</el-button>
						<el-button type="danger" plain @click="handleDelete" :disabled="selectedRows.length == 0"> 批量删除 </el-button>
						<el-button type="primary" plain @click="handleExport">导出</el-button>
					</template>
					<template #operation="scope">
						<el-button :size="globalStore.themeConfig.assemblySize" type="warning" plain @click="handleUpdate(scope.row)"
							>修改</el-button
						>
						<el-button :size="globalStore.themeConfig.assemblySize" type="danger" plain @click="handleDeleteOne(scope.row)"
							>删除</el-button
						>
					</template>
				</tasily-table>
			</div>
		</el-space>
		<tasily-form-dialog v-bind="dialog1Opts" />
		<tasily-dialog v-bind="dialog2Opts">
			<tasily-import-excel v-bind="excelOpts"></tasily-import-excel>
		</tasily-dialog>
	</div>
</template>
<script setup lang="tsx">
import { ref, reactive } from "vue";
import { GlobalStore } from "@/store";
import TasilyImportExcel from "@/components/TasilyImportExcel/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { searchOpts } from "@/constants";

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
		name: "zyp1",
		age: 18,
		sex: "女"
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
	},
	{
		name: "zyp2",
		age: 18,
		sex: "男"
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
	}
]);
const userListApi = ref("/search");
const colums = reactive<Table.ColumProps[]>([
	{
		field: "name",
		label: "名字",
		type: "input",
		search: searchOpts
	},
	{
		field: "age",
		label: "年龄",
		type: "input",
		search: searchOpts
	},
	{
		field: "sex",
		label: "性别",
		type: "select",
		options: [
			{
				label: "男",
				value: 1
			},
			{
				label: "女",
				value: 2
			}
		],
		search: searchOpts,
		formatter: (row: user) => {
			return <el-tag>{row.sex}</el-tag>;
		}
	}
]);
let initParam = reactive({ name: "zyp" });
let formOpts = reactive<Form.FormOptions>({
	inline: true,
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
let excelOpts = {};
const dialog1Opts = reactive<Form.FormOptions & Dialog.DialogOptions>({
	...formOpts,
	hide: () => {
		dialog1Opts.visible = false;
	},
	ok: (val: user) => {
		dialog1Opts.hide();
	}
});
const dialog2Opts = reactive<Dialog.DialogOptions>({
	width: "800px",
	hide: () => {
		dialog2Opts.visible = false;
	},
	ok: () => {
		dialog2Opts.hide();
	}
});
let currentRow = reactive({});
const handleCurrentRowChange = (val: user) => {
	currentRow = val;
};
let selectedRows = ref<user[]>([]);
const handleSelectionChange = (arr: user[]) => {
	selectedRows.value = arr;
};
const handleInsert = async () => {
	dialog1Opts.title = "添加";
	dialog1Opts.visible = true;
	dialog1Opts.data = {};
};
const handleImport = async () => {
	dialog2Opts.title = "批量导入";
	dialog2Opts.visible = true;
};
const handleDelete = async () => {
	ElMessageBox.confirm("确认批量删除数据?", "温馨提示", {
		type: "warning",
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		draggable: true
	})
		.then(() => {
			ElMessage({
				type: "success",
				message: `批量删除成功!`
			});
		})
		.catch(() => {
			ElMessage({ type: "info", message: "已取消操作" });
		});
};
const handleExport = async () => {};
const handleUpdate = async (row: user) => {
	dialog1Opts.title = "修改";
	dialog1Opts.visible = true;
	dialog1Opts.data = row;
};
const handleDeleteOne = async (row: user) => {
	ElMessageBox.confirm("确认删除该行数据?", "温馨提示", {
		type: "warning",
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		draggable: true
	})
		.then(() => {
			ElMessage({
				type: "success",
				message: `删除成功!`
			});
		})
		.catch(() => {
			ElMessage({ type: "info", message: "已取消操作" });
		});
};
</script>
