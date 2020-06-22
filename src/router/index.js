import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requeresAuth: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login.vue')
  },
  {
    name: 'series',
    path: '/series',
    component: () => import(/* webpackChunkName: "series" */ '../pages/Series.vue'),
    meta: {
      showNavbar: true,
      title: 'Séries',
      icon: 'dvr',
      label: 'Todas as séries',
      requeresAuth: true
    }
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: () => import(/* webpackChunkName: "watchlist" */ '../pages/Watchlist.vue'),
    meta: {
      showNavbar: true,
      title: 'Watchlist',
      icon: 'playlist_play',
      label: 'Quero assistir',
      requeresAuth: true
    }
  },
  {
    name: 'watchedlist',
    path: '/watchedlist',
    component: () => import(/* webpackChunkName: "watchedlist" */ '../pages/Watchedlist.vue'),
    meta: {
      showNavbar: true,
      title: 'Watchedlist',
      icon: 'playlist_add_check',
      label: 'Já assisti',
      requeresAuth: true
    }
  },
  {
    path: '/serie/:id',
    name: 'show-serie',
    component: () => import(/* webpackChunkName: "show-serie" */ '../pages/ShowSerie.vue'),
    meta: {
      requeresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - Series`
  const currentUser = localStorage.getItem('token')
  const requeresAuth = to.matched.some(record => record.meta.requeresAuth)

  if(requeresAuth && !currentUser) next({ name: 'login' })
  else if(!requeresAuth && currentUser) next({ name: 'home' })
  else next()
})

export default router
