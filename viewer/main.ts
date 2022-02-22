import 'virtual:windi.css'
import { createApp } from 'vue';
import router from './router';
import Viewer from './Viewer.vue';

const app = createApp(Viewer);
app.use(router);
app.mount('#app');
