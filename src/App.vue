<template>
  <div class="app">
    <i-Header class="header"></i-Header>
    <Map class="map" :access-token="accessToken" :options="options"></Map>
    <Panel class="panel"></Panel>
  </div>
</template>

<script>
import iHeader from './views/Header'
import Map from './views/Map'
import Panel from './views/Panel'

export default {
  data () {
    return {
      accessToken: 'pk.eyJ1IjoibWFwZXIiLCJhIjoiY2l3dm9qdzRiMDAxMTJ6cGY2ZHlzOTRvNCJ9.WcJV0GCgk_4XXHa8cnmi_Q',
      options: {
        style: 'mapbox://styles/maper/ciwvpz28c002z2qpqxdg2m5cy?optimize=true',
        attributionControl: false,
        center: [112.527964, 0.009984],
        zoom: 10.5,
        bearing: -70,
        pitch: 40
      }
    }
  },

  components: {
    iHeader,
    Map,
    Panel
  }
}

</script>

<style>
html, body {
  height: 100%;
}

/** {
  outline: red solid 1px;
}*/
</style>

<style scoped>
.app {
  height: 100%;
}

.header {
  height: 40px;
}

.map {
  height: calc(100% - 40px);
  width: calc(100% - 300px);
}

.panel {
  position: absolute;
  right: 0;
  top: 40px;
  height: calc(100% - 40px);
}
</style>
