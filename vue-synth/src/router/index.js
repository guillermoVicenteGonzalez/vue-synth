import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from "../views/MainLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout
    }
  ]
})

export default router
