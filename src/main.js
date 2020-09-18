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

Vue.mixin(titleMixin);
Vue.config.productionTip = false;
locale.use(lang);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
