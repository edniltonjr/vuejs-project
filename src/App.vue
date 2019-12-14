<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item @click="11">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
              <!-- <form> -->
              <v-text-field v-model="pedido.numped" label="Nº Pedido" data-vv-name="name" required></v-text-field>
              <!-- </form> -->
              <!-- <app-input v-model="pedido.numped"></app-input> -->
              <v-btn depressed small color="primary" @click="listar()">Pesquisar</v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="11">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Carregamentos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Aço Brazil</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex shrink>
              <v-tooltip right />
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <div>
                    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                      {{ snackText }}
                      <v-btn text @click="snack = false">Close</v-btn>
                    </v-snackbar>
                    <!-- <form v-for="(pedido, numped) in pedidos" :key="numped"> -->
                      <!-- <v-text-field :v-model="pedido.numped"></v-text-field>  -->
                    <!-- </form>
                    <form> -->
                      <!-- <v-text-field v-model="pedido.numped"></v-text-field> -->
                      <v-text-field v-model="pedido.obs"></v-text-field> 
                      <v-text-field v-model='pedido.obs1' name='OBS1'></v-text-field> 
                      <v-text-field v-model='pedido.obs2'></v-text-field> 
                      <v-btn depressed small color="primary" @click="editar(pedido)">Atualizar</v-btn>
                    <!-- </form> -->
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">OBS1</th>
                            <th class="text-left">OBS2</th>
                            <th class="text-left">OBS3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in pedidos" :key="index">
                            <td>{{ item.OBS }}</td>
                            <td>{{ item.OBS1 }}</td>
                            <td>{{ item.OBS2 }}</td>
                            <td>
                              <v-btn depressed small color="primary" @click="carregaPedido(item)">Editar</v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </template>
                <!-- ????:: Assim tu está maquiando o problema cara achei que tu iria compilar rsrs.. o Vue tem hot reload -->
                <span>Codepen</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
//import Entrada from './views/Inputs.vue'
import Pedido from '@/services/pedidos'
export default {
 // components: {'app-input': Entrada},
  data () {
    return {
      carregamento: {
        numcar: ''
      },
      pedido: {
        numped: "",
        obs: "",
        obs1: "",
        obs2: ""
      },
      pedidos: [],
      carregamentos: [],
      errors: [],
      drawer: false,
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
      ],
    }
  },
  
  created () {
  },

  methods: {
    listar () {
      Pedido.listar(this.pedido.numped).then(response => {
        this.pedidos = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    carregaPedido (pedido) {
      // this.pedido.numped = pedido.NUMPED
      this.pedido.obs = pedido.OBS
      this.pedido.obs1 = pedido.OBS1
      this.pedido.obs2 = pedido.OBS2
    },

    editar () {
      Pedido.atualizar(this.pedido).then(() => {
        this.pedido = {
          numped: this.pedido.numped,
          obs: '',
          obs1: '',
          obs2: ''
        }
        this.errors = {}
        alert('Atualizado')
        this.listar()
      }).catch(e => {
        const response = e.response
        this.errors = response.data.errors
      })
    },

    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    }
  }
}
</script>
