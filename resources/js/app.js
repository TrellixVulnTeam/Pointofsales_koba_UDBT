require('./bootstrap');
import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/inertia-vue3'
import route from "ziggy-js";
import { InertiaProgress } from '@inertiajs/progress';
import VueApexCharts from "vue3-apexcharts";



createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin,VueApexCharts) // use the plugin
      .component('Link',Link,InertiaProgress.init({color: '#72FFFF',}))
      .mixin({ methods: { route }})
      .mount(el)
  },
})
