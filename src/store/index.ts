import { createStore } from 'vuex'
import { ModulePersonStates } from "@/store/PersonState"
import { ModulePersonLogs } from "@/store/PersonLogs"

export const store = createStore({
  modules: {
    state: ModulePersonStates,
    log: ModulePersonLogs,
  },
})

