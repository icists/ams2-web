import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const policy = new Vapi({
  axios: Vue.axios,
  state: {
    stage: {},
    essayTopics: [],
    projectTopics: [],
  },
})
  .get({
    action: 'getStage',
    property: 'stage',
    path: '/policy/stage/',
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
  stage: state => state.stage.currentStage,
  essayTopics: state => state.essayTopics,
  projectTopics: state => state.projectTopics,
};

export default policy;
