//* 引入依赖
const { resolve } = require('path')
const { defineConfig } = require('vite') //* 用于解析config配置
const vue = require("@vitejs/plugin-vue") //* vue支持

//* 引入配置
const userConfig = require('../config')

const root = resolve('src/renderer') //* 入口文件 index.html所在的位置

//* 生成配置
const config = defineConfig({
    root,//* 入口文件 index.html所在的位置
    define: { //* 设置全局变量
        'process.env': process.env.NODE_ENV === 'production' ? userConfig.build.env : userConfig.dev.env
    },
    base: './', //* 打包之后的index.html里面的引用地址 因为打包之后是地址引用file://。如果使用/的话会导致查找不到文件夹的问题
    mode: process.env.NODE_ENV, //* 默认'development'（serve），'production'（build）配置环境变量
    build: { //* 打包配置
        outDir: resolve('dist/electron/renderer'), //* 打包文件夹
        emptyOutDir: true, //* 打包时清空目录

    },
    plugins: [vue()],
    publicDir: resolve('static') //* 配置静态文件夹,并且会打包到outDir下
})

module.exports = config