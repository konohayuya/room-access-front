<template lang="pug">
ui-form(#default="actionClass" item-margin-bottom="16")
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
  ui-form-field(class="actionClass")
    ui-button(raised icon="login" @click="formSubmit()" :disabled="studentID.length === 0 || isSending") 入室
ui-snackbar(v-model="isSending" timeout-ms="4000") 記録送信中
ui-snackbar(v-model="isFailed" timeout-ms="8000") 送信失敗
</template>

<script lang="ts">
import {ref} from 'vue'
//@ts-ignore
import {useBus} from "balm-ui/plugins/event"

export default {
  name: "enter-field",
  props: {
  },

  setup() {
    const studentID = ref('')
    const temperature = ref(36.5)
    const isSending = ref(false)
    const isFailed = ref(false)

    const bus = useBus()

    const formSubmit = () => {
      // eslint-disable-next-line no-console
      console.log('{', studentID.value, ',', temperature.value, '}')
      isSending.value = true

      // form send
      const res = fetch('/api/login',
        {method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: studentID.value, temp: temperature.value.toFixed(1) + '℃'})})

      res.catch( () => isFailed.value = true)
      res.then( () => {
        // reset Value
        studentID.value = ''
        temperature.value = 36.5
        bus.emit('stateChange')
        bus.emit('logChange')
      })
    }

    return { studentID, temperature, isSending, isFailed, formSubmit }
  },
}
</script>

<style scoped lang="stylus">
</style>
