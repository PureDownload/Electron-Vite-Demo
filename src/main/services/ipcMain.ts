//* 用于管理main层的监听工具类
import { ipcMain } from "electron"
import AppUpdate from './checkUpdate'

//* 引入工具类
import { getMainWindowByIpcEvent } from '../utils/MainWindow'

let appUpdate = null

function onEvent() { //* 监听从rendener层传送过来的数据
    console.log('进来监听事件')
    ipcMain.handle('check-update', (event) => { //* 监听检查更新事件
        appUpdate.checkUpdate(getMainWindowByIpcEvent(event))
    })
    ipcMain.handle('confirm-update', () => {
        console.log('confirm-update')
        appUpdate.quitAndInstall()
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