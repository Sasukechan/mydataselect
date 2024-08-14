import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/es/locale/lang/zh-cn'

import App from './myapp.vue'


createApp(App).use(ElementPlus,{locale}).mount('#app')
