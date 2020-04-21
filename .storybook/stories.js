import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';

import VueGmapsPlaces from '../src/vue-google-maps-places';

Vue.use(Vuex);
Vue.use(VueGmapsPlaces);

const withSettings = component => ({
  $vueGmapsPlacesSettings: new VueGmapsPlaces(),
  ...component
});

const stories = storiesOf('VueGmapsPlaces', module);

stories
  // Add some stories here to make your plugin more descriptive
  .add(
    'My Customs  Component',
    () =>
      withSettings({
        template: `
        <div>
          <vue-google-maps-places />
        </div>
      `
      }),
    {
      notes: `
        # Using \`vue-google-maps-places\`

        \`\`\`html
        <template>
          <vue-google-maps-places />
        </template>
        \`\`\`
      `
    }
  );
