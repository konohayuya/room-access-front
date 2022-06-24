import axios from "axios"
import {PersonLog, StateType} from "@/store/types"

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
      const logs = resp.data.map((data: {name: string, state: StateType, option: string, time: string}) => {
        return new PersonLog(data.name, data.state, data.option, data.time)
      },)

      commit('NewLogs', logs)
    }
  }
}
