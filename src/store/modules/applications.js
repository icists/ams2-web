import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const application = new Vapi({
  baseURL: 'http://api.icists.org',
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
      if (payload.data.length > 0) {
        state.application = payload.data[0];
      } else {
        state.application = {};
      }
    },
  })
  .post({
    action: 'createApplication',
    property: 'application',
    path: '/registration/applications/',
  })
  .put({
    action: 'updateApplication',
    property: 'application',
    path: ({ id }) => `/registration/applications/${id}/`,
  })
  .getStore();

application.getters = {
  application: state => state.application,
};

export default application;
