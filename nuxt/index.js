/*
Nuxt.js module for vue-google-maps-places
Usage:
    - Install vue-google-maps-places package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-google-maps-places/nuxt'
            // Optionally passing options in module configuration
            ['vue-google-maps-places/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        VueGmapsPlaces: { ...options }
    }
*/

const { resolve } = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.VueGmapsPlaces, moduleOptions);

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'vue-google-maps-places-plugin.template.js.tpl'),
    fileName: 'vue-google-maps-places-plugin.js',
    options: options
  });
};

// required by nuxt
module.exports.meta = require('../package.json');
