import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../menu/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children:[
          {
            path: '/main',
            name: 'main',
            component: () => import('../views/main/main.vue'),
          }
        ]
      },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

