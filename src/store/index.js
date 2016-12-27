import Vue from 'vue'
import Vuex from 'vuex'
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
      const response = await query({start, end})
      commit('changeLocations', {locations: response.data})
    }
  }
})

export default store
