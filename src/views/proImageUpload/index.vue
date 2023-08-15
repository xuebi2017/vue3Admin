<template>
	<el-space direction="vertical" alignment="flex-start">
		<el-card class="card-box">
			<template #header>
				<div class="card-header">
					<span>图片上传</span>
				</div>
			</template>
			<el-form :model="form" label-width="120px">
				<el-form-item label="图片">
					<tasily-image-upload></tasily-image-upload>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card-box">
			<template #header>
				<div class="card-header">
					<span>图片列表</span>
				</div>
			</template>
			<el-form :model="form" label-width="120px">
				<el-form-item label="图片">
					<tasily-image-list v-bind="imageListOpts"></tasily-image-list>
				</el-form-item>
			</el-form>
		</el-card>
	</el-space>
</template>
<script setup lang="ts">
import http from "@/http";
import { ref, reactive, onMounted } from "vue";
import TasilyImageUpload from "@/components/TasilyImageUpload.vue";
import TasilyImageList from "@/components/TasilyImageList.vue";

const form = reactive({});
const imageListOpts = {
	fileList: [
		{
			name: "food.jpeg",
			url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
		},
		{
			name: "food.jpeg",
			url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
		},
		{
			name: "food.jpeg",
			url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
		}
	]
};
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
