import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)
app.mount('#app')
