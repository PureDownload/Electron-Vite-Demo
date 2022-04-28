//* 依赖引入
const path = require("path");
const replace = require("@rollup/plugin-replace"); //* 变量替换插件
const alias = require("@rollup/plugin-alias");
const { builtinModules } = require("module"); //* 不想打包的模块名
const esbuild = require("rollup-plugin-esbuild").default; //* 编译配置 比如 ts的使用

const config = (env = "production") => {
  const mainConfig = {
    input: path.join(__dirname, "../src/main/index.ts"),
    output: {
      //* 输出
      file: path.join(__dirname, "../dist/electron/main/main.js"),
      format: "cjs",
      name: "MainProcess",
      sourcemap: false,
    },
    plugins: [
      replace({
        //* 替换路径
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(env),
      }),
      esbuild({
        // All options are optional
        include: /\.[jt]s?$/, // default, inferred from `loaders` option
        exclude: /node_modules/, // default
        sourceMap: false, // default
        minify: process.env.NODE_ENV === "production",
        target: "es2017", // default, or 'es20XX', 'esnext'
        // Like @rollup/plugin-replace
        define: {
          __VERSION__: '"x.y.z"',
        },
        // Add extra loaders
        loaders: {//* 编译ts
          // Add .json files support
          // require @rollup/plugin-commonjs
          ".json": "json",
          ".ts": "ts",
          // Enable JSX in .js files too
        },
      }),
      alias({
        //* 路径别名
        entries: [
          {
            find: "@main",
            replacement: path.join(__dirname, "..", "src", "main"),
          },
          {
            find: "@config",
            replacement: path.join(__dirname, "..", "config"),
          },
          {
            find: "@common",
            replacement: path.join(__dirname, "..", "src", "common"),
          },
        ],
      }),
    ],
    external: [
      //* 需要在项目中使用的依赖需要在这里引用
      ...builtinModules,
      "electron",
    ],
  };
  return mainConfig;
};

module.exports = config;
