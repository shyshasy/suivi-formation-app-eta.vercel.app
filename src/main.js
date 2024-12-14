import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { createApp } from 'vue';
import { createPinia } from "pinia";
import router from "@router";
import Toast, { POSITION } from 'vue-toastification';

import 'vue-toastification/dist/index.css';


import App from './App.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import { faUserGraduate, faBook, faClipboardCheck, faMoneyBillWave, faCreditCard, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faUserGraduate, faBook, faClipboardCheck, faMoneyBillWave, faCreditCard, faEye, faEdit, faTrash);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);


app.component('font-awesome-icon', FontAwesomeIcon);
app.use(Toast, {
    // Options par défaut
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
  });
  
app.mount('#app');
