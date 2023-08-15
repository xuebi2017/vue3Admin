<template>
	<div class="login-box">
		<div class="login">
			<div>
				<div class="nercar" />
				<div class="nercar-title">北科工研</div>
				<div class="headLogo" />
				<div class="logoTitle">{{ title }}</div>
				<div class="loginForm">
					<el-form ref="ruleForm" :rules="rules" :model="loginInfo" label-width="0px">
						<el-form-item label="" prop="account">
							<el-input v-model="loginInfo.account" placeholder="请输入用户名" />
						</el-form-item>
						<el-form-item label="" prop="password">
							<el-input v-model="loginInfo.password" placeholder="请输入密码" show-password />
						</el-form-item>
					</el-form>
					<el-button class="btnLog" type="primary" :loading="loading" @click="login">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import router from "@/router";
import { GlobalStore } from "@/store";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import http from "@/http";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
import user from "@/assets/json/user.json";
import { HOME_URL } from "@/config";

const globalStore = GlobalStore();

const ruleForm = ref<FormInstance>();
const loginInfo = reactive({
	account: "",
	password: "" //123456
});
const rules = reactive<FormRules>({
	account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const title = "智慧磨辊间信息化平台";
let loading = ref(false);
const login = async () => {
	await ruleForm.value!.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			// let res = await http.post("/roll_mgcold/doLoginAll", loginInfo);
			// if (res.status === 2000) {
			// 	ElMessage({
			// 		type: "success",
			// 		message: "登录成功"
			// 	});
			// 	saveMsg(res.data);
			// }
			let res: User.UserInfo = user;
			saveMsg({ user: res });
		} catch (e) {
		} finally {
			loading.value = false;
		}
	});
};
type loginInfo = {
	user: User.UserInfo;
	// menus: Menu.MenuOptions[];
	// roles: string;
};

const saveMsg = (res: loginInfo) => {
	globalStore.$patch(state => {
		state.userInfo = res.user;
		// state.menus = res.menus;
		state.menus = DynamicRouter.data;
		state.loginToken = {
			userId: res.user.indocno,
			sname: encodeURI(res.user.sname)
		};
	});
	loading.value = false;
	router.push({
		path: HOME_URL
	});
};
onMounted(() => {});
</script>
<style scoped>
.login-box {
	background: url("../../assets/images/guide-bg.png") center center no-repeat;
	background-size: cover;
	height: 100vh;
}
.nercar {
	margin: 10px 2px 2px 10px;
	float: left;
	width: 40px;
	height: 40px;
	background: url("../../assets/images/nercar.png") no-repeat;
}
.nercar-title {
	margin: 10px 2px 2px 2px;
	font-family: "KaiTi";
	color: #c10001;
	font-size: 18px;
	font-weight: 900;
	float: left;
	width: 300px;
	height: 40px;
	line-height: 40px;
}
.login {
	box-shadow: 0 2px 12px 0;
	border-radius: 10px;
	font-weight: 900;
	box-shadow: 0 2px 12px 0;
	background-color: #fff;
	top: 130px;
	margin: auto;
	width: 400px;
	height: 450px;
	left: 50%;
	transform: translate(-50%, 0%);
	position: absolute;
}
.logoTitle {
	text-align: center;
	align-items: center;
	font-weight: 800;
	margin: auto;
	color: #1e1e1e;
	line-height: 35px;
	font-size: 28px;
}
.headLogo {
	width: 100%;
	height: 70px;
	display: flex;
	cursor: pointer;
	margin: 5px 163px;
	background: url("../../assets/images/red-masteel.png") no-repeat;
	text-align: center;
}
.loginForm {
	width: 290px;
	margin: 120px 50px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}
.btnLog {
	width: 100%;
	margin-top: 5px;
}
</style>
