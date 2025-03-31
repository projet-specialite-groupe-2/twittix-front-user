import PageNameEnum from '@/core/types/enums/pageNameEnum'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: PageNameEnum.MAIN,
    component: () => import('../views/HomeView.vue'),
    meta: {
      sidebar: true,
    },
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
    path: '/messages',
    name: PageNameEnum.MESSAGES,
    components: {
      default: () => import('../views/MessagesView.vue'),
      message_details: () => import('../components/Message/MessageDetails.vue'),
    },
    meta: { sidebar: true },
  },
  {
    path: '/messages/:id',
    name: PageNameEnum.MESSAGES_DETAIL,
    components: {
      default: () => import('../views/MessagesView.vue'),
      message_details: () => import('../components/Message/MessageDetails.vue'),
    },
    meta: { sidebar: true },
  },
] as RouteRecordRaw[]

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
