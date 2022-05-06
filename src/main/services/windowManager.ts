//* 依赖引入
import { BrowserWindow } from 'electron'
import { join } from 'path' //* 路径
import { getUrl } from '../utils/URL'
import { mainWindowConfig } from '../config/windowConfig';//* 窗口配置项
import { Mainfunc } from './ipcMain'

const winURL = getUrl("", join(__dirname, '..', 'renderer', 'index.html')); //* 获取vue的路径
// const winURL = 'http://localhost:9080/'
class MainInit {
    public mainWindow: BrowserWindow | undefined
    createMainWindow() {
        //* 创建一个窗口对象
        this.mainWindow = new BrowserWindow({
            titleBarStyle: 'default', //* 设置标题栏样式
            ...Object.assign(mainWindowConfig, {})
        })
        //* 加载vue页面
        this.mainWindow.loadURL(winURL)
        this.mainWindow.openDevTools();
        Mainfunc()//* 启用和render的监听
    }
    initWindow() { //* 初始化窗口
        console.log('<===== 要来创建窗口')
        this.createMainWindow()
    }
}

export default MainInit