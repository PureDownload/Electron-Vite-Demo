# Electron-Vite-Demo
Electron-Vite-Template 模板
#### 引入命令行环境变量
~~~
npm install cross-env --save-dev
使用
package.json
"scripts": {
    "start:web": "cross-env TARGET=web node .electron-vite/dev-runner.js"
},
~~~

#### 优化构建过程中的打印日志
> 使用cfonts，chalk，Multispinner进行打印优化
> 方法使用查看.electron-vite/utils/shell-log.js