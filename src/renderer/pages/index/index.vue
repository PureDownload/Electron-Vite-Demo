<template>
  <h1>更新界面</h1>
  文件地址{{ filePath }}
  <div class="actions">
    <el-button @click="checkUpdate">
      检查更新,下载更新
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
//* element-plus 工具类封装
import {  ElMessageBox } from "element-plus";
const { shell } = require("electron");

let percentage = ref(0);
let colors = ref([
  { color: "#f56c6c", percentage: 20 },
  { color: "#e6a23c", percentage: 40 },
  { color: "#6f7ad3", percentage: 60 },
  { color: "#1989fa", percentage: 80 },
  { color: "#5cb87a", percentage: 100 },
]);
let filePath = ref('')

let dialogVisible = ref(false);
let progressStaus = ref('');

function checkUpdate() {
  //* 检查更新方法 发送通信
  send('start-download') //通信到main层
  dialogVisible.value = true
}

on("download-progress", (event, arg) => {//* 进度条
  percentage.value = Number(arg);
});
on("download-error", (event, arg) => {
  if (arg) {
    progressStaus.value = "exception";
    percentage.value = 40;
    colors.value = "#d81e06";
  }
});
on("download-paused", (event, arg) => {
  if (arg) {
    progressStaus.value = "warning";
    ElMessageBox.alert("下载由于未知原因被中断！", "提示", {
      confirmButtonText: "重试",
      callback: (action) => {
        checkUpdate();
      },
    });
  }
});
on("download-done", (event, age) => {
  filePath.value = age.filePath;
  progressStaus.value = "success";
  ElMessageBox.alert("更新下载完成！", "提示", {
    confirmButtonText: "确定",
    callback: (action) => {
      shell.openPath(filePath.value);
    },
  });
});
</script>