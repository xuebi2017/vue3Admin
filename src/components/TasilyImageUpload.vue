<template>
	<div class="upload-box">
		<el-upload
			v-model:file-list="fileList"
			:multiple="true"
			:class="['upload', disabled ? 'disabled' : '', drag ? 'no-border' : '']"
			action="#"
			list-type="picture-card"
			:disabled="disabled"
			:limit="limit"
			:drag="drag"
			:accept="fileType.join(',')"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:before-remove="beforeRemove"
			:http-request="handleHttpUpload"
			:before-upload="beforeUpload"
			:on-exceed="handleExceed"
			:on-success="uploadSuccess"
			:on-error="uploadError"
		>
			<el-icon><Plus /></el-icon>
			<template #tip>
				<div class="el-upload__tip">
					<el-tag v-if="showTag" :size="globalStore.themeConfig.assemblySize"
						>请上传 {{ fileType.join(",") }} 标准格式文件，单张图片最大为 {{ fileSize }} M</el-tag
					>
				</div>
			</template>
		</el-upload>
		<el-image-viewer v-if="dialogVisible" @close="dialogVisible = false" :url-list="[dialogImageUrl]" />
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import { GlobalStore } from "@/store";
import type { UploadProps, UploadFile, UploadUserFile, UploadRequestOptions } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";

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
		default: true
	},
	disabled: {
		type: Boolean,
		default: false
	},
	limit: {
		type: Number,
		default: 10
	},
	fileSize: {
		type: Number,
		default: 10
	},
	fileType: {
		type: Array,
		default: () => ["image/jpeg", "image/png", "image/gif"]
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
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(
		() => true,
		() => false
	);
};
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
};
const handleHttpUpload = async (options: UploadRequestOptions) => {};
const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
	if (!props.fileType.includes(rawFile.type)) {
		ElMessage.error("图片格式不被支持!");
		return false;
	} else if (rawFile.size / 1024 / 1024 > props.fileSize) {
		ElMessage.error(`单个图片不得超过${props.fileSize}M!`);
		return false;
	}
	return true;
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
	ElMessage.warning(
		`最多上传 ${props.limit} 张图片, 您当前选择了 ${files.length} 张图片, 加起来总共已选择 ${
			files.length + uploadFiles.length
		} 张图片！`
	);
};
const uploadSuccess = (response: { fileUrl: string } | undefined, uploadFile: UploadFile) => {
	if (!response) return;
	uploadFile.url = response.fileUrl;
	ElMessage({
		message: "图片上传成功！",
		type: "success"
	});
};
const uploadError = () => {
	ElMessage.error("图片上传失败，请您重新上传！");
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.upload-box {
	// 去除按delete 键可删除提示
	:deep(.el-upload-list__item.is-success:focus:not(:hover)) {
		display: none !important;
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
