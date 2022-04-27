//* 引入依赖
const { sync } = require('del') //* 删除文件 构建之前需要先删除文件
const rollup = require('rollup')//* 构建electron的工具
const { build } = require('vite') //* 构建web包的工具

//* 引入配置
//* 配置项引入
const viteConfig = require('./vite.config') //* 引入vite创建需要的配置项
const rollupConfig = require('./rollup.config')
const rollupOption = rollupConfig(process.env.NODE_ENV) //* 获取electron打包配置

//* 工具类引入
const { printTitle, blueLog, startMultispinner, doneBgLog } = require('./utils/shell-log.js')

let m = null;//* 滚轮样式时会启动

function buildApp() { //* 构建App包
    return new Promise((resolve, reject) => {
        //* 删除使用的包
        sync(['dist/electron/main/*'])
        rollup.rollup(rollupOption)
            .then(build => {
                build.write(rollupOption.output)
                //* 发送success事件给滚轮
                m && m.success('main')
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })  
}

function buildWeb() { //* 构建web包
    return new Promise((resolve, reject) => {
        //* 删除包
        sync(['dist/electron/renderer/*'])
        build(viteConfig).then((res) => {
            //* 发送success事件给滚轮
            m && m.success('renderer')
            resolve()
        })
        .catch(() => {
            reject()
        })
    })
}

function startCLL() { //* 开启两个滚轮样式
    //* 开启两个滚轮样式
    m = startMultispinner(['main', 'renderer'])
}

function start() { //* 启动构建方法
    //* 打印标题
    printTitle('Electron-Vite-Build')
    startCLL() //* 开启滚轮

    Promise.all([buildApp(),buildWeb()])
    .then(()=> {
        doneBgLog('Web Build Success!')
        doneBgLog('App Build Success!')
        //* 成功退出
        process.exit()
    })
    .catch(() => {
        //* 报错 退出环境 code:1 为错误
        process.exit(1)
    })
}

start()