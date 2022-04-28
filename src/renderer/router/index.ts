import { createRouter, createWebHashHistory } from "vue-router";

import routers from './routes'

export default createRouter({
    history: createWebHashHistory(),
    routes: routers
})