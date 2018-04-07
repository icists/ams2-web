import Vue from 'vue';
import Vuex from 'vuex';
import policy from './modules/policy';
import user from './modules/user';
import applications from './modules/applications';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    policy,
    user,
    applications,
  },
  state: {
    colors: {
      icistsBlue: '#09073B',
      mediumBlue: '#004D7F',
      errorRed: '#a94442',
      red: '#CA4F40',
      yellow: '#F3B353',
      green: '#1DB100',
      white: '#FFF',
      lightGray: '#EEE',
      gray: '#BBB',
      black: '#000',
    },
  },
});
