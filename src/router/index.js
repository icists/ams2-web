import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import ApplicationFormWizard from '@/components/ApplicationFormWizard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'Dashboard' },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/applications',
      name: 'ApplicationFormWizard',
      component: ApplicationFormWizard,
    },
  ],
});
