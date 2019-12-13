/* eslint-disable indent */
import { http } from './config-cep'

export default {
  consultar: () => {
    return http.get('/58410340/json')
  }
}
