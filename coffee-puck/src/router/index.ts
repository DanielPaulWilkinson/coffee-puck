import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/AdminDashboard.vue';
import brew from '../views/BrewView.vue';
import ManageCoffee from '@/views/ManageCoffee.vue';
import ManageBrew from '@/views/ManageBrew.vue';
import ManageRoasters from '@/views/ManageRoasters.vue';
import ManageVarieties from '@/views/ManageVarieties.vue';

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
      path: '/manage-coffee',
      name: 'manage-coffee',
      component: ManageCoffee
    },    
    {
      path: '/manage-brew',
      name: 'manage-brew',
      component: ManageBrew
    },
    {
      path: '/manage-roasters',
      name: 'manage-roasters',
      component: ManageRoasters
    },
    {
      path: '/manage-varieties',
      name: 'manage-varieties',
      component: ManageVarieties
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
