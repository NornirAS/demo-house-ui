import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/HomePage.vue')
const PropertyManagement = () => import('@/views/PropertyManagement.vue')
const FloorManagement = () => import('@/views/FloorManagement.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/property-management',
    name: 'propertyManagement',
    component: PropertyManagement,
  },
  {
    path: '/floor-management/:floor',
    name: 'floorManagement',
    component: FloorManagement,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
