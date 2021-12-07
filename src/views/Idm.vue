<template lang="pug">
ui-top-app-bar.app-bar(content-selector=".content-wrapper" :nav-icon="false") Log
div.content-wrapper
  side-bar
  div.main-wrapper
    idm-list
</template>

<script lang="ts">
import SideBar from '@/components/SideBar.vue'
import IdmList from "@/components/IdmList.vue"

export default {
  name: 'IDM',
  components: {SideBar, IdmList}
}
</script>

<style scoped lang="stylus">
idm-list
  margin auto
</style>
