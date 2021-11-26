<template lang="pug">
ui-drawer(viewport-height)
  ui-drawer-content
    ui-nav
      ui-nav-item
        ui-item-first-content
          ui-icon login
        ui-item-text-content 入室管理
      ui-nav-item
        ui-item-first-content
          ui-icon format_list_bulleted
        ui-item-text-content 入室記録
      ui-nav-item
        ui-item-first-content
          ui-icon hourglass_bottom
        ui-item-text-content タイマー
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default {
  name: 'side-bar',
  props: {
  },
}
</script>

<style scoped lang="stylus">
indent-width = 30px
</style>
