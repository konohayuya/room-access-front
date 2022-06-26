import {FelicaDatum} from "@/store/types"
import axios from "axios"

export const ModuleFelicaData = {
  state: () => ({
    felicaData: [] as FelicaDatum[],
  }),

  getters: {
    GetFelicaData (state): FelicaDatum[]{
      return state.felicaData
    }
  },

  mutations: {
    NewFelicaData (state, FelicaData: FelicaDatum[]) {
      state.felicaData = FelicaData
      return
    }
  },

  actions: {
    async FetchFelicaData ({commit}) {
      const IDM_ENDPOINT = '/api/idm'

      const resp = await axios.get(IDM_ENDPOINT)
      const felicaData = resp.data as FelicaDatum[]

      commit('NewFelicaData', felicaData)
      return felicaData
    },

    async PutFelicaData ({dispatch, commit}, {idm, name}: {idm: string, name: string}): Promise<void> {
      const IDM_ENDPOINT = '/api/idm'
      return new Promise(((resolve, reject) => {
        const resp = axios.put(IDM_ENDPOINT, {idm, name})
        resp.then(() => {
          dispatch('FetchFelicaData')
          resolve()
        }).catch(() => reject('failed PUT request'))
      }))
    }
  },
}
