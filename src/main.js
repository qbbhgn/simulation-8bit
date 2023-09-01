import { createApp } from 'vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './css/base.less'
import App from './App.vue'

const app = createApp(App);
app.use(ElementPlus)
app.use(router).mount('#app')
