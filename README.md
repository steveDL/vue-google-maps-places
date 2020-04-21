# VueGmapsPlaces

Your plugin description...

## Installation

### 1. Install
```
yarn add vue-google-maps-places
# or
npm i vue-google-maps-places --save
```

### 2. Plug-in
```js
import VueGmapsPlaces from 'vue-google-maps-places'

Vue.use(VueGmapsPlaces)

new Vue({
  // your vue config
  $vueGmapsPlacesSettings: new VueGmapsPlaces(),
})
```

### 3. Use in your components

```vue
<template>
  <vue-google-maps-places />
</template>

<script>
  export default {
    async created() {
      console.log(this.$$vueGmapsPlaces);
    },
  };
</script>
```

## License
MIT
