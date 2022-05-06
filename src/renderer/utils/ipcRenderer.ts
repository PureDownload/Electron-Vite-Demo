//* 用于向main层通信的封装方法
const { ipcRenderer } = require("electron"); //* vite引入electron需要使用require

export function send(code: string) { //* 发送事件
    ipcRenderer.invoke(code)
}

export function on(code: string, callback: (event, age: unknown) => void) { //* 监听事件
    return ipcRenderer.on(code, callback)
}

export default {
    send,
    on
}