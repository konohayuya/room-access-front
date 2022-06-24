import axios from "axios"
import { PersonLog } from "@/store/types"

export const ModulePersonLogs = {
  state: () => ({
    logs: [] as PersonLog[]
  }),

  getters: {
    GetLogs (state): PersonLog[]{
      return state.logs
    },
  },

  mutations: {
    NewLogs (state, Logs: PersonLog[]) {
      state.logs = Logs
      return
    }
  },

  actions: {
    async FetchLogs ({commit}) {
      const LOG_ENDPOINT = '/api/log'

      const resp = await axios.get(LOG_ENDPOINT)
      commit('NewLogs', await resp.data as PersonLog[])
    }
  }
}
