import axios from 'axios'
import { API } from '../config'

export const importCsvService = async(formData, callback) => {
  const config = {
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*'
    }
  }
  await axios.post(`${API}/places/import`, formData, config)
    .then((response) => {
      callback(response.data)
    }).catch(err => {
      console.error({ err })
    })
}

export const getGrid = async(callback) => {
  const config = {
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*'
    }
  }
  await axios.get(`${API}/places/grid`, config)
    .then((response) => {
      callback(response.data)
    }).catch(err => {
      console.error({ err })
    })
}