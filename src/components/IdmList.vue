<template lang="pug">
ui-table(:thead="thead" :fixed-header="false" :tbody="tbody"
  :data="data" :defaultColWidth="300" :showProgress="true")
  template(#name="{ data }")
    ui-textfield(v-model="data.nextName")
  template(#submit="{ data }")
    ui-button(raised @click="updateIdm(data.idm, data.nextName)"
      :disabled="data.nextName.length < 1 || data.nextName === data.name"
      v-show="data.nextName !== data.name") 変更

//ui-skeleton(:paragraph="{ rows: 4 }" :title="false" :active="true" :loading="data.length < 1")
ui-snackbar(v-model="isFailed" timeout-ms="8000") 送信失敗
</template>

<script lang="ts">
import {onBeforeMount, onBeforeUnmount, ref} from "vue"

export default {
  name: 'IdmList',

  setup(){
    const data = ref([])

    const thead = ['idm', '学生番号', '']
    const tbody = ['idm', {slot: 'name'}, {slot: 'submit'}]

    let cycle = NaN
    const isFailed = ref(false)

    onBeforeMount(() => {
      getIdmList().then(it =>
      data.value = it.map(v => {
        v.nextName = v.name
        return v
      }))

      cycle = setInterval(() => getIdmList().then(it => {
        it.map((v, i) => {
          data.value[i].idm = v.idm
          data.value[i].name = v.name
        })
      }), 5000)
    })

    onBeforeUnmount(() => clearInterval(cycle))

    const updateIdm = (idm: string, name: string) => {
      putIdm(idm, name)
        .then()
        .catch(() => isFailed.value = true)
    }

    return {thead, tbody, data, isFailed, updateIdm}
  }
}

async function getIdmList(): Promise<{[key: string]: string}[]> {
  const r = await fetch('/api/idm')
  return await r.json()
}

async function putIdm(idm: string, name: string): Promise<void>{
  if (name.length < 1) {
    return Promise.reject(new Error('name arg need some string not empty'))
  }

  const r = await fetch('/api/idm',
    {
      method: 'PUT', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({idm: idm, name: name})
    })
}

</script>

<style scoped>

</style>
