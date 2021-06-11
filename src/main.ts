import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import '@/assets/custom.scss';
// import "bootstrap";

import 'bootstrap/dist/js/bootstrap.js';

createApp(App)
  .use(router)
  .mount("#app");
