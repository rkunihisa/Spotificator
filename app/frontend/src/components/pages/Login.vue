<template>
  <div class="min-h-screen bg-[#121212] flex items-center justify-center font-sans">
    <div class="bg-[#181818] rounded-xl shadow-lg px-8 py-10 w-full max-w-md flex flex-col items-center">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-3">
        <svg width="36" height="36" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block"><circle cx="84" cy="84" r="84" fill="#1DB954"/><path d="M120.1 115.2c-1.7 2.8-5.3 3.7-8.1 2-22.2-13.6-50.2-16.7-83.2-9.2-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.6-8 66.2-4.5 91.1 10.5 2.8 1.7 3.7 5.3 2 8.3zm11.6-23.2c-2.1 3.4-6.5 4.5-9.9 2.4-25.4-15.5-64.2-20-94.2-11-3.8 1.1-7.8-1.1-8.9-4.9-1.1-3.8 1.1-7.8 4.9-8.9 33.6-9.7 75.1-4.8 103.6 12.1 3.4 2.1 4.5 6.5 2.4 9.9zm12.2-25.1c-29-17.2-77.2-18.8-104.6-10.3-4.4 1.3-9-1.2-10.3-5.6-1.3-4.4 1.2-9 5.6-10.3 30.6-9.2 83.2-7.4 116.2 11.6 4 2.4 5.3 7.7 2.9 11.7-2.4 4-7.7 5.3-11.7 2.9z" fill="#fff"/></svg>
        Spotificator
      </h1>
      <div class="h-1 w-24 bg-[#1db954] rounded mb-8"></div>
      <Button @click="loginWithSpotify" class="w-full">Connect your Spotify account</Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import Button from '@/components/modules/Button.vue';

const router = useRouter();
const route = useRoute();

function loginWithSpotify() {
  window.location.href = 'http://127.0.0.1:3000/auth/login';
}

onMounted(() => {
  const authStore = useAuthStore();
  if (route.query.access_token) {
    authStore.setTokens(route.query.access_token, route.query.refresh_token);
    router.replace('/dashboard');
  }
});
</script>
