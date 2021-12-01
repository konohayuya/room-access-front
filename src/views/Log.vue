<template lang="pug">
ui-top-app-bar.app-bar(content-selector=".content-wrapper" :nav-icon="false") Log
div.content-wrapper
  side-bar
  div.main-wrapper
    log-list(:is-short="false")
</template>

<script lang="ts">
import SideBar from '@/components/SideBar.vue'
import LogList from "@/components/LogList.vue"

export default {
  name: 'Log',
  components: {
    SideBar,
    LogList,
  },
}
</script>

<style scoped>

</style>
