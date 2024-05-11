import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./routers";
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(Antd).mount("#app");
