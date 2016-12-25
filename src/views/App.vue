<template>
  <div class="app">
    <i-Header></i-Header>
    <Map :access-token="accessToken" :options="options"><Map>
  </div>
</template>

<script>
import iHeader from './Header'

export default {
  data() {
    return {
      accessToken: 'pk.eyJ1IjoibWFwZXIiLCJhIjoiY2l3dm9qdzRiMDAxMTJ6cGY2ZHlzOTRvNCJ9.WcJV0GCgk_4XXHa8cnmi_Q',
      options: {
        style: 'mapbox://styles/maper/ciwvpz28c002z2qpqxdg2m5cy',
        attributionControl: false,
        center: [112.521531, -0.006674],
        zoom: 10.4,
        bearing: -60,
        pitch: 50
      }
    }
  },

  components: {
    iHeader
  }
}

</script>

<style scoped>
.app {
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
}
</style>
