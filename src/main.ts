import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import { demoData } from './lib/demo'
import { replaceAll } from './lib/store'

if (new URLSearchParams(location.search).has('demo')) replaceAll(demoData())

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue'), meta: { title: 'Today' } },
    { path: '/brew/new', component: () => import('./views/NewBrewView.vue'), meta: { title: 'New brew' } },
    { path: '/brew/:id/edit', component: () => import('./views/NewBrewView.vue'), meta: { title: 'Edit brew' } },
    { path: '/brew/:id', component: () => import('./views/HintView.vue'), meta: { title: 'Dial-in' } },
    { path: '/beans', component: () => import('./views/ShelfView.vue'), meta: { title: 'Bean shelf' } },
    { path: '/beans/new', component: () => import('./views/BeanFormView.vue'), meta: { title: 'Add bean' } },
    { path: '/beans/:id/edit', component: () => import('./views/BeanFormView.vue'), meta: { title: 'Edit bean' } },
    { path: '/beans/:id', component: () => import('./views/BeanView.vue'), meta: { title: 'Bean' } },
    { path: '/history', component: () => import('./views/HistoryView.vue'), meta: { title: 'History' } },
  ],
})
router.afterEach((to) => { document.title = `${to.meta.title ?? ''} · Brew Journal` })

createApp(App).use(router).mount('#app')
