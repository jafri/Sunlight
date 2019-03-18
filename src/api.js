import axios from 'axios'

const LOCAL_URL = process.env.API || 'http://localhost:8090/sunlight_api_war_exploded'
const api = axios.create({
  baseURL: LOCAL_URL + '/api'
})

function queryParams (params) {
  const entries = []
  for (const key of Object.keys(params)) {
    const value = params[key]
    if (value !== undefined) { entries.push(encodeURIComponent(key) + '=' + encodeURIComponent(value)) }
  }
  return entries.join('&')
}

export function getSchedule (docId, endDate) {
  return api.get(`${LOCAL_URL}/${docId}/${endDate}`)
}

export function getAllDoctors (docId, endDate) {
  return api.get(`${LOCAL_URL}/doctor/all`).then(result => result.data)
}
