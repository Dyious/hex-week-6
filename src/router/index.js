import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'about',
        component: () => import('../views/font/About.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/font/Cart.vue')
      },
      {
        path: 'products',
        component: () => import('../views/font/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/font/Product.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'imageCatch',
        component: () => import('../views/dashboard/ImageCatch.vue')
      }
    ]
  },
  {
    path: '*',
    redicect: '/'
  }

]

const router = new VueRouter({
  routes
})

export default router
