import { devMode, registerVuexStore } from './utils';

// Import your additional components here
import VueGmapsPlacesComponent from './vue-google-maps-places-component.vue';
import GoogleMapsApi from './GoogleMapsApi';
//GoogleMapsApi.load().then(() => {});
export default class VueGmapsPlaces {
  // HERE IS YOUR PLACE TO DEVELOP YOUR COMPONENT

  constructor(options = {}) {
    const defaults = {
      // This is your plugin's options. It will be accessible with this.options
      accessorName: '$$vueGmapsPlaces',
      gmapApiKey: 'AIzaSyAJSggisxheXos6gJBV-9rUm0HPeDv7Yhc',
      mapName: 'map',
      mapOptions: {
        zoom: 18,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }
    };
    this.options = { ...defaults, ...options };
    (this.map = {}), (this.location = null), (this.marker = {}), (this.mapName = 'map');
    this.place_id = 'ChIJua8EoBCBcUgR2g003WlB0uY';
    //this.geocoder = new google.maps.Geocoder;
    //this.bounds = new google.maps.LatLngBounds();
  }

  // Some instance methods that you can access from this.$$vueGmapsPlaces
  world() {
    return 'world';
  }

  static register = (Vue, options, store) => {
    console.log('Here is the options of the component', options);
    //console.log('Here is the store of the app', store);
    // You can use `this.options` property to access options.
    console.log(options.mapOptions);
    console.log(options.gmapApiKey);

    new GoogleMapsApi(options.gmapApiKey).load().then(() => {
      loadGmapAi(options);
    });

    // Delete this line if your plug-in doesn't provide any components
    Vue.component('vue-google-maps-places', VueGmapsPlacesComponent);

    // Vue.directive('your-custom-directive', customDirective);

    // registerVuexStore(store, 'counterStore', {
    //   namespaced: true,
    //   state: { counter: 0 },
    //   getters: {
    //     counter: state => state.counter
    //   },
    //   actions: {
    //     increment: ({ commit }) => commit('increment')
    //   },
    //   mutations: {
    //     increment: state => state.counter++
    //   }
    // });
  };

  // Some lifecycle hooks to add on mixin
  static mixin = () => ({
    mounted() {
      //console.log('Hey! I am running on every mount, please remove me!');
      //console.log(this.$store);
    }
  });

  ////////////////////////////////////
  // YOU MAY NOT NEED TO EDIT BELOW //
  ////////////////////////////////////

  initialized = false;

  init(Vue, store) {
    if (devMode() && !install.installed) {
      console.warn(
        `[vue-google-maps-places] not installed. Make sure to call \`Vue.use(VueGmapsPlaces)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    VueGmapsPlaces.register(Vue, this.options, store);
    this.initialized = true;
  }
}
///////////
export function install(Vue, options) {
  const isDev = devMode();

  if (install.installed && Vue) {
    if (isDev) {
      console.warn(
        '[vue-google-maps-places] already installed. Vue.use(VueGmapsPlaces) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * VueGmapsPlaces init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const { $vueGmapsPlacesSettings, store, parent } = this.$options;

      let instance = null;
      if ($vueGmapsPlacesSettings) {
        instance =
          typeof $vueGmapsPlacesSettings === 'function'
            ? new $vueGmapsPlacesSettings()
            : new VueGmapsPlaces($vueGmapsPlacesSettings);
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent.__$VueGmapsPlacesInstance) {
        instance = parent.__$VueGmapsPlacesInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        // Store helper for internal use
        this.__$VueGmapsPlacesInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    },

    ...VueGmapsPlaces.mixin()
  });

  install.installed = true;
  if (isDev) {
    console.info('[vue-google-maps-places] is plugged in.');
  }
}

function loadGmapAi(options) {
  console.log(options);
  const map = new google.maps.Map(document.getElementById(options.mapName), options.mapOptions);
  const marker = new google.maps.Marker({ map: map });
  const geocoder = new google.maps.Geocoder();
  const bounds = new google.maps.LatLngBounds();
  const place_id = 'ChIJua8EoBCBcUgR2g003WlB0uY';

  geocoder.geocode({ placeId: place_id }, (results, status) => {
    if (status !== 'OK') {
      console.log('Geocoder failed due to: ' + status);
      return;
    }

    map.setZoom(18);
    map.setCenter(results[0].geometry.location);
    const location = results[0].geometry.location;
    console.log(location);

    // Set the position of the marker using the place ID and location.business_page.suplier_gmid
    marker.setPlace({ placeId: place_id, location: results[0].geometry.location });
    marker.setVisible(true);
  });
}

VueGmapsPlaces.install = install;
