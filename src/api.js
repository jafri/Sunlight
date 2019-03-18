import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8084/com.ach_manager/api'
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
  return api.get(`${docId}/${endDate}`)
}

export function getAllDoctors (docId, endDate) {
  return api.get(`doctor/all`).then(result => result.data)
}
