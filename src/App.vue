<template>
  <div id="app">
    <i-Header class="header"></i-Header>
    <Map class="map" :access-token="accessToken" :options="options"></Map>
    <Panel class="panel"></Panel>
  </div>
</template>

<script>
import iHeader from './components/Header'
import Map from './components/Map'
import Panel from './components/Panel'

export default {
  data () {
    return {
      accessToken: 'pk.eyJ1IjoibWFwZXIiLCJhIjoiY2l3dm9qdzRiMDAxMTJ6cGY2ZHlzOTRvNCJ9.WcJV0GCgk_4XXHa8cnmi_Q',
      options: {
        style: 'mapbox://styles/maper/cizfl4jyx007m2sji1ndyc4nl?optimize=true',
        attributionControl: false,
        center: [116.420298, 39.947635],
        zoom: 20.5,
        bearing: -70,
        pitch: 40,
        maxZoom: 22
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
#app {
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
  width: 300px;
  height: calc(100% - 40px);
}
</style>
