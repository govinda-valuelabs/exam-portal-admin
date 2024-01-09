import { createApp } from 'vue'
import 'vue3-easy-data-table/dist/style.css';
import './style.css'
import App from './App.vue'
import routes from './routes/index.js';

createApp(App).use(routes).mount('#app')
