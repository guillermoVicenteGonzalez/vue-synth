import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from "../views/MainLayout.vue"
import TestLayout from "../views/TestLayout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout
    },
    {
      path:"/test",
      name:"test",
      component:TestLayout
    }
  ]
})

export default router
