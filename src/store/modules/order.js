import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const order = new Vapi({
  axios: Vue.axios,
  state: {
    order: null,
  },
})
  .get({
    action: 'getOrder',
    property: 'order',
    path: '/registration/order/',
    onSuccess: (state, payload) => {
      state.order = payload.data;
    },
    onError: (state) => {
      state.order = {};
    },
  })
  .post({
    action: 'createOrder',
    property: 'order',
    path: '/registration/orders/',
  })
  .put({
    action: 'updateOrder',
    property: 'order',
    path: '/registration/order/',
  })
  .getStore();

order.getters = {
  order: state => state.order,
};

export default order;
