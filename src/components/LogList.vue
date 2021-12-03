<template lang="pug">
ui-table(:thead="thead" :fixed-header="true" :tbody="tbody" :data="isShort ? data.slice(0, 7) : data" :fullwidth="true")
  template(#state="{ data }")
    // translate to japanese
    span {{ data.state in StateTypeDict ? StateTypeDict[data.state] : data.state }}
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, Ref, ref} from "vue"
import {StateTableHeaderDict, StateTypeDict} from "./StateTranslateList"
//@ts-ignore
import {useBus} from "balm-ui/plugins/event"

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

    const data: Ref<{ [p: string]: string }[]> = ref([])

    const bus = useBus()

    onBeforeMount(() => {
      getLog().then(it => data.value = it)
      bus.on('logChange', () => getLog().then(it => data.value = it))
    })

    onBeforeUnmount(() => bus.off('logChange'))

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
