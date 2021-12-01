<template lang="pug">
ui-table(:data="stateList" :thead="['', '']" :tbody="tbody")
  template(#actions="{ data }")
    span(v-for="(v, k) in stateTypeDict" :key="k")
      ui-button(unelevated @click="submitState(data.name, k)" :disabled="data.state === k") {{ v }}


ui-snackbar(v-model="isFailed" timeout-ms="8000") 送信失敗
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, Ref, ref} from "vue"
import {StateTypeDict} from "./StateTranslateList"
//@ts-ignore
import {useBus} from "balm-ui/plugins/event"

export default {
  name: 'StateList',

  setup() {
    const stateList: Ref<{[key: string]: string}[]> = ref([])
    const thead: string[] = ['名前', 'ボタン']
    const stateTypeDict = StateTypeDict
    const tbody = ['name', {slot: 'actions'}]

    const isFailed: Ref<boolean> = ref(false)

    const bus = useBus()

    onBeforeMount(() => {
      getStateList().then(it => stateList.value = it)
      bus.on('stateChange', () => setTimeout( () => getStateList().then(it => stateList.value = it), 100))
    })

    onBeforeUnmount(() => bus.off('stateChange'))

    const submitState = (name, state) => {
      putState(name, state).then(it => {
        isFailed.value = it
        bus.emit('stateChange')
        bus.emit('logChange')
      })
    }

    return {stateList, stateTypeDict, thead, tbody, isFailed, submitState}
  }
}

async function getStateList(): Promise<{[key: string]: string}[]> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const r = await fetch('/api/state')
  return await r.json()
}

async function putState(name: string, state: string): Promise<boolean> {

  const res = fetch('/api/state',
    {method: 'PUT', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, state: state})})

  res.then(() => {return true})
  res.catch(() => {return false})
  return false
}

</script>

<style lang="stylus">

</style>
