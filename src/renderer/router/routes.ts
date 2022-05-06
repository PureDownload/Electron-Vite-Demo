import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {path: '/', name: '首页', component: () => import('@renderer/pages/index/index.vue')},
    {path: '/pinia', name: 'pinia', component: () => import('@renderer/pages/pinia/index.vue')},
    {path: '/update', name: 'update', component: () => import('@renderer/pages/update/index.vue')}
]

export default routes