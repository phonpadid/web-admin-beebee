import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./routers";
import "./assets/layout/index.scss";
import "./assets/main.css";
import { createPinia } from "pinia";
import "reflect-metadata";
import i18nConfig from "@/common/configurations/vuei18n.config";

const app = createApp(App);

app.use(createPinia());
app.use(i18nConfig);
app.use(router);
app.use(Antd).mount("#app");
