import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/pages/Login.vue';
import Dashboard from '@/components/pages/Dashboard.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
