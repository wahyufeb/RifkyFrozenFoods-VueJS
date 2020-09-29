import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import 'element-ui/lib/theme-chalk/display.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

// Mixins
import titleMixin from './mixins/titleMixins.js';
import VueHtmlToPaper from 'vue-html-to-paper';

Vue.mixin(titleMixin);
Vue.config.productionTip = false;
locale.use(lang);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(VueHtmlToPaper, options);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
