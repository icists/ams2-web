import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/pages/Dashboard';
import Login from '@/components/pages/Login';
import Application from '@/components/pages/Application';
import NotFoundError from '@/components/pages/404';

Vue.use(Router);

export default new Router({
  hashbang: false,
  routes: [
    {
      path: '/',
      redirect: { name: 'Dashboard' },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { auth: true },
    },
    {
      path: '/applications',
      name: 'Application',
      component: Application,
      meta: { auth: true },
    },
    {
      path: '/404',
      name: 'error-404',
      component: NotFoundError,
    },
  ],
});
