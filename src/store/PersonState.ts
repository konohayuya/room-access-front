import axios from 'axios'
import { PersonState } from "@/store/types"

export const ModulePersonStates = {
  state: () => ({
    states: [] as PersonState[]
  }),

  getters: {
    GetStates (state): PersonState[] {
      return state.states
    },
  },

  mutations: {
    NewStates (state, states: PersonState[]) {
      state.states = states
      return
    }
  },

  actions: {
    async FetchStates ({commit}) {
      const STATE_ENDPOINT = '/api/state'

      const resp = await axios.get(STATE_ENDPOINT)
      commit('NewStates', resp.data as PersonState[])
    },

    async PutStates ({dispatch, commit}, {name, state}: {name: string, state: PersonState}): Promise<void> {
      const STATE_ENDPOINT = '/api/state'
      return new Promise(((resolve, reject) => {
        const resp = axios.put(STATE_ENDPOINT, {name, state})
        resp.then(() => {
          dispatch('FetchStates')
          dispatch('FetchLogs')
          resolve()
        })
          .catch(() => reject('failed PUT request'))
      }))
    },
  }
}
