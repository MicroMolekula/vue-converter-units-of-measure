import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .provide('bootstrap', bootstrap)
    .mount('#app')
