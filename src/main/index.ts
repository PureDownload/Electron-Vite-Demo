'use strict'
//* 依赖引入
import { app } from 'electron'
import InitWindow from './services/windowManager'
//* 监听启动完成事件 则打开窗口
function onAppReady() { //* App准备完成事件
    new InitWindow().initWindow()
}
app.whenReady().then(onAppReady)

app.on('window-all-closed', () => {
    // 所有平台均为所有窗口关闭就退出软件
    app.quit()
})

// 生产环境下需要注释
Object.defineProperty(app, 'isPackaged', {
  get() {
    return true;
  }
});