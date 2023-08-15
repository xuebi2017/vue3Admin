<template>
	<el-dropdown trigger="click" @command="handleCommand">
		<span class="el-dropdown-link">
			<i :class="'iconfont icon-user'"></i>
			<!-- <i :class="'iconfont icon-arrow-down'" style="margin-left: 2px"></i> -->
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="updatePassord"
					><el-icon> <Edit /></el-icon>修改密码
				</el-dropdown-item>
				<el-dropdown-item divided command="loginOut">
					<el-icon><SwitchButton /></el-icon>退出登录
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PasswordDialog from "./PasswordDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null);
const handleCommand = (item: string) => {
	switch (item) {
		case "updatePassord":
			passwordRef.value!.openDialog();
			break;
		case "loginOut":
			loginOut();
			break;
		default:
	}
};
const loginOut = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			//执行退出登录接口
			ElMessage({
				type: "success",
				message: "退出登录成功！"
			});
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "取消退出登录"
			});
		});
};
</script>
<style scoped></style>
