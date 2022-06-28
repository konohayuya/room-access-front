<template lang="pug">
ui-table(:thead="thead" :fixed-header="false" :tbody="tbody"
  :data="data" :defaultColWidth="300" v-if="Object.keys(newNames).length > 0")
  template(#name="{ data }")
     ui-textfield(v-model="newNames[data.idm]")
  template(#submit="{ data }")
    // newNameが変更されたときにのみ このボタンが有効化される
    ui-button(raised @click="updateIdm(data.idm, newNames[data.idm])"
      :disabled="newNames[data.idm].length < 1 || newNames[data.idm] === data.name"
      v-show="newNames[data.idm] !== data.name") 変更

ui-spinner(:active="Object.keys(newNames).length < 1")
ui-snackbar(v-model="isFailed" timeout-ms="8000") 送信失敗
</template>

<script lang="ts">
import {computed, ComputedRef, onBeforeMount, onBeforeUnmount, Ref, ref} from "vue"
import {useStore} from "vuex"

import {FelicaDatum} from "@/store/types"

export default {
  name: 'IdmList',

  setup() {
    const thead = ['idm', '学生番号', '']
    const tbody = ['idm', {slot: 'name'}, {slot: 'submit'}]

    let cycle = NaN
    const isFailed = ref(false)

    const store = useStore()
    const data: ComputedRef<FelicaDatum[]> = computed(() => store.getters.GetFelicaData)
    const newNames: Ref<{[idm:string]: string}> = ref({})


    onBeforeMount(() => {
      store.dispatch('FetchFelicaData')
        // 変更後の名前と変更前の名前を比較するため
        // 予め変更後の名前の変数に変更前の名前を代入しておく
        .then((result: FelicaDatum[]) => {
        newNames.value = result.reduce((acc, v) => {
          acc[v.idm] = v.name
          return acc
        }, {})
      })

      // 5秒ごとにidmリストを更新
      cycle = setInterval(() => store.dispatch('FetchFelicaData'), 5000)
    })

    onBeforeUnmount(() => clearInterval(cycle))

    const updateIdm = (idm: string, name: string) => {
      const resp = store.dispatch('PutFelicaData', {idm, name})
      resp.catch(() => isFailed.value = true)
    }

    return {thead, tbody, data, newNames, isFailed, updateIdm}
  }
}
</script>

<style scoped>

</style>
