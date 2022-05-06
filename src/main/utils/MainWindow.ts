//* 关于mainWindow的工具类

import { app, BrowserWindow, IpcMainInvokeEvent } from "electron";
import path from "path";
// import { arch, platform } from "os";
// import packageInfo from '../../../package.json'

//* 根据Ipc获取mainWindow
export function getMainWindowByIpcEvent(event: IpcMainInvokeEvent) {
  return BrowserWindow.fromWebContents(event.sender);
}

//* 发送信息给渲染层(vue)
export function sendToRender(
  mainWindow: BrowserWindow | undefined | null,
  code: string,
  type: number,
  data?: string
) {
  if(!mainWindow) {
    return
  }
  const senddata = {
    state: type,
    msg: data || "",
  };
   mainWindow.webContents.send(code, senddata);
}

const fileName = 'electron-vite-demo Setup 1.0.0.exe'
// 获取下载路径
export function getDownloadPath() {
  // const version: string = packageInfo.version //* 获取版本
  // const Sysarch: string = arch().includes('64') ? 'win64' : 'win32' //* 获取window版本
  // const isWin: boolean = platform().includes('win32')

  return 'http://127.0.0.1:5500/' + fileName
}

export function getHistoryPath() {
  return path.join(app.getPath('downloads'), fileName)
}