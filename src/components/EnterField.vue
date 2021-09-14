<template lang="pug">
div: form(v-on:submit.prevent="formSubmit")
  p
    label(for="student-id")
      font-awesome-icon.fa(:icon="['fas', 'id-card']" fixed-width)
      | 学生番号
    br
    input(type="text" id="student-id" name="student-id" v-model="studentID")
  p
    label(for="temperature")
      font-awesome-icon.fa(:icon="['fas', 'thermometer-three-quarters']" fixed-width)
      | 体温
    br
    select#temperature(v-model="temperature")
      option(v-for="(n, i) in 31" :key="35 + i/10" :value="35 + i/10") {{(35 + i / 10).toFixed(1)}}
  button#enter-button(type="submit")
    font-awesome-icon(:icon="['fas', 'sign-in-alt']" fixed-width class="fa")
    | 入室
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: "enter-field",
  props: {
  },
  setup() {
    const studentID = ref('')
    const temperature = ref(37)

    const formSubmit = () => {
      // eslint-disable-next-line no-console
      console.log(studentID.value)
      // eslint-disable-next-line no-console
      console.log(temperature.value)

      // form send

      // reset Value
      studentID.value = ''
      temperature.value = 37
    }

    return { studentID, temperature, formSubmit }
  },
}
</script>

<style scoped lang="stylus">
vendor(prop, args)
  -webkit-{prop} args
  -moz-{prop} args
  {prop} args

char-color = #202d1e

div
  font-size 28px
  background #f5f6f8
  color char-color
  padding 3rem
  margin 0.5rem
  vendor(border-radius, 5px)
  shadows = inset 1px 1px 0 0 rgba(255,255,255, 0.2), inset -1px -1px 0 0 rgba(0,0,0, 0.2)
  vendor(box-shadow, shadows)

p
  margin-top 0

.fa
  margin-right 1rem

#student-id,
#temperature
  -webkit-appearance: none;
  color char-color
  background #f4f5f4
  font-size 32px
  width 240px
  border 1px solid rgba(80, 80, 80, 0.5)
  vendor(border-radius, 5px)
  padding 5px 5px 5px 10px

#enter-button
  color #eeeeee
  background #538a9a
  alignment left
  font-size 32px
  width 6em
  border none
</style>
