<template>
	<el-input-number
		:disabled="disable"
		size="mini"
		clearable
		:min="min"
		:max="max"
		:step="step"
		:step-strictly="stepStrictly"
		:precision="precision"
		:controls="controls"
		:value="value"
		placeholder="请输入"
		v-model="content"
		@blur="handleNumBlur"
		@input="handleNumInput"
		@change="handleNumChange"
		@focus="handleNumFocus"
	/>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
	disable: {
		type: Boolean,
		default: false
	},
	value: {
		type: Number,
		default: undefined
	},
	min: {
		type: Number,
		default: -Infinity
	},
	max: {
		type: Number,
		default: Infinity
	},
	step: {
		type: Number,
		default: 1
	},
	stepStrictly: {
		type: Boolean,
		default: false
	},
	precision: {
		type: Number,
		default: undefined
	},
	controls: {
		type: Boolean,
		default: true
	}
});

const emits = defineEmits(["blur", "input", "change", "focus"]);

let content = ref(undefined);
const handleNumBlur = (val: number) => {
	emits("blur", val);
};
const handleNumInput = (val: number) => {
	emits("input", val);
};
const handleNumChange = (val: number) => {
	emits("change", val);
};
const handleNumFocus = (val: number) => {
	emits("focus", val);
};
onMounted(() => {});
</script>
<style lang="scss" scoped></style>
