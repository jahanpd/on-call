import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { auth } from '../main'

const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
      next();
      }
      else {
      console.log('no user registered');
      next("/login");
      }
    })
  } catch (error) {
    next("/login")
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tools'
    // component: () => import('@/views/Authentication.vue')
  },
  {
    path: '/login',
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
        component: () => import('@/views/Tools.vue'),
        beforeEnter: guard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
