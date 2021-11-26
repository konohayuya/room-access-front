<template lang="pug">
ui-form(#default="actionClass" :item-margin-bottom="16")
  ui-form-field
    label
      ui-icon assignment_ind
      |  学生番号
    ui-textfield(v-model="studentID")
  ui-form-field
    label
      ui-icon device_thermostat
      |  体温
    ui-slider(v-model="temperature" type="discrete" :min="35" :max="38" :step="0.1")
  ui-form-field(:class="actionClass")
    ui-button(raised icon="login" @click="formSubmit()") 入室
ui-snackbar(v-model="isSnackOpen" timeout-ms="4000") 記録送信中
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: "enter-field",
  props: {
  },
  setup() {
    const studentID = ref('')
    const temperature = ref(36.5)
    const isSnackOpen = ref(false)

    const formSubmit = () => {
      // eslint-disable-next-line no-console
      console.log('{', studentID.value, ',', temperature.value, '}')
      isSnackOpen.value = true

      // form send

      // reset Value
      studentID.value = ''
      temperature.value = 36.5

    }

    return { studentID, temperature, isSnackOpen, formSubmit }
  },
}
</script>

<style scoped lang="stylus">
</style>
