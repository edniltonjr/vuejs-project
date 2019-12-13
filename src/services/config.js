import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://45.228.147.90:3000/'
})
