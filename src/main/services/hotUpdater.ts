//* 增量更新 热更新
//* 引入使用的依赖
import axios from "axios"
import { join, resolve } from "path"
import { pipeline } from "stream"
import { promisify } from "util"
import { BrowserWindow, app } from 'electron';
import { gt } from 'semver' //* 用于比对版本大小
import extract from 'extract-zip' //* 用于解压zip包
import { copy, createWriteStream, emptyDir, readFile, remove } from "fs-extra";
import { createHmac } from "crypto";

//* 引入需要的配置项
// import { version } from '../../../package.json'

const streamPipeline = promisify(pipeline) //* 用于存放文件
const request = axios.create() //* 用于请求 拉取文件数据
const appPath = app.getAppPath() //* 获取app安装的路径
const updatePath = resolve(appPath, '..', '..', 'update') //* 增量更新的路径 用于存放更新的zip包
const baseUrl = 'http://localhost:5500/' //* 更新文件下载路径
const version = "1.0.0"

/**
 * 热更新方法
 * @param mainWindow 请求更新的窗口 用于做页面更新使用 
 */
export default async (mainWindow?: BrowserWindow) => {
    try {
        // 1. 获取版本更新json 判断是否需要更新
        const res = await request({ url: baseUrl + 'hot-update.json' })
        //* 2. 比对版本 如果不需要更新则暂停
        if(!gt(res.data.version, version)) return
        //* 3. 先清空放置更新文件的文件夹
        await emptyDir(updatePath)
        //* 4. 获取更新文件的下载路径下载并存放到更新文件夹中
        const updateFilePath = join(updatePath, res.data.name)
        await download(baseUrl + res.data.name, updateFilePath)
        // 5. 获取数据并比对
        // const buffer = await readFile(updateFilePath)
        // const sha256 = hash(buffer)
        // console.log(sha256, '<===== sha256')
        // if (sha256 !== res.data.hash) throw new Error('sha256 error')
        // 生成临时文件 将下载下来的文件解压到临时文件夹
        const appPathTemp = join(updatePath, 'temp')
        await extract(updateFilePath, { dir: appPathTemp })
        // 删除app包
        await remove(join(`${appPath}`, 'dist'));
        await remove(join(`${appPath}`, 'package.json'));
        //* 更新app包
        await copy(appPathTemp, appPath)
        mainWindow?.webContents.send('hot-update-success', {
            updateFilePath,
            updatePath,
            appPath
        })
        resolve('success')
    } catch (error) {
        console.log('下载过程中出现问题', error)
    }
}

/**
 * @param data 文件流
 * @param type 类型，默认sha256
 * @param key 密钥，用于匹配计算结果
 * @returns {string} 计算结果
 * @author umbrella22
 * @date 2021-03-05
 */
 function hash(data, type = 'sha256', key = 'Sky') {
    const hmac = createHmac(type, key)
    hmac.update(data)
    return hmac.digest('hex')
}


/**
 * @param url 下载地址
 * @param filePath 文件存放地址
 * @returns {void}
 * @author umbrella22
 * @date 2021-03-05
 */
async function download(url: string, filePath: string) {
    const res = await request({ url, responseType: "stream" })
    await streamPipeline(res.data, createWriteStream(filePath))
}