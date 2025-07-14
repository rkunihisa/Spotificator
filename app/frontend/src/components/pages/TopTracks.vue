
<template>
  <div>
    <h1>Your Top Tracks</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <ul v-else>
      <li v-for="track in topTracks.items" :key="track.id">
        {{ track.name }} / {{ track.artists[0]?.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const topTracks = ref({ items: [] });
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  const accessToken = localStorage.getItem('access_token') || '';
  const term = localStorage.getItem('term') || 'short_term';
  const limit = localStorage.getItem('limit') || '10';
  const offset = localStorage.getItem('offset') || '0';
  try {
    const params = new URLSearchParams({
      access_token: accessToken,
      term,
      limit,
      offset,
    });
    const res = await fetch(`http://127.0.0.1:3000/top-tracks?${params.toString()}`);
    if (!res.ok) throw new Error(await res.text());
    topTracks.value = await res.json();
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
  } finally {
    loading.value = false;
  }
});
</script>
