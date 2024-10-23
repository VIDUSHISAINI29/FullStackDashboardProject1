import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)
import { setupECharts } from "./composables/eCharts"; // Import ECharts setup
import VChart from "vue-echarts"; // Import Vue ECharts component

setupECharts(); // Register the components
app.component("v-chart", VChart);


import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

app.use(createPinia())
app.use(router)

app.use(
    createAuth0({
      domain: import.meta.env.VITE_DOMAIN,
      clientId: import.meta.env.VITE_CLIENTID,

      authorizationParams: {
        redirect_uri: import.meta.env.VITE_CALLBACK_URL
      }
    })
  );

  app.use(PrimeVue, {
    unstyled: false,
    theme: {
       preset: Aura,
       options: {
          darkModeSelector: ".tw-dark",
       },
    },
 });


app.mount('#app')
