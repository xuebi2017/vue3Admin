<template>
	<el-space direction="vertical" alignment="flex-start">
		<el-card class="card-box">
			<template #header>
				<div class="card-header">
					<span>文件上传</span>
				</div>
			</template>
			<el-form :model="form" label-width="120px">
				<el-form-item label="文件">
					<tasily-file-upload></tasily-file-upload>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- <el-card class="card-box">
			<template #header>
				<div class="card-header">
					<span>文件列表</span>
				</div>
			</template>
			<tasily-file-list v-bind="fileListOpts"></tasily-file-list>
		</el-card> -->
	</el-space>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import TasilyFileUpload from "@/components/TasilyFileUpload.vue";
// import TasilyFileList from "@/components/TasilyFileList.vue";
const fileListOpts = {
	tableData: [
		{
			name: "新建文本文档.docx",
			version: "V1.0",
			uploadName: "zyp",
			uploadTime: "2023-01-01 00:00:00"
		}
	]
};
const form = reactive({});
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
