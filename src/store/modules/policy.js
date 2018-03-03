import policy from '../../api/policy';

function convertKeys(o, ok, nk) {
  if (ok !== nk) {
    Object.defineProperty(o, nk,
      Object.getOwnPropertyDescriptor(o, ok));
  }
  return o;
};

function parseEssayTopics(essayTopic) {
  return essayTopic
    .map(x => convertKeys(x, 'title', 'label'))
    .map(x => convertKeys(x, 'number', 'value'));
};

// initial state
const state = {
  essayTopics: [],
  status: 'EARLY',
};

// getters
const getters = {
  essayTopics: state => parseEssayTopics(state.essayTopics),
};

// actions
const actions = {
  getAllEssayTopics({ commit }) {
    policy.getEssayTopics(products => {
      commit('setEssayTopics', products);
    });
  },
};

const mutations = {
  setEssayTopics(state, topics) {
    state.essayTopics = topics;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
