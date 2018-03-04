import Vapi from 'vuex-rest-api';
import Vue from 'vue';

function convertKeys(o, ok, nk) {
  if (ok !== nk) {
    Object.defineProperty(o, nk,
      Object.getOwnPropertyDescriptor(o, ok));
  }
  return o;
}

function parseOptions(essayTopic) {
  return essayTopic
    .map(x => convertKeys(x, 'title', 'label'))
    .map(x => convertKeys(x, 'number', 'value'));
}

const policy = new Vapi({
  baseURL: 'http://api.icists.org',
  axios: Vue.axios,
  state: {
    essayTopics: [],
    projectTopics: [],
    status: 'EARLY',
  },
})
  .get({
    action: 'getAllEssayTopics',
    property: 'essayTopics',
    path: '/policy/essay-topics/',
  })
  .get({
    action: 'getAllProjectTopics',
    property: 'projectTopics',
    path: '/policy/project-topics/',
  })
  .getStore();

policy.getters = {
  essayTopics: state => parseOptions(state.essayTopics),
  projectTopics: state => parseOptions(state.projectTopics),
};

export default policy;
