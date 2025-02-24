import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: PageNameEnum.MAIN,
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: PageNameEnum.LOGIN,
    component: () => import('../views/LoginView.vue'),
    meta: {
      sidebar: false,
    },
  },
  {
    path: '/red',
    name: PageNameEnum.RED,
    component: () => import('../views/RedView.vue'),
    meta: {
      sidebar: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach(
//     (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
//         if (to.name === PageNameEnum.LOGIN && storeAuth().token) {
//             next({ name: PageNameEnum.PROJECTS })
//             return
//         }
//         if (to.meta.authenticated) {
//             if (!storeAuth().token) {
//                 next({ name: PageNameEnum.LOGIN })
//                 return
//             } else {
//                 apiInterceptor()
//             }
//         }
//         next()
//     },
// )

export default router
