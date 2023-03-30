<template>
	<div>
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
					<slot />
				</div>
			</el-scrollbar>
			<!-- 弹窗底部 -->
			<template v-if="showFooter" #footer>
				<span class="dialog-footer">
					<el-button @click="handleCancel">取消</el-button><el-button type="primary" @click="handleSubmit">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted, watch } from "vue";
import type { PropType } from "vue";
const props = defineProps({
	//弹窗显示和隐藏
	visible: {
		type: Boolean,
		default: false
	},
	//弹窗显示和隐藏
	showFooter: {
		type: Boolean,
		default: true
	},
	//弹窗显示和隐藏
	fullScreen: {
		type: Boolean,
		default: false
	},
	//弹窗标题
	title: {
		type: String,
		default: ""
	},
	//弹窗宽度
	width: {
		type: [String, Number],
		default: "1000px"
	},
	//确认按钮
	ok: {
		type: Function,
		default: () => {}
	},
	//取消按钮
	hide: {
		type: Function,
		default: () => {}
	}
});
let fullScreen = ref(props.fullScreen);
let dialogVisible = ref(props.visible);
let dialogTitle = ref(props.title);
let fullScreenContent = ref("最大化");
const handleCancel = () => {
	console.log("hide!!!!");
	props.hide();
};
const handleSubmit = () => {
	props.ok();
};

const changeScreen = () => {
	fullScreen.value = !fullScreen.value;
	fullScreenContent.value = fullScreenContent.value === "最大化" ? "最小化" : "最大化";
};
watch(
	() => props.visible,
	visible => {
		dialogVisible.value = visible;
		dialogTitle.value = props.title;
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
