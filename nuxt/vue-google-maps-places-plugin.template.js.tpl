import Vue from 'vue';
import VuePlugin from '../dist/vue-plugin.js';

Vue.use(VuePlugin);

export default ({ app }) => {
  // inject options from module
  const opts = [<%= serialize(options) %>][0];
  app.myPluginSettings = new VuePlugin(opts);
};
