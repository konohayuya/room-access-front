<template lang="pug">
ui-top-app-bar.app-bar(content-selector=".content-wrapper" :nav-icon="false") Title
div.content-wrapper
  side-bar
  div.main-wrapper
    ui-grid
      ui-grid-cell(columns="4")
        enter-field
</template>

<script lang="ts">
import EnterField from './components/EnterField.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
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
