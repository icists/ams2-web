import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/pages/Main';
import Dashboard from '@/components/pages/Dashboard';
import Login from '@/components/pages/Login';
import Register from '@/components/pages/Register';
import Application from '@/components/pages/Application';
import NotFoundError from '@/components/pages/404';
import InternalError from '@/components/pages/500';

Vue.use(Router);

export default new Router({
  hashbang: false,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { auth: false },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
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
    {
      path: '/500',
      name: 'error-500',
      component: InternalError,
    },
  ],
});
