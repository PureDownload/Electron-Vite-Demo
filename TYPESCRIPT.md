### 引入typescript
~~~ cmd
// 下载依赖
npm install typescript --save-dev
//* 初始化ts 会生成tsconfig.json
tsc -init
~~~

~~~json
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true, // https://cn.vitejs.dev/guide/features.html#typescript-compiler-options
    "module": "esnext",
    "moduleResolution": "node", // 指定模块解析策略，'node' 用于 Node.js 的 CommonJS 实现
    "strict": true,
    "allowJs": true, // 允许编译器编译JS，JSX文件
    "checkJs": true,
    "noEmit": true, // 编译后不输出任何js文件
    "jsx": "preserve", // 在 .tsx 中支持 JSX
    "sourceMap": true, // 生成目标文件的 sourceMap 文件
    "resolveJsonModule": true, // 允许导入带有“.json”扩展名的模块
    "esModuleInterop": true, // CommonJS/AMD/UMD 模块导入兼容
    "importHelpers": true, // 模块导入辅助，通过 tslib 引入 helper 函数，https://www.typescriptlang.org/tsconfig#importHelpers
    "experimentalDecorators": true,
    "skipLibCheck": true, // 跳过库声明文件的类型检查
    "allowSyntheticDefaultImports": true, // 允许如 import React from "react" 这样的默认导入（从没有设置默认导出的模块中默认导入）
    "suppressImplicitAnyIndexErrors": true, // 禁止报告对象索引的隐式 anys 错误
    "baseUrl": "./", // 非绝对地址的模块会基于这个目录去解析，默认值是当前目录
    "types": ["node", "vite/client"], // 指定加载【哪些】声明文件包，如不设置此项，默认会加载全部能找到的 node_modules/@types/xxx 包
    // "vite/client"用于 vite 项目中的一些类型定义补充，https://www.typescriptlang.org/tsconfig#types
    "isolatedModules": true, // https://cn.vitejs.dev/guide/features.html#typescript-compiler-options
    "paths": {
      // 配置具体如何解析 require/import 的导入，值是基于 baseUrl 路径的映射列表。https://www.typescriptlang.org/tsconfig#paths
      "@/*": ["src/*"],
      // ...
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"] // 编译时引入的 ES 功能库
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules"] // 解析时跳过的文件
}
~~~

#### 引入Element-Plus
~~~
// 安装依赖
npm install element-plus --save
~~~

#### 引入eslint支持
[教程]('https://juejin.cn/post/7043702363156119565')
~~~
npm install eslint -D
// 初始化
npx eslint --init

npm install eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D

package.json
{
    "scripts":{
        // lint当前项目中的文件并且开启自动修复
        "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
    }
}

.eslintrc.json
{
    "env": {
      "vue/setup-compiler-macros":true
    },
    "extends": [
        "eslint:recommended",
        -- "plugin:vue/essential",
        ++ "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
}
~~~

#### 引入pinia状态管理工具
~~~
npm install pinia
// 实现查看src/store文件夹
~~~

#### 引入vue-router