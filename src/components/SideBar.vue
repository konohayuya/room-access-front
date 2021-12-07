<template lang="pug">
ui-drawer(viewport-height type="permanent" nav-id="menu")
  ui-drawer-content
    ui-nav
      router-link.router-link(to='/')
        ui-nav-item(href="javascript:void(0);")
          ui-item-first-content
            ui-icon login
          ui-item-text-content 入室管理
      router-link.router-link(to='/log')
        ui-nav-item(href="javascript:void(0);")
          ui-item-first-content
            ui-icon format_list_bulleted
          ui-item-text-content 入室記録
      router-link.router-link(to='/idm')
        ui-nav-item(href="javascript:void(0);")
          ui-item-first-content
            ui-icon recent_actors
          ui-item-text-content idmリスト
      router-link.router-link(to='/')
        ui-nav-item(href="javascript:void(0);")
          ui-item-first-content
            ui-icon hourglass_bottom
          ui-item-text-content タイマー(未実装)
</template>

<script lang="ts">
export default {
  name: 'side-bar',
  props: {
  },
}
</script>

<style scoped lang="stylus">
indent-width = 30px
.router-link
  text-decoration none
  color inherit
</style>
