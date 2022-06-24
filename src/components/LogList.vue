<template lang="pug">
ui-table(:thead="thead" :fixed-header="true" :tbody="tbody"
  :data="isShort ? data.slice(0, 7) : data" :fullwidth="true")
  template(#state="{ data }")
    // translate to japanese
    span {{ StateTypeDict[data.state] }}

ui-skeleton(:paragraph="{ rows: 10 }" :title="false" :active="true" :loading="data.length < 1")
</template>

<script lang="ts">
import {computed, ComputedRef, onBeforeMount} from "vue"
import {useStore} from "vuex"
import {StateTableHeaderDict, StateTypeDict} from "./StateTranslateList"
import {PersonLog} from "@/store/types"

export default {
  name: 'LogList',
  props: {
    isShort: {
      type: Boolean,
      default: true,
    }
  },

  setup() {
    const thead = Object.values(StateTableHeaderDict)
    const tbody = ['name', {slot: 'state'}, 'option',
      {field : 'time',
      // '2020-01-01 10:10:10' convert to today -> '10:10' /  yesterday and earlier -> '2020-01-01'
      fn: data => {
        const today = new Date()
        today.setHours(0 ,0, 0, 0)
        if (new Date(data.time) > today){
          return data.time.slice(11, 16)
        } else{
          return data.time.slice(0, 10)
        }
      }}]

    const store = useStore()
    const data: ComputedRef<PersonLog[]> = computed(() => store.getters.GetLogs)

    onBeforeMount(() => {
      store.dispatch('FetchLogs')
    })

    return {thead, tbody, data, StateTypeDict}
  }
}

async function getLog(): Promise<{[key: string]: string}[]> {
  const r = await fetch('/api/log')
  return await r.json()
}
</script>

<style scoped>

</style>
