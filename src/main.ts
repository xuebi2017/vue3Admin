import { createApp } from "vue";
import App from "./App.vue";
/************element相关*************/
// element plus
import ElementPlus from "element-plus";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";

// vue Router
import router from "./router";

const app = createApp(App);
app.use(router).use(ElementPlus, { size: "small", zIndex: 3000 }).mount("#app");
