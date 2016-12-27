<template>
  <div>
    <Radio-group :model.sync="view" type="button" class="group">
      <Radio value="散点图"></Radio>
      <Radio value="轨迹图"></Radio>
      <Radio value="热区图"></Radio>
    </Radio-group>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

let map

export default {
  props: {
    accessToken: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true,
      validator (value) {
        return !!value.style
      }
    }
  },

  data () {
    return {
      view: '散点图'
    }
  },

  ready () {
    mapboxgl.accessToken = this.accessToken
    this.options.container = this.$el
    map = new mapboxgl.Map(this.options)
    map.addControl(new mapboxgl.NavigationControl(), 'top-left')
  },

  watch: {
    view: value => {
      switch (value) {
        case '散点图':
          this.showScatterMap()
          break
        case '轨迹图':
          this.showTrackMap()
          break
        case '热力图':
          this.showHeatMap()
          break
      }
    }
  },

  methods: {
    showScatterMap () {
      //
    },

    showTrackMap () {
      //
    },

    showHeatMap () {
      //
    }
  }
}
</script>


<style scoped>
div {
  height: 100%;
}

.group {
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 50%;
  transform: translate(-50%)
}
</style>
