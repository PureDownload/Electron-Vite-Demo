<template>
  <h1>更新界面 1.1.2</h1>
  <div class="actions">
    <el-button @click="checkUpdate">
      增量更新
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { send, on } from '@renderer/utils/ipcRenderer'

function checkUpdate() {
  //* 检查更新方法 发送通信
  send('hot-update') //通信到main层
}

on('hot-update-success', (event, age) => {
  console.log('热更新成功',age)
  //todo 可添加重启方法
})
</script>