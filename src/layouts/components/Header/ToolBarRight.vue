<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<el-space :size="20">
				<SearchMenu id="searchMenu" />
				<Message id="message" />
				<Fullscreen id="fullscreen" />
				<span class="username">Chelly</span>
				<DropDown />
				<ThemeSetting id="themeSetting" />
			</el-space>
		</div>
	</div>
</template>

<script setup lang="ts">
import SearchMenu from "./components/SearchMenu.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Message from "./components/Message.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import DropDown from "./components/DropDown.vue";
</script>

<style scoped lang="scss"></style>
