<template lang="pug">
side-bar.menu(title="入室管理")
div.main-wrapper
  enter-field
</template>

<script lang="ts">
import EnterField from './components/EnterField.vue'
import SideBar from './components/sideBar.vue'

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
  background #f5f6f8
  color #262626

.menu
  height 100%
  position fixed
  top 0
  left 0
  width 250px
  border-right 1px solid rgba(16, 16, 16, 0.10)

.main-wrapper
  /* display: flex; 要素を横並びにする */
  flex-direction column /* 要素の並び順の主軸を指定 上 => 下 */
  min-height 100vh /* 要素の高さの最小値を指定 vhはviewport(表示領域) heightの略 */

  /* サイドバーのwidth分だけ範囲を削除 */
  width calc(100% - 250px)

  /* サイドバーで隠れるので右に寄せる */
  margin-left 250px

  /* ちょっとだけ隙間をとる */
  padding 1rem 1rem 1rem 1rem
  box-sizing border-box
</style>
