import user from '../../api/user';

// initial state
const state = {
  user: null,
};

// getters
const getters = {
  user: state => state.user,
};

// actions
const actions = {
  getUser({ commit }) {
    user.getUser(user => {
      commit('setUser', user);
    });
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
