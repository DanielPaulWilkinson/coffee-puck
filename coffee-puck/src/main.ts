import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faHome, faCoffee, faChartPie} from "@fortawesome/free-solid-svg-icons";

library.add([faStar, faHome, faCoffee, faChartPie]);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.mount('#app');
