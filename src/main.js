/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createVuetify } from 'vuetify'; 

// Components
import App from './App.vue'
import 'vuetify/styles';

// Composables
import { createApp } from 'vue'

const app = createApp(App)
const vuetify = createVuetify();


registerPlugins(app)

app.use(vuetify);
app.mount('#app')
