<template>
  <div id="index">
    index
    version: {{ appTemplate.version }}
    <el-button @click="updateVersion">
      修改Version
    </el-button>
  </div>
</template>
<script setup lang="ts">
import appStore from '@store/app'
const appTemplate = appStore()
console.log(appTemplate)
function updateVersion() {
    appTemplate.$patch({
        version: '2.0.0'
    })
}
</script>