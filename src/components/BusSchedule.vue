<template lang="pug">
div 長尾駅行き
ui-list
  ui-skeleton(:paragraph="{ rows: 3 }" :title="false" :active="true" :loading="toNagaoList.length < 1")
  ui-item(v-for="it in toNagaoList.slice(0, 2)" :key="it" v-shadow="0")
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
import {onBeforeMount, onBeforeUnmount, ref, Ref} from "vue"

export default {
  name: 'BusSchedule',
  setup(){

    let cycles = NaN
    let toNagaoList: Ref<BusDeparture[]> = ref([])
    const toNagaoURL = "/api/bus/nagao"
    let toKuzuhaList: Ref<BusDeparture[]> = ref([])
    const toKuzuhaURL = "/api/bus/kuzuha"
    let toHirakatashiKitaList: Ref<BusDeparture[]> = ref([])
    const toHirakatashiKitaURL = "/api/bus/hirakatashi-kita"

    onBeforeMount(() => {
      // get list first time
      ToStation(toNagaoURL)
        .then(it => toNagaoList.value = it)
      ToStation(toKuzuhaURL)
        .then(it => toKuzuhaList.value = it)
      ToStation(toHirakatashiKitaURL)
        .then(it => toHirakatashiKitaList.value = it)

      // register update event
      cycles = setInterval(() => {
        const now = new Date()

        // update data if first elem past
        if(toNagaoList.value[0]?.time < now || now.toTimeString().slice(0, 5) === '00:00'){
          ToStation(toNagaoURL)
            .then(it => toNagaoList.value = it)
        }

        if(toKuzuhaList.value[0]?.time < now || now.toTimeString().slice(0, 5) === '00:00'){
          ToStation(toKuzuhaURL)
            .then(it => toKuzuhaList.value = it)
        }

        if(toHirakatashiKitaList.value[0]?.time < now || now.toTimeString().slice(0, 5) === '00:00'){
          ToStation(toHirakatashiKitaURL)
            .then(it => toHirakatashiKitaList.value = it)
        }

    },30000)},)

    // unregister update event
    onBeforeUnmount(() => clearInterval(cycles))

    return {toNagaoList, toKuzuhaList, toHirakatashiKitaList}
  }
}

class BusDeparture {
  time: Date
  type: string

  constructor(time: string, type: string) {
    const [hour, minutes] = time.split(":")
    const d = new Date()
    d.setHours(parseInt(hour))
    d.setMinutes(parseInt(minutes))
    d.setSeconds(0, 0)
    this.time = d
    this.type = type
  }
}

async function ToStation(url: string): Promise<BusDeparture[]>{
  const r = await fetch(url)
  const raw_list = await r.json()
  return raw_list.map(it => new BusDeparture(it["time"], it["type"]))
}

</script>

<style lang="stylus">
ui-button.custom-button
  $outline-color rgba(16, 16, 16, 0.3)
</style>
