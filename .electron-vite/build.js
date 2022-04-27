//* 引入依赖
const { sync } = require('del') //* 删除文件 构建之前需要先删除文件
const rollup = require('rollup')//* 构建electron的工具
const { build } = require('vite') //* 构建web包的工具

//* 引入配置
//* 配置项引入
const viteConfig = require('./vite.config') //* 引入vite创建需要的配置项
const rollupConfig = require('./rollup.config')
const rollupOption = rollupConfig(process.env.NODE_ENV) //* 获取electron打包配置

function buildApp() { //* 构建App包
    return new Promise((resolve, reject) => {
        //* 删除使用的包
        sync(['dist/electron/main/*'])
        rollup.rollup(rollupOption)
            .then(build => {
                build.write(rollupOption.output)
                console.log('App Build Success!!!')
                resolve()
            })
            .catch(error => {
                console.log('App Build Fail!!!', error)
                reject(error)
            })
    })  
}

function buildWeb() { //* 构建web包
    return new Promise((resolve, reject) => {
        //* 删除包
        sync(['dist/electron/renderer/*'])
        build(viteConfig).then((res) => {
            console.log('Web Build Success!!!')
            resolve()
        })
        .catch(() => {
            console.log('Web Build Faild!!!')
            reject()
        })
    })
}

function start() { //* 启动构建方法
    Promise.all([buildApp(),buildWeb()])
    .then(()=> {
        //* 成功退出
        process.exit()
    })
    .catch(() => {
        //* 报错 退出环境 code:1 为错误
        process.exit(1)
    })
}

start()