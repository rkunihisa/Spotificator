
<template>
  <div>
    <h1>Your Top Tracks</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const topTracks = ref('');

onMounted(() => {
  accessToken.value = localStorage.getItem('access_token') || '';
  refreshToken.value = localStorage.getItem('refresh_token') || '';
});
</script>
