//* 设置环境变量
process.env.NODE_ENV = 'development'

//* 依赖引入
const path = require('path') // node内置 用来获取路径
const { createServer } = require('vite') //* createServer 用于启动vue项目
const Portfinder = require("portfinder") //* 用于获取端口
const rollup = require('rollup')//* 构建包的工具
const { spawn } = require('child_process') //* 创建异步线程 用于创建electron
const electron = require('electron')

//* 配置项引入
const viteConfig = require('./vite.config') //* 引入vite创建需要的配置项
const envConfig = require('../config') //* 引入环境变量需要的配置项
const rollupConfig = require('./rollup.config')

const rollupOption = rollupConfig(process.env.NODE_ENV)

function startWeb() { //* 启动vite项目
    //* 通过环境变量获取端口 通过PortFinder判断端口。通过vite方法进行启动和监听端口
    return new Promise((resolve, reject) => {
        Portfinder.basePort = envConfig.dev.port || 9080 //* 配置要检查的端口
        Portfinder.getPort(async (err, port) => { //* 检查端口是否能正常使用
            if(err) {//* 有错误则返回出去
                reject('PortError: ' + err)
                return
            }
            //* 如果端口没问题，则通过vite进行创建
            const server = await createServer(viteConfig)
            process.env.PORT = port //* 设置环境变量
            //* 监听该端口 进行启动
            server.listen(port).then(() => {
                console.log('port:', port)
            })
            resolve()
        })
    })
}

function startMain() { //* 构建electron文件
    return new Promise((resolve, reject) => {
        //* 创建一个监听模块处理的对象
        const watcher = rollup.watch(rollupOption)
        //* 监听构建事件 会有code https://www.rollupjs.com/guide/javascript-api
        watcher.on('event', event => {
            //* code等于END代表完成所有文件束构建
            if(event.code === 'END') {
                //* 等构建完成后发送出去 通知可以打开
                resolve()
            } else if (event.code === 'ERROR') {
                reject(event.error)
            }
        })
    })
}

function startElectron() {
    //* 构建参数
    var args = [
        '--inspect=5858',
        path.join(__dirname, '../dist/electron/main/main.js')
    ]
    //* 添加环境变量参数 为node地址和当前文件地址
    // detect yarn or npm and process commandline args accordingly
    if (process.env.npm_execpath.endsWith('yarn.js')) {
        args = args.concat(process.argv.slice(3))
    } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
        args = args.concat(process.argv.slice(2))
    }
    //* 异步添加子线程 参数1：要执行的命令 参数2：字符串参数列表
    electronProcess = spawn(electron, args)
    electronProcess.on('close', () => {
        process.exit()
    })
}

//* 启动方法
async function start() {
    await startWeb() //* 启动网页版
    await startMain() //* 构建包
    await startElectron()//* 创建electron应用
}

//* 启动
start()