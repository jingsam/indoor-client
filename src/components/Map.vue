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
import groupBy from 'lodash/groupBy'
import moment from 'moment'

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
      this.addScatterSource(this.$store.state.locations)
      this.addScatterLayer()
      this.addTrackSource(this.$store.state.locations)
      this.addTrackLayer()
      this.addHeatSource(this.$store.state.locations)
      this.addHeatLayer()
    })
  },

  watch: {
    view (value) {
      switch (value) {
        case '散点图':
          map.setLayoutProperty('scatter-layer', 'visibility', 'visible')
          map.setLayoutProperty('track-layer', 'visibility', 'none')
          // map.setLayoutProperty('heat-layer', 'visibility', 'none')
          break
        case '轨迹图':
          map.setLayoutProperty('scatter-layer', 'visibility', 'none')
          map.setLayoutProperty('track-layer', 'visibility', 'visible')
          // map.setLayoutProperty('heat-layer', 'visibility', 'none')
          break
        case '热区图':
          map.setLayoutProperty('scatter-layer', 'visibility', 'none')
          map.setLayoutProperty('track-layer', 'visibility', 'none')
          // map.setLayoutProperty('heat-layer', 'visibility', 'visible')
          break
      }
    },

    '$store.state.locations' (locations) {
      this.addScatterSource(locations)
      this.addTrackSource(locations)
      this.addHeatSource(locations)
    }
  },

  methods: {
    addScatterSource (locations) {
      const data = {
        type: 'FeatureCollection',
        features: []
      }

      locations.forEach((location) => {
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
          popup.remove()
          return
        }

        popup.setLngLat(e.lngLat)
          .setHTML(features[0].properties.deviceId)
          .addTo(map)
      })
    },

    addTrackSource (locations) {
      const groupedLocations = groupBy(locations, location => {
        return moment(location.createdAt).format('YYYY-MM-DD')
      })

      Object.keys(groupedLocations).forEach(function (key) {
        groupedLocations[key] = groupBy(groupedLocations[key], location => {
          return location.deviceId
        })
      })

      const tracks = []
      Object.keys(groupedLocations).forEach(function (key1) {
        Object.keys(groupedLocations[key1]).forEach(function (key2) {
          tracks.push({
            date: key1,
            deviceId: key2,
            locations: groupedLocations[key1][key2].sort((loc1, loc2) => {
              return new Date(loc1) - new Date(loc2)
            })
          })
        })
      })

      const data = {
        type: 'FeatureCollection',
        features: []
      }

      tracks.forEach((track) => {
        data.features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: track.locations.map(location => [location.lng, location.lat])
          },
          properties: {
            date: track.date,
            deviceId: track.deviceId
          }
        })
      })

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
            visibility: this.view === '轨迹图' ? 'visible' : 'none'
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

    addHeatSource (locations) {
      //
    },

    addHeatLayer () {
      //
    }
  }
}
</script>


<style scoped>
div {
  height: 300px;
}

.radio-group {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  height: 30px;
}
</style>
