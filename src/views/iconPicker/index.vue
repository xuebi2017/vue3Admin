<template>
	<div>
		<el-row :gutter="5">
			<el-col :span="8">
				<el-card class="card-box">
					<e-icon-picker v-model="icon" :options="options" />
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script setup lang="ts">
import http from "@/http";
//图标选择器e-icon-picker
import { eIconPicker } from "e-icon-picker";
import "e-icon-picker/icon/default-icon/symbol.js"; //基本彩色图标库
import "e-icon-picker/index.css"; // 基本样式，包含基本图标
import "font-awesome/css/font-awesome.min.css"; //font-awesome 图标库
import eIconList from "e-icon-picker/icon/default-icon/eIconList.js";
import elementIconList from "e-icon-picker/icon/ele/element-plus.js";
import fontawesomeIconList from "e-icon-picker/icon/fontawesome/font-awesome.v4.7.0.js";
import { ref, reactive, onMounted } from "vue";

const icon = ref("");

const options = {
	addIconList: [...eIconList, ...elementIconList, ...fontawesomeIconList],
	removeIconList: []
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
@import "e-icon-picker/theme/theme.css";
</style>
