import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const application = new Vapi({
  baseURL: 'https://api.icists.org',
  axios: Vue.axios,
  state: {
    application: null,
  },
})
  .get({
    action: 'getApplication',
    property: 'application',
    path: '/registration/applications/',
    onSuccess: (state, payload) => {
      state.application = payload.data[0];
    },
  })
  .getStore();

application.getters = {
  application: state => state.application,
};

export default application;
