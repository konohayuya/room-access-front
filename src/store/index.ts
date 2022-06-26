import { createStore } from 'vuex'
import { ModulePersonStates } from "@/store/PersonState"
import { ModulePersonLogs } from "@/store/PersonLogs"
import {ModuleBusData} from "@/store/BusData"
import {ModuleFelicaData} from "@/store/FelicaData"

export const store = createStore({
  modules: {
    state: ModulePersonStates,
    log: ModulePersonLogs,
    bus: ModuleBusData,
    felica: ModuleFelicaData,
  },
})

