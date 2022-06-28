<template lang="pug">
ui-table(:data="stateList" :thead="['', '']" :tbody="tbody" v-if="stateList.length > 0" )
  template(#actions="{ data }")
    span(v-for="(v, k) in StateTypeDict" :key="k")
      ui-button(unelevated @click="submitState(data.name, k)" :disabled="data.state === k") {{ v }}

ui-skeleton(:paragraph="{ rows: 3 }" :title="false" :active="false" :loading="stateList.length < 1")

ui-snackbar(v-model="isFailed" timeout-ms="8000") 送信失敗
</template>

<script lang="ts">
import {computed, ComputedRef, onBeforeMount, Ref, ref} from "vue"
import {StateTypeDict} from "./StateTranslateList"
import {useStore} from "vuex"

import {PersonState} from "@/store/types"

export default {
  name: 'StateList',

  setup() {
    const thead: string[] = ['名前', 'ボタン']
    const tbody = ['name', {slot: 'actions'}]

    const isFailed: Ref<boolean> = ref(false)

    const store = useStore()

    const stateList: ComputedRef<PersonState[]> = computed(() => store.getters.GetStates)

    onBeforeMount(() => {
      // 現在の入室状況を問い合わせている
      store.dispatch('FetchStates')
    })

    const submitState = (name: string, state: PersonState) => {
      const resp = store.dispatch('PutStates', {name, state})
      // 失敗したらトースト表示
      resp.catch(() => isFailed.value = true)
    }

    return {stateList, StateTypeDict, thead, tbody, isFailed, submitState}
  }
}

async function getStateList(): Promise<{[key: string]: string}[]> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const r = await fetch('/api/state')
  return await r.json()
}

</script>

<style lang="stylus">

</style>
