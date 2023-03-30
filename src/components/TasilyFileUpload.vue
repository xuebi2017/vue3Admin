<template>
	<div class="upload-box">
		<el-upload
			v-model:file-list="fileList"
			:multiple="true"
			:class="['upload', disabled ? 'disabled' : '']"
			action="#"
			:disabled="disabled"
			:limit="limit"
			:drag="true"
			:accept="fileType.join(',')"
			:http-request="handleHttpUpload"
			:before-upload="beforeUpload"
			:on-exceed="handleExceed"
			:on-success="uploadSuccess"
			:on-error="uploadError"
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<template #tip>
				<div class="el-upload__tip">
					<el-tag v-if="showTag" :size="globalStore.themeConfig.assemblySize"
						>请上传 {{ fileType.join("，") }} 标准格式文件，单个文件最大为 {{ fileSize }} M</el-tag
					>
				</div>
			</template>
		</el-upload>
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
		default: 50
	},
	fileType: {
		type: Array,
		default: () => [".pdf", ".doc", ".docx"]
	},
	height: {
		type: [Number, String],
		default: "200px"
	},
	width: {
		type: [Number, String],
		default: "365px"
	}
});

const globalStore = GlobalStore();
let fileList = ref<UploadUserFile[]>(props.fileList);
enum fileTypes {
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document" = ".docx",
	"application/msword" = ".doc",
	"application/pdf" = ".pdf"
}
type fileTypesAllSpell =
	| "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	| "application/msword"
	| "application/pdf";

const handleHttpUpload = async (options: UploadRequestOptions) => {};
const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
	console.log("🚀 ~ file: TasilyFileUpload.vue:88 ~ rawFile:", rawFile);
	if (!props.fileType.includes(fileTypes[rawFile.type as fileTypesAllSpell])) {
		ElMessage.error("文件格式不被支持!");
		return false;
	} else if (rawFile.size / 1024 / 1024 > props.fileSize) {
		ElMessage.error(`单个文件不得超过${props.fileSize}M!`);
		return false;
	}
	return true;
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
	ElMessage.warning(
		`最多上传 ${props.limit} 个文件, 您当前选择了 ${files.length} 个文件, 加起来总共已选择 ${
			files.length + uploadFiles.length
		} 个文件！`
	);
};
const uploadSuccess = (response: { fileUrl: string } | undefined, uploadFile: UploadFile) => {
	if (!response) return;
	uploadFile.url = response.fileUrl;
	ElMessage({
		message: "文件上传成功！",
		type: "success"
	});
};
const uploadError = () => {
	ElMessage.error("文件上传失败，请您重新上传！");
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.upload-box {
	:deep(.el-upload--text.is-drag) {
		width: v-bind(width);
		height: v-bind(height);
	}
}
</style>
