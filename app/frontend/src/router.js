import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/pages/Login.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import TopTracks from '@/components/pages/TopTracks.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard/top-tracks', name: 'TopTracks', component: TopTracks }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
