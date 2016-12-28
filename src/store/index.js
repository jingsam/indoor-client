import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import {query} from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    start: 0,
    end: 0,
    locations: []
  },

  mutations: {
    changeRange (state, {start, end}) {
      state.start = start
      state.end = end
    },

    changeLocations (state, {locations}) {
      state.locations = locations
    }
  },

  actions: {
    async fetchLocations ({commit}, {start, end}) {
      commit('changeRange', {start, end})
      const locations = (await query({start, end})).data
      locations.forEach(location => {
        location.createdAt = moment(location.createdAt).format()
        location.updatedAt = moment(location.updatedAt).format()
      })
      commit('changeLocations', {locations})
    }
  }
})

export default store
