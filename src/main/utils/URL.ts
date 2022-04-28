const isDev = process.env.NODE_ENV === 'development';
/**
 * 获取真正的地址
 *
 * @param {string} devPath 开发环境路径
 * @param {string} proPath 生产环境路径
 * @param {string} [hash=""] hash值
 * @param {string} [search=""] search值
 * @return {*}  {string} 地址
 */
export function getUrl(devPath: string, proPath: string, hash = "", search = "") {
    const url = isDev ? new URL(`http://localhost:${process.env.PORT}`) : new URL('file://');
    url.pathname = isDev ? devPath : proPath;
    url.hash = hash;
    url.search = search;
    return url.href;
  }