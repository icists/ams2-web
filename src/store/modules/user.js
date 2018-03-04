import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const user = new Vapi({
  baseURL: 'http://api.icists.org',
  axios: Vue.axios,
  state: {
    user: {},
  },
})
  .get({
    action: 'getUser',
    property: 'user',
    path: '/accounts/profile/',
    onSuccess: (state, payload) => {
      // todo : need to set API design again.
      const data = Object.assign({}, payload.data);
      data.full_name = `${data.first_name} ${data.last_name}`;
      data.major = 'Underwater Explosion';
      state.user = data;
    },
  })
  .getStore();

user.getters = {
  user: state => state.user,
  user_parsed(state) {
    return state.user;
  },
};

export default user;
