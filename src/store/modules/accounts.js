import Vapi from 'vuex-rest-api';
import Vue from 'vue';

const accounts = new Vapi({
  axios: Vue.axios,
  state: {
    schools: [],
    countries: [],
  }
})
  .get({
    action: 'getCountries',
    property: 'countries',
    path: '/accounts/countries/',
  })
  .get({
    action: 'getSchools',
    property: 'schools',
    path: '/accounts/schools/',
  })
  .getStore();

accounts.getters = {
  countries: state => state.countries,
  schools: state => state.schools,
};

export default accounts;
