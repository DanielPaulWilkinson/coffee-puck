import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/AdminDashboard.vue';
import brew from '../views/BrewView.vue';

const router = createRouter({
  linkActiveClass: "selected",
  linkExactActiveClass: "selected",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/brew',
      name: 'brew',
      component: brew
    },
    {
      path: '/brew/:coffeeId',
      name: 'brewCoffee',
      component: brew
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
