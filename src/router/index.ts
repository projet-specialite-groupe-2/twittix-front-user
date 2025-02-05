import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AboutView.vue'),
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
