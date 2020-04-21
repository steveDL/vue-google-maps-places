import Vue, { PluginFunction } from 'vue';
// import { Store } from 'vuex';

export class VueGmapsPlaces {
  constructor(options?: VueGmapsPlacesOptions);

  static install(): PluginFunction<any>;
  // static init(Vue: Vue, store: Store<any>): void;
  static init(Vue: Vue, store: any): void;

  // Your instance methods
  world(): string;
}

export interface VueGmapsPlacesOptions extends Object {
  accessorName?: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $$vueGmapsPlaces: VueGmapsPlaces;
    __$VueGmapsPlacesInstance: VueGmapsPlaces;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $vueGmapsPlacesSettings?: VueGmapsPlacesOptions | VueGmapsPlaces
  }
}
