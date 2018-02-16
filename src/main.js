// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMq from 'vue-mq';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';

import BaseButton from './components/common/BaseButton';
import BaseCardBoard from './components/common/BaseCardBoard';
import BaseColumn from './components/common/BaseColumn';
import BaseHeader from './components/common/BaseHeader';
import BaseNavBar from './components/common/BaseNavBar';
import BaseRow from './components/common/BaseRow';

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

Vue.component('BaseButton', BaseButton);
Vue.component('BaseHeader', BaseHeader);
Vue.component('BaseColumn', BaseColumn);
Vue.component('BaseRow', BaseRow);
Vue.component('BaseCardBoard', BaseCardBoard);
Vue.component('BaseNavBar', BaseNavBar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
