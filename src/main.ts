import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

// Official Google Material Components
import BalmUI from 'balm-ui'
// BalmJS Team Material Components
// @ts-ignore
import BalmUIPlus from 'balm-ui-plus'
import 'balm-ui-css'
import router from './router'

const app = createApp(App).use(router)

/* FontAwesome */
library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)
/* FontAwesome */

// BalmUI
app.use(BalmUI)
app.use(BalmUIPlus)

app.mount('#app')
