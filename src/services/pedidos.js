import { http } from './config'

export default {
  listar: (numped) => {
    return http.get('/atv/pedidos/pd?numped=' + numped) // COM QUERY
  },

  atualizar: (pedido) => {
      return http.put('/atv/pedidos/pd/att', pedido)
  }
}

/*

listar: (numped) => {
    return http.get('/atv/' + numped) -- COM PARAMS
  }

  */
