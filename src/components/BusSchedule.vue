<template lang="pug">
div 長尾駅行き
ui-list
  ui-skeleton(:paragraph="{ rows: 3 }" :title="false" :active="true" :loading="toNagaoList.length < 1")
  ui-item(v-for="it in toNagaoList.slice(0, 3)" :key="it" v-shadow="0")
    ui-item-text-content {{ it.time.toTimeString().slice(0, 5) }}
    ui-item-last-content
      ui-button.custom-button(outlined) {{ it.type }}

div 枚方市駅北口行き
ui-list
  ui-skeleton(:paragraph="{ rows: 1 }" :title="false" :active="true" :loading="toHirakatashiKitaList.length < 1")
  ui-item(v-for="it in toHirakatashiKitaList.slice(0, 1)" :key="it")
    ui-item-text-content {{ it.time.toTimeString().slice(0, 5) }}
    ui-item-last-content
      ui-button(outlined) {{ it.type}}

div 樟葉駅行き
ui-list
  ui-skeleton(:paragraph="{ rows: 3 }" :title="false" :active="true" :loading="toKuzuhaList.length < 1")
  ui-item(v-for="it in toKuzuhaList.slice(0, 3)" :key="it")
    ui-item-text-content {{ it.time.toTimeString().slice(0, 5) }}
    ui-item-last-content
      ui-button(outlined) {{ it.type }}
</template>

<script lang="ts">
import {computed, ComputedRef, onBeforeMount, onBeforeUnmount} from "vue"
import {useStore} from "vuex"
import {BusDeparture} from "@/store/types"

export default {
  name: 'BusSchedule',
  setup(){

    const store = useStore()

    let cycles = NaN
    const toNagaoList: ComputedRef<BusDeparture[]> = computed(() => store.getters.GetToNagaoData)
    const toKuzuhaList: ComputedRef<BusDeparture[]> = computed(() => store.getters.GetToKuzuhaData)
    const toHirakatashiKitaList: ComputedRef<BusDeparture[]> = computed(() => store.getters.GetToHirakatashiKitaData)

    onBeforeMount(() => {
      // 初回だけすぐに取得
      store.dispatch('FetchToNagaoData')
      store.dispatch('FetchToKuzuhaData')
      store.dispatch('FetchToHirakatashiKitaData')

      // 30sごとに取得
      cycles = setInterval(() => {
        const now = new Date()

        // 直近のバスがすでに通り過ぎていたら取得
        // 日が変わった直後なら取得(リストが空の場合は前半の条件がfalseを返すため)
        if(toNagaoList.value[0]?.time < now || now.toTimeString().slice(0, 5) === '00:00'){
          store.dispatch('FetchToNagaoData')
        }

        if(toKuzuhaList.value[0]?.time < now || now.toTimeString().slice(0, 5) === '00:00'){
          store.dispatch('FetchToKuzuhaData')
        }

        if(toHirakatashiKitaList.value[0]?.time < now || now.toTimeString().slice(0, 5) === '00:00'){
          store.dispatch('FetchToHirakatashiKitaData')
        }

    },30000)},)

    onBeforeUnmount(() => clearInterval(cycles))

    return {toNagaoList, toKuzuhaList, toHirakatashiKitaList}
  }
}
</script>

<style lang="stylus">
ui-button.custom-button
  $outline-color rgba(16, 16, 16, 0.3)
</style>
