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
div
  font-size 28px
  background #8cff8f
  color  #182e18
  padding 3rem
  margin 1rem

.fa
  margin-right 1rem

#student-id,
#temperature
  color #182e18
  font-size 36px

#enter-button
  color  #182e18
  font-size 32px
</style>
