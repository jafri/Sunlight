import axios from 'axios'

function queryParams (params) {
  const entries = []
  for (const key of Object.keys(params)) {
    const value = params[key]
    if (value !== undefined) { entries.push(encodeURIComponent(key) + '=' + encodeURIComponent(value)) }
  }
  return entries.join('&')
}

export default class API {
  constructor () {
    this.api = axios.create({
      baseURL: 'http://localhost:8084/com.ach_manager/api'
    })
  }

  getSchedule (docId, endDate) {
    return this.api.get(`${docId}/${endDate}`)
  }

  getAllDoctors () {
    return this.api.get(`doctor/all`).then(result => result.data)
  }

  getDoctorSchedule (id, startTime, endTime) {
    return this.api.get(`schedule/bounded?id=${id}&start=${startTime}&end=${endTime}`).then(result => result.data)
  }

  loginUser (username, password) {
    return this.api.get(`loginUser?username=${username}&password=${password}`).then(result => result.data)
  }

  addAppointment (title, description, time, duration, patientId, doctorId) {
    return this.api.get(`editDoctorSchedule/add?Title=${title}&description=${description}&time=${time}&Duration=${duration}&PatientID=${patientId}&DoctorID=${doctorId}`).then(result => result.data)
  }

  removeAppointment (patientId, doctorId, time) {
    return this.api.get(`editDoctorSchedule/add?time=${time}&PatientID=${patientId}&DoctorID=${doctorId}`).then(result => result.data)
  }
}
