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
      const { data } = payload;
      data.fullName = `${data.firstName} ${data.lastName}`;
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
};

export default user;
