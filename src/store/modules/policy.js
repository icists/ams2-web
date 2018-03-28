import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const policy = new Vapi({
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
  essayTopics: state => state.essayTopics,
  projectTopics: state => state.projectTopics,
};

export default policy;
