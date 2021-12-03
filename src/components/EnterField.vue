<template lang="pug">
ui-form(item-margin-bottom="24" action-align="right" type="|")
  template(#default="{itemClass, actionClass}")
    ui-form-field(:class="itemClass")
      label
        ui-icon assignment_ind
        |  学生番号
      ui-textfield(v-model="studentID" :disabled="receivedStudentID")
    ui-form-field(:class="itemClass")
      label
        ui-icon device_thermostat
        |  体温 {{ (temperature / 10).toFixed(1) }}
      ui-slider(v-model="temperature" type="continuous" :min="350" :max="379" :step="1" :key="enabledSlider" :disabled="!enabledSlider")
    ui-form-field(:class="actionClass")
      ui-button(raised icon="login" @click="formSubmit()" :disabled="studentID.length === 0 || isSending") 入室
ui-snackbar(v-model="isSending" timeout-ms="4000") 記録送信中
ui-snackbar(v-model="isFailed" timeout-ms="8000") 送信失敗
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, ref} from 'vue'
//@ts-ignore
import {useBus} from "balm-ui/plugins/event"

export default {
  name: "enter-field",
  props: {
  },

  setup() {
    const studentID = ref('')
    const temperature = ref(365)
    const receivedStudentID = ref(false)
    const isSending = ref(false)
    const isFailed = ref(false)

    const bus = useBus()

    const enabledSlider = ref(false)

    let cycle = NaN
    onBeforeMount(() => {
      cycle = setInterval(() => getName().then(it => {
        if (typeof it == "string" && it.length > 0){
          studentID.value = it
          receivedStudentID.value = true
        }
      }), 5000)

      // for fix Slider point
      setTimeout(() => enabledSlider.value = true, 5000)
    })

    onBeforeUnmount(() => clearInterval(cycle))

    const formSubmit = () => {
      // eslint-disable-next-line no-console
      console.log('{', studentID.value, ',', temperature.value / 10, '}')
      isSending.value = true

      // form send
      const res = fetch('/api/login',
          {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: studentID.value, temp: (temperature.value / 10).toFixed(1) + '℃'})
          })

      res.catch(() => isFailed.value = true)
      res.then(() => {
        // reset Value
        studentID.value = ''
        temperature.value = 365
        receivedStudentID.value = false
        bus.emit('stateChange')
        bus.emit('logChange')
      })
    }

    return {studentID, temperature, receivedStudentID, isSending, isFailed, enabledSlider, formSubmit}
  },
}

async function getName(): Promise<string> {
  const r = await fetch('/api/name')
  return await r.json().then(it => it)
}

</script>

<style scoped lang="stylus">
</style>
