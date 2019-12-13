/* eslint-disable indent */
import { http } from './config'

export default {
  listar: () => {
    return http.get('/site?numcar=1118406')
  }
}
