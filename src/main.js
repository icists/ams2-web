// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMq from 'vue-mq';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';

import AppButton from './components/common/AppButton';
import AppHeader from './components/common/AppHeader';
import BaseColumn from './components/common/BaseColumn';
import BaseRow from './components/common/BaseRow';
import CardBoard from './components/common/CardBoard';
import NavBar from './components/common/NavBar';


Vue.config.productionTip = false;
Vue.use(VueMq, {
  breakpoints: {
    xs: 768,
    sm: 992,
    md: 1200,
    lg: Infinity,
  },
});
Vue.use(ElementUI, { locale });

Vue.component('AppButton', AppButton);
Vue.component('AppHeader', AppHeader);
Vue.component('BaseColumn', BaseColumn);
Vue.component('BaseRow', BaseRow);
Vue.component('CardBoard', CardBoard);
Vue.component('NavBar', NavBar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
