<template>
  <div>
    <Radio-group class="radio-group" :model.sync="view" type="button" >
      <Radio value="散点图"></Radio>
      <Radio value="轨迹图"></Radio>
      <Radio value="热区图"></Radio>
    </Radio-group>
  </div>
</template>


<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import {mapGetters} from 'vuex'

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
    map.on('load', () => {
      this.addScatterSource(this.points)
      this.addScatterLayer()
      this.addTrackSource(this.lines)
      this.addTrackLayer()
      this.addHeatSource(this.points)
      this.addHeatLayer()
    })
  },

  computed: {
    ...mapGetters([
      'points',
      'lines'
    ])
  },

  watch: {
    view (value) {
      switch (value) {
        case '散点图':
          map.setLayoutProperty('scatter-layer', 'visibility', 'visible')
          map.setLayoutProperty('track-layer', 'visibility', 'none')
          map.setLayoutProperty('heat-layer', 'visibility', 'none')
          break
        case '轨迹图':
          map.setLayoutProperty('scatter-layer', 'visibility', 'none')
          map.setLayoutProperty('track-layer', 'visibility', 'visible')
          map.setLayoutProperty('heat-layer', 'visibility', 'none')
          break
        case '热区图':
          map.setLayoutProperty('scatter-layer', 'visibility', 'none')
          map.setLayoutProperty('track-layer', 'visibility', 'none')
          map.setLayoutProperty('heat-layer', 'visibility', 'visible')
          break
      }
    },

    points (value) {
      this.addScatterSource(value)
      this.addHeatSource(value)
    },

    lines (value) {
      this.addTrackSource(value)
    }
  },

  methods: {
    addScatterSource (data) {
      const source = map.getSource('scatter-source')
      if (source) {
        source.setData(data)
      } else {
        map.addSource('scatter-source', {
          type: 'geojson',
          data: data
        })
      }
    },

    addScatterLayer () {
      const layer = map.getLayer('scatter-layer')
      if (!layer) {
        map.addLayer({
          id: 'scatter-layer',
          type: 'circle',
          source: 'scatter-source',
          layout: {
            visibility: this.view === '散点图' ? 'visible' : 'none'
          },
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
          return popup.remove()
        }

        popup.setLngLat(e.lngLat)
          .setHTML(features[0].properties.deviceId)
          .addTo(map)
      })
    },

    addTrackSource (data) {
      const source = map.getSource('track-source')
      if (source) {
        source.setData(data)
      } else {
        map.addSource('track-source', {
          type: 'geojson',
          data: data
        })
      }
    },

    addTrackLayer () {
      const layer = map.getLayer('track-layer')
      if (!layer) {
        map.addLayer({
          id: 'track-layer',
          type: 'line',
          source: 'track-source',
          layout: {
            visibility: this.view === '轨迹图' ? 'visible' : 'none',
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': '#0061ff',
            'line-width': 5

          }
        }, 'wall-base')
      }

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      map.on('mousemove', function (e) {
        const features = map.queryRenderedFeatures(e.point, {layers: ['track-layer']})
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''

        if (!features.length) {
          popup.remove()
          return
        }

        popup.setLngLat(e.lngLat)
          .setHTML(features[0].properties.deviceId)
          .addTo(map)
      })
    },

    addHeatSource (data) {
      const source = map.getSource('heat-source')
      if (source) {
        source.setData(data)
      } else {
        map.addSource('heat-source', {
          type: 'geojson',
          data: data,
          cluster: true,
          clusterRadius: 20
        })
      }
    },

    addHeatLayer () {
      const layer = map.getLayer('heat-layer')
      if (!layer) {
        map.addLayer({
          id: 'heat-layer',
          type: 'circle',
          source: 'heat-source',
          filter: ['has', 'point_count'],
          layout: {
            visibility: this.view === '热区图' ? 'visible' : 'none'
          },
          paint: {
            'circle-radius': 40,
            'circle-color': {
              type: 'interval',
              property: 'point_count',
              stops: [
                [1, '#06f'],
                [3, 'orange'],
                [5, 'red']
              ]
            },
            'circle-blur': 1
          }
        }, 'wall-base')

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })

        map.on('mousemove', function (e) {
          const features = map.queryRenderedFeatures(e.point, {layers: ['heat-layer']})
          map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''

          if (!features.length) {
            popup.remove()
            return
          }

          popup.setLngLat(e.lngLat)
            .setHTML(features[0].properties.point_count)
            .addTo(map)
        })
      }
    }
  }
}
</script>


<style scoped>
.radio-group {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  height: 30px;
}
</style>
