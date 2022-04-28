import { defineStore } from "pinia";

declare interface AppState {
    version: string
}

const useAppStore = defineStore({
    id: 'app',
    state: ():AppState => ({
        version: '1.0.0'
    }),
    getters: {
        appVersion():string {
            return this.version || '1.0.0'
        }
    },
    actions: {
        setVersion(version: string) {
            this.version = version
        }
    }
})

export declare type AppStateInterface = AppState

export default useAppStore