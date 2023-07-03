import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueRecaptcha from 'vue-recaptcha-v3'



createApp(App).use(store).use(router).mount("#app");

// .use(VueRecaptcha, {
//   siteKey: '6LcwblolAAAAAEyoNGNj3yb0_7CGivEUAINWMqWm'
// })