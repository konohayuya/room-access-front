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
import moment from "moment"
import {StateTableHeaderDict, StateTypeDict} from "@/components/StateTranslateList"
import {PersonLog} from "@/store/types"

export default {
  name: 'LogList',
  props: {
    isShort: {
      type: Boolean,
      default: true,
    }
  },

  setup(props) {
    const thead = Object.values(StateTableHeaderDict)
    const tbody = ['name', {slot: 'state'}, 'option',
      {field : 'time',
      fn: data => {
        const today = moment().startOf('day')
        const diff = today.diff(moment(data.time).startOf('day'), 'days')

        if (!props.isShort) {
          return moment(data.time).format('YYYY/MM/DD HH:mm:ss')
        }
        // today -> HH:mm / yesterday ->  昨日 HH:mm / other -> MM/DD HH:mm
        else if (diff === 0) {
          return moment(data.time).format('HH:mm')
        }
        else if (diff === 1) {
          return moment(data.time).format('昨日 HH:mm')
        }
        else if (diff > 1) {
          return moment(data.time).format('MM/DD HH:mm')
        }
        else {
          return moment(data.time).format('未来 YYYY/MM/DD HH:mm')
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
</script>

<style scoped>

</style>
