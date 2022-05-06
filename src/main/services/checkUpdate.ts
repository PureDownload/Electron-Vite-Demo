//* 检查更新工具类
import { autoUpdater } from "electron-updater";
import { BrowserWindow } from 'electron';

//* 引入工具类
import { sendToRender } from '../utils/MainWindow';
import path from "path";

class CheckUpdate {
  public mainWindow: BrowserWindow | undefined | null
  constructor() {
    //* 设置检查更新的url 可以不设置 忽略
    // autoUpdater.setFeedURL("http://127.0.0.1:5500/");
    //* 修改配置地址 dev使用 开发环境需要注释 根据自己路径来，需要获取app-update.yml
    autoUpdater.updateConfigPath = path.join(__dirname, '../../../build/win-unpacked/resources/app-update.yml')
    this.updaterEvent()
  }
  checkUpdate(mainWindow: BrowserWindow | null) { //* 开始检查更新
    //* 赋值当前需要检查更新的窗口
    this.mainWindow = mainWindow
    autoUpdater.checkForUpdates().catch(err => {
      console.log('网络连接问题', err)
    })
  }
  // 退出并安装
  quitAndInstall() {
    autoUpdater.quitAndInstall()
  }
  updaterEvent() { //* 监听updater的事件
    /**
     * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
     **/
    // 当开始检查更新的时候触发
    autoUpdater.on("checking-for-update", (event, arg) => {
      console.log("开始检查更新", event, arg);
      sendToRender(this.mainWindow,'UpdateMsg', 0)
    });

    // 发现可更新数据时
    autoUpdater.on("update-available", (event, arg) => {
      console.log("有更新", event, arg);
      sendToRender(this.mainWindow,'UpdateMsg', 1)
    });

    // 没有可更新数据时
    autoUpdater.on("update-not-available", (event, arg) => {
      console.log("没有更新", event, arg);
      sendToRender(this.mainWindow, 'UpdateMsg', 2)
    });

    // 下载监听
    autoUpdater.on("download-progress", (progressObj) => {
      console.log(progressObj, '下载监听')
      sendToRender(this.mainWindow,'UpdateMsg', 3, progressObj)
    });

    // 下载完成
    autoUpdater.on("update-downloaded", () => {
      console.log("下载完成");
      sendToRender(this.mainWindow,'UpdateMsg', 4)
    });
    // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err) => {
      console.log('更新出现错误', err.message)
      if (err.message.includes('sha512 checksum mismatch')) {
        sendToRender(this.mainWindow, -1, 'sha512校验失败')
      } else {
        sendToRender(this.mainWindow, -1, '错误信息请看主进程控制台')
      }
    })
  }
}

export default CheckUpdate