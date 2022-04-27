//* 引入依赖
const { say } = require('cfonts')//* 标题样式
const chalk = require('chalk') //* 设置log文字颜色 API https://www.npmjs.com/package/chalk
const os = require('os')//* 用于获取ip
const Multispinner = require('Multispinner')//* 控制台滚轮样式

//* bg样式
const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '

function startMultispinner(tasks) { //* 开启滚轮
    const m = new Multispinner(tasks, {
        preText: 'building',
        postText: 'process'
    })
    return m
}

function electronLog(data, color) { //* electron应用内的log语句打印
    if (data) {
        let log = ''
        data = data.toString().split(/\r?\n/)
        data.forEach(line => {
            log += `  ${line}\n`
        })
        console.log(
            chalk[color].bold(`┏ Electron -------------------`) +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }

}

function logStats(proc, data) { //* 日志打印
    let log = ''

    log += chalk.yellow.bold(`┏ ${proc} '编译过程' ${new Array((19 - proc.length) + 1).join('-')}`)
    log += '\n\n'

    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false
        }).split(/\r?\n/).forEach(line => {
            log += '  ' + line + '\n'
        })
    } else {
        log += `  ${data}\n`
    }

    log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'
    console.log(log)
}

//* 打印web地址
function printWebUrl(port) {
    const ip =  getIPv4()
    console.log('Web Listan: ', chalk.green.bold('http://localhost'+':'+port))
    console.log('            ', chalk.green.bold('http://'+ip+':'+port))
}

//* 获取局域网ip
function getIPv4() {
    //同一接口可能有不止一个IP4v地址，所以用数组存
    let ipv4s = [];
    //获取网络接口列表对象
    let interfaces = os.networkInterfaces();
    Object.keys(interfaces).forEach(function(key) {
        interfaces[key].forEach(function(item) {
            //跳过IPv6 和 '127.0.0.1'
            if ('IPv4' !== item.family || item.internal !== false) return;
            ipv4s.push(item.address); //可用的ipv4s加入数组
        })
    })
    return ipv4s[0]; //返回一个可用的即可
}

//* 通用标题
function printTitle(title) {
    say(title, {
        colors: ['yellow'],
        font: 'simple3d',
        space: false
    })
}

//* 打印字体颜色
function doneBgLog(text) {
    console.log(doneLog + text)
}
function greenLog(text) {
    logByColor(text, 'green')
}
function yellowLog(text) {
    logByColor(text, 'yellow')
}
function blueLog(text) {
    logByColor(text, 'blue')
}

//* 根据颜色进行打印
function logByColor(text, color) {
    console.log(chalk[color].bold(text))
}

module.exports = {
    printTitle, //* 通用标题打印
    yellowLog, //* 颜色日志
    blueLog,
    printWebUrl,//* 打印web地址
    electronLog, //* electron程序内输出的log
    logStats,
    startMultispinner,
    doneBgLog
}