import Vue from 'vue';
import Vuex from 'vuex';
import VueGmapsPlaces from '@/vue-google-maps-places';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueGmapsPlaces);

new Vue({
  el: '#app',
  store: new Vuex.Store(),
  $vueGmapsPlacesSettings: new VueGmapsPlaces(),
  render: createElement => createElement(App)
});
