<template>
	<div>
		<tasily-table
			:fieldArray="fieldArray"
			:table-data="tableData"
			:showLabel="false"
			@row-click="clickRow"
			title=""
			:operationWidth="350"
			@handle-current-row-change="handleCurrentRowChange"
			:total="total"
			@handle-current-change="handleCurrentChange"
			@handle-size-change="handleSizeChange"
			:page-size="searchInfo.pageSize"
			:current-page="searchInfo.pageIndex"
			index-type="index"
		>
			<template #operation="scope">
				<el-button
					v-if="showPreview"
					:size="globalStore.themeConfig.assemblySize"
					type="success"
					@click="handlePreview(scope.row)"
					>预览</el-button
				>
				<el-button
					v-if="showDownload"
					:size="globalStore.themeConfig.assemblySize"
					type="success"
					@click="handleDownload(scope.row)"
					>下载</el-button
				>
				<el-button
					v-if="showDelete"
					:size="globalStore.themeConfig.assemblySize"
					type="danger"
					@click="handleDeleteOne(scope.row)"
					>删除</el-button
				>
			</template>
		</tasily-table>
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import { GlobalStore } from "@/store";
const props = defineProps({
	showPreview: {
		type: Boolean,
		default: true
	},
	showDownload: {
		type: Boolean,
		default: true
	},
	showDelete: {
		type: Boolean,
		default: true
	},
	tableData: {
		type: Array,
		default: []
	}
});

const globalStore = GlobalStore();
const fieldArray = reactive<Table.FieldArrayProps[]>([
	{
		field: "name",
		label: "文件名",
		width: 450,
		showOverflowTooltip: true
	},
	{
		field: "version",
		label: "版本号"
	},
	{
		field: "uploadName",
		label: "上传人"
	},
	{
		field: "uploadTime",
		label: "上传时间"
	}
]);
let total = ref(0);
let searchOpts = reactive<SearchForm.SearchFormOptions>({
	data: {
		name: ""
	}
});
let searchInfo = reactive<Search>({
	pageSize: 15,
	pageIndex: 1,
	condition: searchOpts.data
});

type fileType = {
	name: string;
	version: string;
	uploadName: string;
	uploadTime: string;
};

const currentRow = ref<fileType>();

const handleCurrentRowChange = (val: fileType | undefined) => {
	currentRow.value = val;
};
const handleCurrentChange = (val: number) => {};
const handleSizeChange = (val: number) => {};
const clickRow = (val: fileType) => {};
const findByPage = async () => {};
const handlePreview = async (row: fileType) => {};
const handleDownload = async (row: fileType) => {};
const handleDeleteOne = async (row: fileType) => {};
onMounted(() => {
	findByPage();
});
</script>
<style lang="scss" scoped></style>
