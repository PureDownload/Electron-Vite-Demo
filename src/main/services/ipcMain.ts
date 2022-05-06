//* 用于管理main层的监听工具类
import { ipcMain } from "electron"

//* 引入通信后需要使用的工具类
import AppUpdate from './checkUpdate'
import DownloadFile from "./downloadFile"

//* 引入工具类
import { getMainWindowByIpcEvent, getDownloadPath, getHistoryPath } from '../utils/MainWindow'

//* 通信后需要使用的对象
let appUpdate = null


function onEvent() { //* 监听从rendener层传送过来的数据
    ipcMain.handle('check-update', (event) => { //* 监听检查更新事件
        appUpdate.checkUpdate(getMainWindowByIpcEvent(event))
    })
    ipcMain.handle('confirm-update', () => { //* 关闭并重新安装事件
        appUpdate.quitAndInstall()
    })
    // 开始下载事件监听
    ipcMain.handle('start-download', (event, msg) => {
        new DownloadFile(getMainWindowByIpcEvent(event), getDownloadPath(), getHistoryPath()).start()
    })
}

export function Mainfunc() {
    //* 初始化对象
    appUpdate = new AppUpdate()
    //* 监听事件
    onEvent()
}

//* 用于管理ipc通信
export default  {
    
}