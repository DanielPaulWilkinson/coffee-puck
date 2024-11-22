import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/AdminDashboard.vue';
import ManageCoffee from '../views/ManageCoffee.vue';
import ManageBrew from '@/views/ManageBrew.vue';
import ManageRoasters from '@/views/ManageRoasters.vue';
import ManageVarieties from '@/views/ManageVarieties.vue';
import Search from '@/views/Search.vue';
import Settings from '@/views/Settings.vue';
import ScrapeManagement from '@/views/ScrapeManagement.vue';

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
      path: '/communities',
      name: 'communities',
      component: Search
    }, 
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/manage-scrapes',
      name: 'manage-scrapes',
      component: ScrapeManagement,
    }
    

  ]
});

export default router;
