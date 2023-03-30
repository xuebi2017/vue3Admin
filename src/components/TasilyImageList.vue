<template>
	<div class="upload-box">
		<el-upload
			v-model:file-list="fileList"
			:class="['upload', disabled ? 'disabled' : '', drag ? 'no-border' : '']"
			action="#"
			list-type="picture-card"
			:disabled="disabled"
			:on-preview="handlePictureCardPreview"
		>
			<el-icon><Plus /></el-icon>
		</el-upload>
		<el-tag v-if="showTag" :size="globalStore.themeConfig.assemblySize">{{ tagTxt }}</el-tag>
		<el-image-viewer v-if="dialogVisible" @close="dialogVisible = false" :url-list="[dialogImageUrl]" />
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GlobalStore } from "@/store";
import type { UploadProps, UploadUserFile } from "element-plus";

const props = defineProps({
	fileList: {
		type: Array<UploadUserFile>,
		default: () => []
	},
	drag: {
		type: Boolean,
		default: true
	},
	showTag: {
		type: Boolean,
		default: false
	},
	tagTxt: {
		type: String,
		default: ""
	},
	disabled: {
		type: Boolean,
		default: true
	},
	height: {
		type: [Number, String],
		default: "150px"
	},
	width: {
		type: [Number, String],
		default: "150px"
	},
	borderRadius: {
		type: [Number, String],
		default: "8px"
	}
});

const globalStore = GlobalStore();
let fileList = ref<UploadUserFile[]>(props.fileList);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
	dialogImageUrl.value = uploadFile.url!;
	dialogVisible.value = true;
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.upload-box {
	:deep(.el-upload--picture-card) {
		display: none;
	}

	:deep(.disabled) {
		.el-upload--picture-card,
		.el-upload-dragger {
			cursor: not-allowed;
			background: var(--el-disabled-bg-color) !important;
			border: 1px dashed var(--el-border-color-darker);
			&:hover {
				border-color: var(--el-border-color-darker) !important;
			}
		}
	}
	.no-border {
		:deep(.el-upload--picture-card) {
			border: none !important;
		}
	}
	:deep(.upload) {
		.el-upload-dragger {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			padding: 0;
			overflow: hidden;
			border: 1px dashed var(--el-border-color-darker);
			border-radius: v-bind(borderRadius);
			&:hover {
				border: 1px dashed var(--el-color-primary);
			}
		}
		.el-upload-dragger.is-dragover {
			background-color: var(--el-color-primary-light-9);
			border: 2px dashed var(--el-color-primary) !important;
		}
		.el-upload-list__item,
		.el-upload--picture-card {
			width: v-bind(width);
			height: v-bind(height);
			background-color: transparent;
			border-radius: v-bind(borderRadius);
		}
		.upload-image {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		.upload-handle {
			position: absolute;
			top: 0;
			right: 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			cursor: pointer;
			background: rgb(0 0 0 / 60%);
			opacity: 0;
			transition: var(--el-transition-duration-fast);
			.handle-icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 0 6%;
				color: aliceblue;
				.el-icon {
					margin-bottom: 15%;
					font-size: 140%;
				}
				span {
					font-size: 100%;
				}
			}
		}
		.el-upload-list__item {
			&:hover {
				.upload-handle {
					opacity: 1;
				}
			}
		}
		.upload-empty {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 12px;
			line-height: 30px;
			color: var(--el-color-info);
			.el-icon {
				font-size: 28px;
				color: var(--el-text-color-secondary);
			}
		}
	}
	.el-upload__tip {
		line-height: 15px;
		text-align: center;
	}
}
</style>
