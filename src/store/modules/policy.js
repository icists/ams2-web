import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const policy = new Vapi({
  axios: Vue.axios,
  state: {
    stage: {},
    essayTopics: [],
    projectTopics: [],
    accommodations: [],
    options: [],
    paymentInfo: {},
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
  .get({
    action: 'getAccommodations',
    property: 'accommodations',
    path: '/policy/accommodations/',
  })
  .get({
    action: 'getOptions',
    property: 'options',
    path: '/policy/options/',
  })
  .get({
    action: 'getPaymentInfo',
    property: 'paymentInfo',
    path: '/policy/payment-info/',
  })
  .getStore();

policy.getters = {
  stage: state => state.stage.currentStage,
  essayTopics: state => state.essayTopics,
  projectTopics: state => state.projectTopics,
  accommodations: state => state.accommodations,
  options: state => state.options,
  paymentInfo: state => state.paymentInfo,
};

export default policy;
