import axios from 'axios'


axios.defaults.baseURL = '//101.200.63.93/api/v1'

export function query ({start, end}) {
  return axios.get('/locations', {params: {start, end}})
}

export function upload ({deviceId, lng, lat}) {
  return axios.post('/locations', {deviceId, lng, lat})
}

export default {query, upload}
