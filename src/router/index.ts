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
    path: '/twit/:idTwit',
    name: PageNameEnum.TWIT,
    component: () => import('../views/TwitView.vue'),
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
  {
    path: '/confirm-email',
    name: PageNameEnum.CONFIRM_EMAIL,
    component: () => import('@/views/ConfirmEmailView.vue'),
    meta: {
      sidebar: false,
      mustBeUnauthenticated: true,
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

    if (to.meta.mustBeUnauthenticated && userStore.isLogged) {
      // Avoid infinite redirection if the user is already on the target route
      if (to.name !== PageNameEnum.MAIN) {
        next({ name: PageNameEnum.MAIN })
      } else {
        next()
      }
    } else if (to.meta.mustBeAuthenticated && !userStore.isLogged) {
      // Avoid infinite redirection if the user is already on the target route
      if (to.name !== PageNameEnum.LOGIN) {
        next({ name: PageNameEnum.LOGIN })
      } else {
        next()
      }
    } else {
      next()
    }
  }
)

export default router
