import axios from 'axios';
import Vue from 'vue';

export default () => {
  axios.interceptors.response.use(
    (res) => {
      if (res.status === 401 && ['UnauthorizedAccess', 'InvalidToken'].indexOf(res.data.code) > -1) {
        Vue.auth.logout({
          redirect: { name: 'Main' },
        });
      } else if (res.status === 500) { // System Error
        Vue.router.push({ name: 'error-500' });
      }
      return res;
    },
  );
};
