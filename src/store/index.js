import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import {query} from '../api'
import groupBy from 'lodash/groupBy'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    start: 0,
    end: 0,
    locations: []
  },

  getters: {
    points (state) {
      const features = state.locations.map(location => {
        return {
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
        }
      })

      return {
        type: 'FeatureCollection',
        features
      }
    },

    lines (state) {
      const groupedLocations = groupBy(state.locations, location => {
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
              return Date.parse(loc1.createdAt) - Date.parse(loc2.createdAt)
            })
          })
        })
      })

      const features = tracks.map((track) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: track.locations.map(location => [location.lng, location.lat])
          },
          properties: {
            date: track.date,
            deviceId: track.deviceId
          }
        }
      })

      return {
        type: 'FeatureCollection',
        features
      }
    }
  },

  mutations: {
    mutateRange (state, {start, end}) {
      state.start = start
      state.end = end
    },

    mutateLocations (state, {locations}) {
      state.locations = locations
    }
  },

  actions: {
    async fetchLocations ({commit}, {start, end}) {
      commit('mutateRange', {start, end})
      const locations = (await query({start, end})).data
      locations.forEach(location => {
        location.createdAt = moment(location.createdAt).format()
        location.updatedAt = moment(location.updatedAt).format()
      })
      commit('mutateLocations', {locations})
    }
  }
})

export default store
