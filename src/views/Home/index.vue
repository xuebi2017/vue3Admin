<template>
	<div>HOME</div>
</template>
<script setup lang="ts">
import http from "@/http";
import { onMounted } from "vue";
onMounted(() => {
	http.post("/roll_mgjs_xg/rollPrepareSend/findByPage", {
		pageIndex: 1,
		pageSize: 10,
		condition: {}
	});
});
</script>
<style lang=""></style>
