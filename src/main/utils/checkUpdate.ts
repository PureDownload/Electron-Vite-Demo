//* 检查更新工具类
import { autoUpdater } from "electron-updater";

class CheckUpdate {
  constructor() {
    //* 设置检查更新的url
    autoUpdater.setFeedURL("http://127.0.0.1:25565/");
    this.updaterEvent()
  }
  updaterEvent() { //* 监听updater的事件
    // 当开始检查更新的时候触发
    autoUpdater.on("checking-for-update", (event, arg) => {
      console.log("开始检查更新", event, arg);
    });

    // 发现可更新数据时
    autoUpdater.on("update-available", (event, arg) => {
      console.log("有更新", event, arg);
    });

    // 没有可更新数据时
    autoUpdater.on("update-not-available", (event, arg) => {
      console.log("没有更新", event, arg);
    });

    // 下载监听
    autoUpdater.on("download-progress", (progressObj) => {
      console.log(progressObj, '下载监听')
    });

    // 下载完成
    autoUpdater.on("update-downloaded", () => {
      console.log("下载完成");
    });
  }
}
