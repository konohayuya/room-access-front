import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

const app = createApp(App);

/* FontAwesome */
library.add(faCoffee);
app.component('font-awesome-icon', FontAwesomeIcon);
/* FontAwesome */

app.mount('#app');
