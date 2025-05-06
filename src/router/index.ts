import PageNameEnum from '@/core/types/enums/pageNameEnum'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'

const routes = [
  {
    path: '/',
    name: PageNameEnum.MAIN,
    component: () => import('../views/HomeView.vue'),
    meta: {
      sidebar: true,
      mustBeAuthenticated: true,
    },
  },
  {
    path: '/login',
    name: PageNameEnum.LOGIN,
    component: () => import('../views/LoginView.vue'),
    meta: {
      sidebar: false,
      mustBeUnauthenticated: true,
    },
  },
  {
    path: '/messages',
    name: PageNameEnum.MESSAGES,
    components: {
      default: () => import('../views/MessagesView.vue'),
      message_details: () => import('../components/Message/MessageDetails.vue'),
    },
    meta: { sidebar: true, mustBeAuthenticated: true },
  },
  {
    path: '/messages/:id',
    name: PageNameEnum.MESSAGES_DETAIL,
    components: {
      default: () => import('../views/MessagesView.vue'),
      message_details: () => import('../components/Message/MessageDetails.vue'),
    },
    meta: { sidebar: true, mustBeAuthenticated: true },
  },
  {
    path: '/messages/:id/info',
    name: PageNameEnum.MESSAGES_DETAIL_INFO,
    components: {
      default: () => import('../views/MessagesView.vue'),
      message_details_info: () => import('../components/Message/MessageDetailsInfo.vue'),
    },
    meta: { sidebar: true, mustBeAuthenticated: true },
  },
  {
    path: '/profil',
    name: PageNameEnum.PROFIL,
    component: () => import('@/views/ProfilView.vue'),
    meta: {
      sidebar: true,
      mustBeAuthenticated: true,
    },
  },
  {
    path: '/:username',
    name: PageNameEnum.PROFIL,
    component: () => import('@/views/ProfilView.vue'),
    meta: {
      sidebar: true,
      mustBeAuthenticated: true,
    },
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(
  (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const userStore = useLoginStore()

    if (to.meta.mustBeUnauthenticated && !userStore.isLogged) {
      next({ name: PageNameEnum.LOGIN })
    } else if (to.meta.mustBeUnauthenticated && userStore.isLogged) {
      next({ name: PageNameEnum.MAIN })
    } else {
      next()
    }
  }
)

export default router
