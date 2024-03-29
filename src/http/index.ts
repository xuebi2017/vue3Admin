import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpCode } from "@/enums";
import { checkStatus } from "./checkStatus";
import { ElMessage } from "element-plus";

import router from "@/router";

/**
 * pinia 错误使用说明示例
 * https://github.com/vuejs/pinia/discussions/971
 * https://github.com/vuejs/pinia/discussions/664#discussioncomment-1329898
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#single-page-applications
 */

const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（6s）
	timeout: 6000,
	// 跨域时候允许携带凭证
	withCredentials: true
};

// 实例化axios
const service = axios.create(config);

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
 */
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token: string = "";
		return {
			...config,
			headers: { ...config.headers, "x-access-token": token }
		};
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const { data } = response;
		// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
		if (data.status && data.status !== HttpCode.SUCCESS) {
			ElMessage.error(data.msg);
			return Promise.reject(data);
		}
		// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
		return data;
	},
	async (error: AxiosError) => {
		const { response } = error;
		// 请求超时单独判断，因为请求超时没有 response
		if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
		// 根据响应的错误状态码，做不同的处理
		if (response) checkStatus(response.status);
		// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
		if (!window.navigator.onLine) router.replace("/500");
		return Promise.reject(error);
	}
);

export default service;
