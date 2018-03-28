import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const user = new Vapi({
  axios: Vue.axios,
  state: {
    user: {},
  },
})
  .get({
    action: 'getUser',
    property: 'user',
    path: '/accounts/user/',
    onSuccess: (state, payload) => {
      // todo : need to set API design again.
      const data = Object.assign({}, payload.data);
      data.full_name = `${data.first_name} ${data.last_name}`;
      data.major = 'Underwater Explosion';
      state.user = data;
    },
  })
  .post({
    action: 'createUser',
    property: 'user',
    path: '/accounts/registration/',
  })
  .put({
    action: 'updateUser',
    property: 'user',
    path: '/accounts/user/',
  })
  .getStore();

user.getters = {
  user: state => state.user,
  user_parsed(state) {
    return state.user;
  },
};

export default user;
