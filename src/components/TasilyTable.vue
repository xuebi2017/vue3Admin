<template>
	<div class="table-box">
		<div class="table-label" v-if="showLabel">
			<span>{{ label }}</span>
		</div>
		<div class="table-search">
			<div v-if="tableHead">
				<div class="layout-form">
					<div class="layout-form-header" v-if="title">{{ title }}</div>
					<div class="layout-form-body" v-if="title === '查询条件'">
						<slot name="TableHead" />
					</div>
				</div>
			</div>
		</div>
		<div class="table-main">
			<!-- :height="tableHeight" -->
			<el-table
				v-loading="loadingFlag"
				ref="tasilyTable"
				highlight-current-row
				:data="tableData"
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
					width="50"
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
				<template v-for="(item, index) in fieldArray" :key="index">
					<el-table-column
						:show-overflow-tooltip="item.showOverflowTooltip"
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
import { ref, watch } from "vue";
import { TableInstance } from "element-plus";

import { GlobalStore } from "@/store";
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
	label: {
		type: String,
		default: "表格label"
	},
	title: {
		type: String,
		default: "查询条件"
	},
	//表格列
	fieldArray: {
		type: Array<Table.FieldArrayProps>,
		default: () => {
			return [];
		}
	},
	//为了强制刷新表格
	tableKey: {
		type: Number,
		default: 0
	},
	// 表格数据格式
	tableData: {
		type: Array,
		default: () => []
	},
	// 是否显示标签，默认不显示
	showLabel: {
		type: Boolean,
		default: true
	},
	// 是否显示分页，默认显示
	showPagination: {
		type: Boolean,
		default: true
	},
	// 是否显示组件头部，默认显示
	tableHead: {
		type: Boolean,
		default: true
	},
	// 是否显示组件底部，默认显示
	tableFoot: {
		type: Boolean,
		default: false
	},
	// 数据的总条数，用于分页
	total: {
		type: Number,
		default: 0
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
		default: "none"
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
		default: "60"
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
	emit("handle-size-change", val);
};
/**
 * @author: wangHongFei
 * @description: 切换页码
 */
const handleCurrentChange = (val: number) => {
	emit("handle-current-change", val);
};
const selectionChange = (val: string[]) => {
	emit("selection-change", val);
};
const clearTableSelect = () => {
	tasilyTable.value!.clearSelection();
};
</script>
<style lang="scss" scoped></style>
