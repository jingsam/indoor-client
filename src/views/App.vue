<template>
  <div class="app">
    <Row class="header">
      <i-Header></i-Header>
    </Row>
    <Row class="main">
      <i-Col span="18">
        <Map :access-token="accessToken" :options="options"><Map>
      </i-Col>
      <i-Col span="6">
        <Panel></Panel>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import iHeader from './Header'
import Map from './Map'
import Panel from './Panel'


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
  text-align: center;
}

.main {
  height: calc(100% - 40px);
}

.main > * {
  height: 100%;
}
</style>
