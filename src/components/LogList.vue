<template lang="pug">
ui-table(:thead="thead" :fixed-header="true" :tbody="tbody" :data="data.slice(0, 5)" :fullwidth="true")
  template(#state="{ data }")
    // translate to japanese
    span {{ data.state in StateTypeDict ? StateTypeDict[data.state] : data.state }}
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, Ref, ref} from "vue"
import {StateTableHeaderDict, StateTypeDict} from "./StateTranslateList"

export default {
  name: 'LogList',

  setup() {
    let cycle = NaN
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

    const data: Ref<{ [p: string]: string }[]> = ref([])
    data.value = [{name: 'data1', state: 'state1', option: 'option1', time: '2021-11-11'},
      {name: 'data2', state: 'state2', time: '10:01'}]

    onBeforeMount(() => {
      cycle = setInterval(() => {
        getLog().then(it => data.value = it)
      }, 10000)
    })

    onBeforeUnmount(() => clearInterval(cycle))
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
