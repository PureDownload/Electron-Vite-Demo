<template>
  <div id="pinia">
    index
    version: {{ appTemplate.version }}
    gettersversion: {{ appTemplate.appVersion }}
    <el-button @click="updateVersion">
      修改Version2.0.0
    </el-button>
    <el-button @click="updateVersion3">
      修改Version3.0.0
    </el-button>
    <el-button @click="updateVersion4">
      修改Version4.0.0
    </el-button>
    <el-button @click="updateVersion5">
      修改Version5.0.0
    </el-button>
  </div>
</template>
<script setup lang="ts">
import appStore, { AppStateInterface } from '@store/app'
const appTemplate = appStore()
console.log(appTemplate)

function updateVersion() {
    appTemplate.$patch({
        version: '2.0.0'
    })
}
function updateVersion3() {
    appTemplate.$patch((state:AppStateInterface) => {
      state.version = '3.0.0'
    })
}
function updateVersion4() {
  appTemplate.version = '4.0.0'
}
function updateVersion5() {
  appTemplate.setVersion('5.0.0')
}
</script>