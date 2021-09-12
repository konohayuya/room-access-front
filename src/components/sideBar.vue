<template lang="pug">
ul.sidebar-inner
  li: a(target="_blank")
    font-awesome-icon.fa(:icon="['fas', 'user-circle']" fixed-width)
    | 入室管理
  li: a(target="_blank")
    font-awesome-icon.fa(:icon="['fas', 'id-card']" fixed-width)
    | 入室記録
  li: a(target="_blank")
    font-awesome-icon.fa(:icon="['fas', 'hourglass-half']" fixed-width)
    | タイマー
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'side-bar',
})
</script>

<style scoped lang="stylus">
.sidebar-inner
  background #333333
  margin 0
  padding 0
  align-items center
  border-top 1px solid rgba(255, 255, 255, 0.10)

.sidebar-inner li
  list-style none
  color #fafafa
  text-transform uppercase
  /*font-weight bold*/
  padding 30px
  cursor pointer
  border-bottom 1px solid rgba(255, 255, 255, 0.10)

.sidebar-inner li span
  display block
  font-size 14px
  color rgba(16, 16, 16, 0.50)

.sidebar-inner li a
  color #fafafa
  text-transform uppercase
  cursor pointer
  text-decoration none

.sidebar-inner .fa
  margin-right 1rem

</style>
