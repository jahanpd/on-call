import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { auth } from '../main'

const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
   if (auth.currentUser) {
    next();
   }
   else {
    next("/")
   }
  } catch (error) {
   next("/")
  }
 }

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Authentication.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tools'
      },
      {
        path: 'referral',
        component: () => import('@/views/Referral.vue'),
        beforeEnter: guard
      },
      {
        path: 'list',
        component: () => import('@/views/List.vue'),
        beforeEnter: guard
      },
      {
        path: 'tools',
        component: () => import('@/views/Tools.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
