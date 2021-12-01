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

export default {
  name: 'StateList',

  setup() {
    let cycle = NaN
    const stateList: Ref<{[key: string]: string}[]> = ref([])
    const thead: string[] = ['名前', 'ボタン']
    const stateTypeDict = StateTypeDict
    const tbody = ['name', {slot: 'actions'}]

    const isFailed: Ref<boolean> = ref(false)

    onBeforeMount(() => {
      cycle = setInterval(() => {
        getStateList().then(it => stateList.value = it)
      }, 10000)
    })

    onBeforeUnmount(() => clearInterval(cycle))

    const submitState = (name, state) => {
      putState(name, state).then(it => {
        isFailed.value = it
        // update state value
        stateList.value[stateList.value.findIndex(it => it.name === name)].state = state
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
