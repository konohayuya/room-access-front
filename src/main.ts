import { createApp } from 'vue'
import App from './App.vue'

// Official Google Material Components
import BalmUI from 'balm-ui'
// BalmJS Team Material Components
// @ts-ignore
import BalmUIPlus from 'balm-ui-plus'
import 'balm-ui-css'
import router from './router'

const app = createApp(App).use(router)

// BalmUI
app.use(BalmUI)
app.use(BalmUIPlus)

app.mount('#app')
