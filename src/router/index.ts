import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartPage.vue'),
      meta: { requiresAuth: true } // Cart page requires authentication
    }
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  
  // Check if the route requires authentication
  if (to.meta.requiresAuth && !token) {
    // Redirect to home page and show alert
    alert('Please login to access your cart! 🔐')
    next('/')
  } else {
    next()
  }
})

export default router