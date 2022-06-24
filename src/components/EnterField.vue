<template lang="pug">
ui-form(item-margin-bottom="24" action-align="right" type="|")
  template(#default="{itemClass, actionClass}")
    ui-form-field(:class="itemClass")
      label
        ui-icon assignment_ind
        |  学生番号
      // カードをかざした場合は入力できないようにする
      ui-textfield(v-model="studentID" :disabled="receivedStudentID")
    ui-form-field(:class="itemClass")
      label
        // バグにより小数点が丸め込まれるため,内部的には10倍の値で管理する
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
import {useStore} from "vuex"

export default {
  name: "enter-field",
  props: {
  },

  setup() {
    const studentID = ref('')
    // バグにより小数点が丸め込まれるため,内部的には10倍の値で管理する
    const temperature = ref(365)
    const receivedStudentID = ref(false)
    const isSending = ref(false)
    const isFailed = ref(false)

    const store = useStore()

    const enabledSlider = ref(false)

    let cycle = NaN
    onBeforeMount(() => {
      // 5000msごとに名前(学籍番号)の取得をする
      // カードをかざした場合に名前(学籍番号)を入力されていることにする
      cycle = setInterval(() => getName().then(it => {
        if (typeof it == "string" && it.length > 0){
          studentID.value = it
          receivedStudentID.value = true
        }
      }), 5000)

      // 初期状態だとスライダーがずれていた
      // バージョンアップしたら不要になるかも
      setTimeout(() => enabledSlider.value = true, 2000)
    })

    onBeforeUnmount(() => clearInterval(cycle))

    const formSubmit = () => {
      isSending.value = true

      // form send
      const res = fetch('/api/login',
          {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            // 10倍の値で管理しているため,1/10の値で送信する
            body: JSON.stringify({name: studentID.value, temp: (temperature.value / 10).toFixed(1) + '℃'})
          })

      res.catch(() => isFailed.value = true)
      res.then(() => {
        // 送信成功したら初期状態に戻す
        studentID.value = ''
        temperature.value = 365
        receivedStudentID.value = false
        // 送信成功したので,それぞれのリフレッシュ
        store.dispatch('FetchStates')
        store.dispatch('FetchLogs')
      })
    }

    return {studentID, temperature, receivedStudentID, isSending, isFailed, enabledSlider, formSubmit}
  },
}

// 名前(学生番号)の取得
async function getName(): Promise<string> {
  const r = await fetch('/api/name')
  return await r.json().then(it => it)
}

</script>

<style scoped lang="stylus">
</style>
