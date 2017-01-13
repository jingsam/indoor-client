import axios from 'axios'
import moment from 'moment'

axios.defaults.baseURL = '//101.200.63.93/api/v1'

export function query ({start, end}) {
  start = moment.utc(start).format()
  end = moment.utc(end).format()
  return axios.get('/locations', {params: {start, end}})
}

export function upload ({deviceId, lng, lat}) {
  return axios.post('/locations', {deviceId, lng, lat})
}

export default {query, upload}
