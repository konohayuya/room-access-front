import {BusDeparture} from "@/store/types"
import axios from "axios"

export const ModuleBusData = {
  state: () => ({
    toNagaoData: [] as BusDeparture[],
    toKuzuhaData: [] as BusDeparture[],
    toHirakatashiKitaData: [] as BusDeparture[],
  }),

  getters: {
    GetToNagaoData (state): BusDeparture[]{
      return state.toNagaoData
    },

    GetToKuzuhaData (state): BusDeparture[]{
      return state.toKuzuhaData
    },

    GetToHirakatashiKitaData (state): BusDeparture[]{
      return state.toHirakatashiKitaData
    },
  },

  mutations: {
    NewToNagaoData (state, ToNagaoData: BusDeparture[]) {
      state.toNagaoData = ToNagaoData
      return
    },

    NewToKuzuhaData (state, ToKuzuhaData: BusDeparture[]) {
      state.toKuzuhaData = ToKuzuhaData
      return
    },

    NewToHirakatashiKitaData (state, ToHirakatashiKitaData: BusDeparture[]) {
      state.toHirakatashiKitaData = ToHirakatashiKitaData
      return
    },
  },

  actions: {
    async FetchBusDepartures ({commit}, url: string): Promise<BusDeparture[]> {
      const resp = await axios.get(url)
      return resp.data.map((data: any) => {
        return new BusDeparture(data.time, data.type)
      })
    },

    async FetchToNagaoData ({dispatch, commit}) {
      const TO_NAGAO_ENDPOINT = '/api/bus/nagao'
      return commit('NewToNagaoData', await dispatch('FetchBusDepartures', TO_NAGAO_ENDPOINT))
    },

    async FetchToKuzuhaData ({dispatch, commit}) {
      const TO_KUZUHA_ENDPOINT = '/api/bus/kuzuha'

      return commit('NewToKuzuhaData', await dispatch('FetchBusDepartures', TO_KUZUHA_ENDPOINT))
    },

    async FetchToHirakatashiKitaData ({dispatch, commit}) {
      const TO_HIRAKATASHI_KITA_ENDPOINT = '/api/bus/hirakatashi-kita'

      return commit('NewToHirakatashiKitaData', await dispatch('FetchBusDepartures', TO_HIRAKATASHI_KITA_ENDPOINT))
    },
  }
}
