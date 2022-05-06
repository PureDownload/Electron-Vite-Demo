<template>
  <h1>更新界面111</h1>
  <div class="actions">
    <el-button @click="checkUpdate">
      检查更新
    </el-button>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="进度"
    center
    width="14%"
    top="45vh"
  >
    <div class="conten">
      <el-progress
        type="dashboard"
        :percentage="percentage"
        :color="colors"
        :status="progressStaus"
      />
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { send, on } from '@renderer/utils/ipcRenderer'
// import { IpcRendererEvent } from 'electron/renderer';
import { messageByText, successMessage } from '@renderer/utils/El'

let percentage = ref(0);
let colors = ref([
  { color: "#f56c6c", percentage: 20 },
  { color: "#e6a23c", percentage: 40 },
  { color: "#6f7ad3", percentage: 60 },
  { color: "#1989fa", percentage: 80 },
  { color: "#5cb87a", percentage: 100 },
]);

let dialogVisible = ref(false);
let progressStaus = ref('');

function checkUpdate() {
  //* 检查更新方法
  send('check-update') //通信到main层
}

on('UpdateMsg', (event, age): void => {
  console.log(event, age)
  switch (age.state) {
    case -1:
      console.log('发生错误')
      break
    case 0:
      messageByText("正在检查更新");
      break;
    case 1:
      successMessage("已检查到新版本，开始下载");
      dialogVisible.value = true;
      break;
    case 2:
      successMessage("无新版本");
      break;
    case 3:
      percentage.value = age.msg.percent.toFixed(1);
      break;
    case 4:
      console.log('添加setTimeout事件')
      setTimeout(() => {
        console.log('退出更新')
        messageByText('退出更新')
        send('confirm-update')
      }, 5000);
      progressStaus.value = "success";
      successMessage('下载完成')
      break;
    default:
      break;
  }
})
</script>