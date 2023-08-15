<template>
	<div class="table-box">
		<div class="table-title" v-if="showTitle">
			<span>{{ title }}</span>
		</div>
		<div class="table-search" v-if="showSearch">
			<div class="layout-form">
				<div class="layout-form-body">
					<tasily-search-form v-bind="searchOpts" @find-by-page="findByPage" @handle-reset="handleReset"></tasily-search-form>
				</div>
			</div>
		</div>
		<div class="table-head" v-if="showHead">
			<slot name="tableHead" />
		</div>
		<div class="table-main">
			<!-- :height="tableHeight" -->
			<el-table
				v-loading="loadingFlag"
				ref="tasilyTable"
				:max-height="maxHeight"
				highlight-current-row
				:data="data ?? tableData"
				:row-class-name="rowClassName"
				:summary-method="summaryMethod"
				:span-method="spanMethod"
				:cell-class-name="cellClassName"
				:stripe="tableStripe"
				:key="tableKey"
				:empty-text="loadInfo"
				:show-summary="showSummary"
				border
				@selection-change="selectionChange"
				@current-change="handleCurrentRowChange"
				@row-click="rowClick"
				:size="globalStore.themeConfig.assemblySize"
			>
				<template #empty>
					<div class="message-empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</div>
				</template>
				<el-table-column
					v-if="selection === 'select'"
					:fixed="fixed"
					show-overflow-tooltip
					type="selection"
					align="center"
					width="42"
				/>
				<el-table-column
					v-if="indexType === 'index'"
					:index="formatterTableDataIndex"
					:type="indexType"
					:fixed="fixed"
					:width="indexWidth"
					label="序号"
					align="center"
				/>
				<template v-for="(item, index) in colums" :key="index">
					<el-table-column
						show-overflow-tooltip
						:formatter="item.formatter"
						:fixed="item.fixed"
						:prop="item.field"
						:width="item.width"
						:label="item.label"
						align="center"
					>
					</el-table-column>
				</template>
				<el-table-column label="操作" fixed="right" :width="operationWidth" align="center">
					<template #default="scope">
						<slot name="operation" :row="scope.row" />
					</template>
				</el-table-column>
			</el-table>
			<div>
				<div v-if="tableFoot" class="pagination-border">
					<slot name="TableFoot" />
				</div>
				<div v-show="showPagination" class="pagination-border">
					<el-pagination
						:small="globalStore.themeConfig.assemblySize === 'small' ? true : false"
						:current-page="currentPage"
						:page-sizes="pageSizeList"
						:page-size="pageSize"
						:total="total"
						:pager-count="5"
						class="u-pagination"
						align="center"
						:layout="layout"
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import { TableInstance } from "element-plus";

import { GlobalStore } from "@/store";
import http from "@/http";
const globalStore = GlobalStore();
let loadingFlag = ref(false);
const tasilyTable = ref<TableInstance>();
const emit = defineEmits([
	"row-click",
	"handle-current-row-change",
	"cell-click",
	"cell-dblclick",
	"color-table",
	"expand-change",
	"handle-size-change",
	"handle-current-change",
	"selection-change"
]);
const props = defineProps({
	title: {
		type: String,
		default: "表格title"
	},
	//表格列
	colums: {
		type: Array<Table.ColumProps>,
		default: () => {
			return [];
		}
	},
	//为了强制刷新表格
	tableKey: {
		type: Number,
		default: 0
	},
	// 表格数据
	data: {
		type: Array,
		default: () => []
	},
	// 表格数据
	initParam: {
		type: Object,
		default: () => {}
	},
	requestApi: {
		type: String,
		default: ""
	},
	// 是否显示标签，默认不显示
	showTitle: {
		type: Boolean,
		default: false
	},
	// 是否显示查询框，默认显示
	showSearch: {
		type: Boolean,
		default: true
	},
	// 是否显示添加等按钮，默认显示
	showHead: {
		type: Boolean,
		default: true
	},
	// 是否显示分页，默认显示
	showPagination: {
		type: Boolean,
		default: true
	},
	// 是否显示组件头部，默认显示
	tableSearch: {
		type: Boolean,
		default: true
	},
	// 是否显示组件底部，默认显示
	tableFoot: {
		type: Boolean,
		default: false
	},
	// 分页，每页的数据项数
	pageSizeList: {
		type: Array,
		default: function () {
			return [5, 10, 15, 20, 25, 30];
		}
	},
	//分页元素展示项
	layout: {
		type: String,
		default: "total, sizes, prev, pager, next, jumper"
	},
	//固定序号列
	fixed: {
		type: Boolean,
		default: false
	},
	rowClassName: {
		type: Function,
		default: () => {}
	},
	cellClassName: {
		type: Function,
		default: () => {}
	},
	spanMethod: {
		type: Function,
		default: () => {}
	},
	tableHeight: {
		type: [String, Number],
		default: "calc(100vh - 270px)"
	},
	// 操作列宽度
	operationWidth: {
		type: [Number],
		default: 220
	},
	pageSize: {
		type: Number,
		default: 30
	},
	currentPage: {
		type: Number,
		default: 1
	},
	tableStripe: {
		type: Boolean,
		default: true
	},
	loadInfo: {
		type: String,
		default: "暂无数据"
	},
	indexType: {
		type: String,
		default: "none"
	},
	selection: {
		type: String,
		default: "select"
	},
	showSummary: {
		type: Boolean,
		default: false
	},
	summaryMethod: {
		type: Function,
		default: () => {}
	},
	indexWidth: {
		type: String,
		default: "56"
	},
	loading: {
		type: Boolean,
		default: false
	}
});
watch(
	() => props.loading,
	loading => {
		loadingFlag.value = loading;
	}
);
let maxHeight = ref(`100vh - 55px - 170px`); //55是header高度
const calcTableHeight = () => {
	console.log("calcTableHeight");
	if (globalStore.themeConfig.tabs) {
		maxHeight.value += ` - 40px`;
	}
	if (globalStore.themeConfig.footer) {
		maxHeight.value += ` - 31px`;
	}
	maxHeight.value = `calc(${maxHeight.value})`;
};
let total = ref(0);
let tableData = ref([]);
const findByPage = async () => {
	console.log("findByPage");
	tableData.value = await http.post(props.requestApi, searchInfo);
};
const handleReset = async () => {
	searchInfo.pageIndex = 1;
	searchInfo.condition = {};
	console.log("handleReset");
	findByPage();
};

let searchOpts = reactive<SearchForm.SearchFormOptions>({
	data: props.initParam,
	fieldArray: props.colums.filter(item => item.search) as Form.FieldProps[]
});

let searchInfo = reactive<Search>({
	pageSize: 15,
	pageIndex: 1,
	condition: searchOpts.data
});

const formatterTableDataIndex = (index: number) => {
	var pageIndex = 0;
	if (props.pageSize || props.currentPage) {
		var pageIndex: number = (props.currentPage - 1) * props.pageSize + index + 1;
	} else {
		pageIndex = index + 1;
	}
	return pageIndex;
};
/**
 * @author: wangHongFei
 * @description: 行单击事件
 */
const rowClick = (row: any) => {
	emit("row-click", row);
	tasilyTable.value!.setCurrentRow(row);
};

/**
 * @author: wangHongFei
 * @description: 切换页码
 */
const handleCurrentRowChange = (val: number) => {
	emit("handle-current-row-change", val);
};

/**
 * @author: wangHongFei
 * @description: 每页条数的改变
 */
const handleSizeChange = (val: number) => {
	searchInfo.pageIndex = 1;
	searchInfo.pageSize = val;
	findByPage();
};
/**
 * @author: wangHongFei
 * @description: 切换页码
 */
const handleCurrentChange = (val: number) => {
	searchInfo.pageIndex = val;
	findByPage();
};
const selectionChange = (val: string[]) => {
	emit("selection-change", val);
};
const clearTableSelect = () => {
	tasilyTable.value!.clearSelection();
};

onMounted(() => {
	calcTableHeight();
	findByPage();
});
</script>
<style lang="scss" scoped></style>
