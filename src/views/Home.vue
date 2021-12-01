<template lang="pug">
ui-top-app-bar.app-bar(content-selector=".content-wrapper" :nav-icon="false") Title
div.content-wrapper
  side-bar
  div.main-wrapper
    ui-grid
      ui-grid-cell(columns="4")
        enter-field
      ui-grid-cell
        bus-schedule
      ui-grid-cell
        div(:class="$tt('subtitle1')") ログ
        log-list
      ui-grid-cell(columns="8")
        div(:class="$tt('subtitle1')") 入室状況
        state-list
</template>

<script lang="ts">
import EnterField from '@/components/EnterField.vue'
import SideBar from '@/components/SideBar.vue'
import BusSchedule from "@/components/BusSchedule.vue"
import LogList from "@/components/LogList.vue"
import StateList from "@/components/StateList.vue"

export default {
  name: 'App',
  components: {
    StateList,
    LogList,
    BusSchedule,
    SideBar,
    EnterField,
  },
}
</script>

<style lang="stylus">
body
  margin 0
  font-family sans-serif
  //background #cacdce
  color #262626

.main-wrapper
  width 100%
  height 100%
  overflow auto
</style>
