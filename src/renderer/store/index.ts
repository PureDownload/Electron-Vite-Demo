import { createPinia } from 'pinia'
import app from './modules/app'

const store = createPinia()

// //* 工程化
// const modulesFiles = import.meta.globEager('./modules/*.ts')
// const modules = Object.entries(modulesFiles).reduce((modules, [path, mod]) => {
//   const moduleName:string = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
//   modules[moduleName] = mod.default
//   return modules
// }, {})

app(store)

export default store