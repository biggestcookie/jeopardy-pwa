import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/_imports.scss";
import "./assets/styles/_variables.scss";
import { router } from "./config/router";

const app = createApp(App);
app.use(IonicVue);
app.use(router);
app.use(createPinia());

router.isReady().then(() => {
  app.mount("#app");
});
