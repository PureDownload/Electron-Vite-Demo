//* 关于mainWindow的工具类

import { BrowserWindow, IpcMainInvokeEvent } from "electron";

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
