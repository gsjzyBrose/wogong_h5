import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'home'
    }
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'detail',
    path: '/detail',
    component: () => import('@/view/detail/index.vue'),
    meta: {
      title: 'detail'
    }
  },
  {
    name: 'companyDetail',
    path: '/companyDetail',
    component: () => import('@/view/companyDetail/index.vue'),
    meta: {
      title: 'detail'
    }
  },
  {
    name: 'listDetail',
    path: '/listDetail',
    component: () => import('@/view/companyDetail/components/listDetail.vue'),
    meta: {
      title: 'listDetail'
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
