module.exports = {
  build: {
    env: require("./prod.env"), // 配置环境变量
  },
  dev: {
    env: require("./dev.env"),
    port: 9080,//* 开发环境下使用的端口
  },
  isWeb: process.env.TARGET === 'web'
};
