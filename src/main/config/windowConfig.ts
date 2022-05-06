import { BrowserWindowConstructorOptions } from 'electron';

export const mainWindowConfig: BrowserWindowConstructorOptions = {
    height: 800,
    useContentSize: true,
    width: 1700,
    minWidth: 1366,
    show: true,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: false,
        // 如果是开发模式可以使用devTools
        devTools: true,
        // 在macos中启用橡皮动画
        scrollBounce: true,
    }
};