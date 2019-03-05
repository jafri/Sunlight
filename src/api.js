import axios from 'axios'
const LOCAL_URL = 'localhost:8090'

export function getSchedule (docId, endDate) {
  return axios.get(`LOCAL_URL/${docId}/${endDate}`)
}
