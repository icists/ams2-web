// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMq from 'vue-mq';
import VueFormWizard from 'vue-form-wizard';
import Vuelidate from 'vuelidate';
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import VueAuthHttp from '@websanova/vue-auth/drivers/http/axios.1.x';
import VueAuthRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x';

import router from './router';
import jwtAuth from './jwtAuth';
import BaseButton from './components/common/BaseButton';
import BaseCardBoard from './components/common/BaseCardBoard';
import BaseHeader from './components/common/BaseHeader';
import BaseNavBar from './components/common/BaseNavBar';

import App from './App';
import store from './store';
import interceptor from './initializers/interceptor';

Vue.router = router;
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.API_HOST;
Vue.use(VueAuth, {
  authRedirect: { path: '/' },
  notFoundRedirect: { path: '/dashboard' },
  refreshData: { url: '/accounts/token-refresh/', method: 'POST', enabled: false, interval: 30 },
  loginData: { url: '/accounts/token-auth/', method: 'POST', redirect: '/dashboard', fetchUser: false },
  fetchData: { url: '/accounts/user/', enabled: false },
  registerData: { url: '/accounts/registration/', method: 'POST', redirect: '/' },
  auth: jwtAuth,
  http: VueAuthHttp,
  router: VueAuthRouter,
});
Vue.use(Vuelidate);

interceptor();

Vue.config.productionTip = false;
Vue.use(VueMq, {
  breakpoints: {
    xs: 768,
    sm: 992,
    md: 1200,
    lg: Infinity,
  },
});
Vue.use(SuiVue);
Vue.use(VueFormWizard);

Vue.component('BaseButton', BaseButton);
Vue.component('BaseHeader', BaseHeader);
Vue.component('BaseCardBoard', BaseCardBoard);
Vue.component('BaseNavBar', BaseNavBar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
