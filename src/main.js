import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from 'vue';
import { createPinia } from "pinia";
import router from "@router";

import App from './App.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import { faUserGraduate, faBook, faClipboardCheck, faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons';

library.add(faUserGraduate, faBook, faClipboardCheck, faMoneyBillWave, faCreditCard);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);


app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
