import { createApp } from "vue";
import App from "./App.vue";
// iconfont css
import "@/assets/styles/iconfont/iconfont.scss";
/************element相关*************/
// element plus
import ElementPlus from "element-plus";
// element icons
import * as elementIcons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/assets/styles/darkStyle.scss";
//自定义的马钢(mg)模式
import "@/assets/styles/mgStyle.scss";
//自定义的日常模式
import "@/assets/styles/normalStyle.scss";

// vue Router
import router from "./router";

// pinia store
import pinia from "./store";

import TasilyDialog from "@/components/TasilyDialog.vue";
import TasilyForm from "@/components/TasilyForm/index.vue";
import TasilyFormDialog from "@/components/TasilyFormDialog/index.vue";
import TasilySearchForm from "@/components/TasilySearchForm/index.vue";
import TasilyTable from "@/components/TasilyTable.vue";

const app = createApp(App);
// 注册公共组件
app.component("TasilyTable", TasilyTable);
app.component("TasilyDialog", TasilyDialog);
app.component("TasilyForm", TasilyForm);
app.component("TasilyFormDialog", TasilyFormDialog);
app.component("TasilySearchForm", TasilySearchForm);
// 注册element Icons组件
Object.keys(elementIcons).forEach(key => {
	app.component(key, elementIcons[key as keyof typeof elementIcons]);
});

app.use(router).use(pinia).use(ElementPlus, { size: "small", zIndex: 3000 }).mount("#app");
