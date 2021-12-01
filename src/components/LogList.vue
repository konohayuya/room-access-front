<template lang="pug">
ui-table(:thead="thead" :fixed-header="true" :tbody="tbody" :data="data.slice(0, 5)" :fullwidth="true")
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, Ref, ref} from "vue"
import {StateTableHeaderDict, StateTypeDict} from "./StateTranslateList"

export default {
  name: 'LogList',

  setup() {
    let cycle = NaN
    const thead = Object.values(StateTableHeaderDict)
    const tbody = Object.keys(StateTableHeaderDict)

    const data: Ref<{ [p: string]: string }[]> = ref([])
    data.value = [{name: 'data1', state: 'state1', option: 'option1', time: '2021-11-11'},
      {name: 'data2', state: 'state2', time: '10:01'}]

    onBeforeMount(() => {
      cycle = setInterval(() => {
        getLog().then(it => data.value = it)
      }, 10000)
    })

    onBeforeUnmount(() => clearInterval(cycle))
    return {thead, tbody, data}
  }
}

async function getLog(): Promise<{[key: string]: string}[]> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const r = await fetch('/api/log')
  const rawList = await r.json()

  // '2020-01-01 10:10:10' convert to today -> '10:10' /  yesterday and earlier -> '2020-01-01'
  return rawList.map(it => {
    if (it.state in StateTypeDict){
      it.state = StateTypeDict[it.state]
    }

    if (new Date(it.time) > today) {
      it.time = it.time.slice(11, 16)
    } else {
      it.time = it.time.slice(0, 10)
    }
    return it
  })
}
</script>

<style scoped>

</style>
