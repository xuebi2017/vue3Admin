import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { wrapperEnv } from "./src/utils/getEnv";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	//获取.env开头文件中的以VITE_开头的变量
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		// ...
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
			// 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
			// extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
		},
		base: "./", // 设置打包路径
		css: {
			preprocessorOptions: {
				scss: {
					// additionalData: `@import "@/assets/styles/var.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// 跨域代理配置
			proxy: {
				"/api": {
					target: "http://192.168.10.81:8080",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		plugins: [
			vue(),
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// ...
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			})
		]
	};
});
