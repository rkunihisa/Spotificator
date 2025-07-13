<template>
  <div>
    <h1>Spotificator</h1>
    <Button @click="loginWithSpotify">Connect your spotify account</Button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from '@/components/modules/Button.vue';

const router = useRouter();
const route = useRoute();

function loginWithSpotify() {
  window.location.href = 'http://127.0.0.1:3000/auth/login';
}

onMounted(() => {
  // Spotify認証後に?access_token=...がクエリにあれば保存しDashboardへ
  if (route.query.access_token) {
    localStorage.setItem('access_token', route.query.access_token);
    if (route.query.refresh_token) {
      localStorage.setItem('refresh_token', route.query.refresh_token);
    }
    router.replace('/dashboard');
  }
});
</script>
