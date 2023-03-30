<template>
	<el-dropdown trigger="click">
		<span class="el-dropdown-link">
			<i :class="'iconfont icon-user'"></i>
			<i :class="'iconfont icon-arrow-down'" style="margin-left: 2px"></i>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					><el-icon> <Edit /></el-icon>修改密码
				</el-dropdown-item>
				<el-dropdown-item divided>
					<el-icon><SwitchButton /></el-icon>退出登录
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script lang="ts" setup></script>
<style scoped></style>
