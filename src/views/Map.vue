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

  computed: {
    source () {
      const data = {
        type: 'FeatureCollection',
        features: []
      }

      if (this.view === '散点图') {
        this.$store.state.locations.forEach((location) => {
          data.features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [location.lng, location.lat]
            },
            properties: {
              deviceId: location.deviceId,
              createdAt: location.createdAt,
              updatedAt: location.updatedAt
            }
          })
        })

        data.name = 'scatter-source'
      }

      return data
    }
  },

  ready () {
    mapboxgl.accessToken = this.accessToken
    this.options.container = this.$el
    map = new mapboxgl.Map(this.options)
    map.addControl(new mapboxgl.NavigationControl(), 'top-left')
  },

  watch: {
    source (value) {
      const source = map.getSource(value.name)
      if (source) {
        source.setData(value)
      } else {
        map.addSource(value.name, {
          type: 'geojson',
          data: value
        })
      }

      switch (this.view) {
        case '散点图':
          this.showScatterMap()
          break
        case '轨迹图':
          this.showTrackMap()
          break
        case '热区图':
          this.showHeatMap()
          break
      }
    }
  },

  methods: {
    showScatterMap () {
      const layer = map.getLayer('scatter-layer')
      if (!layer) {
        map.addLayer({
          id: 'scatter-layer',
          type: 'circle',
          source: 'scatter-source',
          paint: {
            'circle-radius': 5,
            'circle-color': '#0061ff',
            'circle-stroke-color': '#fff',
            'circle-stroke-width': 1
          }
        }, 'wall-base')
      }

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      map.on('mousemove', function (e) {
        const features = map.queryRenderedFeatures(e.point, {layers: ['scatter-layer']})
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''

        if (!features.length) {
          popup.remove()
          return
        }

        popup.setLngLat(features[0].geometry.coordinates)
          .setHTML(features[0].properties.deviceId)
          .addTo(map)
      })
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
