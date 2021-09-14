<template lang="pug">
div
  h1.head  {{ title }}
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

export default {
  name: 'side-bar',
  props: {
    title: String
  },
}
</script>

<style scoped lang="stylus">
char-color = #fafafa

div
  background #333333
  color char-color

.sidebar-inner
  margin 0
  padding 0
  border-top 1px solid rgba(255, 255, 255, 0.10)

h1
  text-align center

.sidebar-inner li
  list-style none
  font-size 20px
  color char-color
  text-align center
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
  color char-color
  text-transform uppercase
  cursor pointer
  text-decoration none

.sidebar-inner .fa
  margin-right 1rem

</style>
