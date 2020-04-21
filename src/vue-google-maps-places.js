import { devMode } from './utils';
import VueGmapsPlacesComponent from './vue-google-maps-places-component.vue';
import GoogleMapsApi from './GoogleMapsApi';

export default class VueGmapsPlaces {
  constructor(options = {}) {
    const defaults = {
      accessorName: '$$vueGmapsPlaces',
      gmapApiKey: 'AIzaSyAJSggisxheXos6gJBV-9rUm0HPeDv7Yhc',
      mapName: 'map',
      placeId: 'ChIJua8EoBCBcUgR2g003WlB0uY',
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
  }

  // Some instance methods that you can access from this.$$vueGmapsPlaces
  world() {
    return 'world';
  }

  static register = (Vue, options, store) => {
    new GoogleMapsApi(options.gmapApiKey).load().then(() => {
      loadGmapAi(options);
    });
    Vue.component('vue-google-maps-places', VueGmapsPlacesComponent);
  };

  // Some lifecycle hooks to add on mixin
  static mixin = () => ({
    mounted() {}
  });

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
  const map = new google.maps.Map(document.getElementById(options.mapName), options.mapOptions);
  const marker = new google.maps.Marker({ map: map });
  const geocoder = new google.maps.Geocoder();
  const bounds = new google.maps.LatLngBounds();

  geocoder.geocode({ placeId: options.placeId }, (results, status) => {
    if (status !== 'OK') {
      console.log('Geocoder failed due to: ' + status);
      return;
    }

    map.setZoom(options.mapOptions.zoom);
    map.setCenter(results[0].geometry.location);

    // Set the position of the marker
    marker.setPlace({ placeId: options.placeId, location: results[0].geometry.location });
    marker.setVisible(true);
  });
}

VueGmapsPlaces.install = install;
