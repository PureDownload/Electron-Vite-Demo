//* 依赖引入
const path = require('path')
const replace = require("@rollup/plugin-replace"); //* 变量替换插件
const alias = require('@rollup/plugin-alias')
const { builtinModules } = require('module') //* 不想打包的模块名


const config = (env = 'production') => {
    const mainConfig = {
        input: path.join(__dirname, '../src/main/index.js'),
        output: { //* 输出
            file: path.join(__dirname, '../dist/electron/main/main.js'),
            format: 'cjs',
            name: 'MainProcess',
            sourcemap: false,
        },
        plugins: [
            replace({ //* 替换路径
                preventAssignment: true,
                "process.env.NODE_ENV": JSON.stringify(env),
            }),
            alias({ //* 路径别名
                entries: [
                    { find: '@main', replacement: path.join(__dirname, '..', 'src', 'main'), },
                    { find: '@config', replacement: path.join(__dirname, '..', 'config') },
                    { find: '@common', replacement: path.join(__dirname, '..', 'src', 'common') },
                ]
            })
        ],
        external: [ //* 需要在项目中使用的依赖需要在这里引用
            ...builtinModules,
            'electron'
        ],
    }
    return mainConfig
}

module.exports = config