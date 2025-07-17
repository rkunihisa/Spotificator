
<template>
  <div class="min-h-screen bg-[#121212] py-10 px-2 font-sans">
    <div class="max-w-2xl mx-auto px-4 sm:px-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-3">
        <svg width="36" height="36" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block"><circle cx="84" cy="84" r="84" fill="#1DB954"/><path d="M120.1 115.2c-1.7 2.8-5.3 3.7-8.1 2-22.2-13.6-50.2-16.7-83.2-9.2-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.6-8 66.2-4.5 91.1 10.5 2.8 1.7 3.7 5.3 2 8.3zm11.6-23.2c-2.1 3.4-6.5 4.5-9.9 2.4-25.4-15.5-64.2-20-94.2-11-3.8 1.1-7.8-1.1-8.9-4.9-1.1-3.8 1.1-7.8 4.9-8.9 33.6-9.7 75.1-4.8 103.6 12.1 3.4 2.1 4.5 6.5 2.4 9.9zm12.2-25.1c-29-17.2-77.2-18.8-104.6-10.3-4.4 1.3-9-1.2-10.3-5.6-1.3-4.4 1.2-9 5.6-10.3 30.6-9.2 83.2-7.4 116.2 11.6 4 2.4 5.3 7.7 2.9 11.7-2.4 4-7.7 5.3-11.7 2.9z" fill="#fff"/></svg>
        Dashboard
        <Button @click="logout" class="ml-auto px-4 py-2 bg-[#1db954] text-white rounded hover:bg-[#169c43]">Logout</Button>
      </h1>
      <div class="h-1 w-24 bg-[#1db954] rounded mb-8"></div>
      <form class="flex flex-col gap-4 mb-8 bg-[#181818] rounded-lg p-6 shadow w-full max-w-xl mx-auto" @submit.prevent="getTopTracks">
        <div class="flex flex-col sm:flex-row gap-4">
          <label class="flex flex-col text-white text-sm font-semibold w-full">
            Term
            <select v-model="term" class="mt-1 rounded bg-[#282828] text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1db954]">
              <option value="short_term">short_term</option>
              <option value="medium_term">medium_term</option>
              <option value="long_term">long_term</option>
            </select>
          </label>
          <label class="flex flex-col text-white text-sm font-semibold w-full">
            Limit
            <input type="number" v-model.number="limit" min="1" max="50" class="mt-1 rounded bg-[#282828] text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1db954]" />
          </label>
          <label class="flex flex-col text-white text-sm font-semibold w-full">
            Offset
            <input type="number" v-model.number="offset" min="0" class="mt-1 rounded bg-[#282828] text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1db954]" />
          </label>
        </div>
        <Button
          :token="accessToken"
          :term="term"
          :limit="limit"
          :offset="offset"
          type="submit"
          class="mt-4 w-full"
        >Get your top tracks</Button>
      </form>
      <div v-if="showTopTracks" class="mt-10 w-full max-w-xl mx-auto">
        <TopTracks :items="topTracks.items" :loading="loading" :error="error" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from '@/components/modules/Button.vue';
import TopTracks from './TopTracks.vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js';

const accessToken = ref('');
const refreshToken = ref('');
const term = ref('short_term');
const limit = ref(10);
const offset = ref(0);

// TopTracks state
const topTracks = ref({ items: [] });
const loading = ref(false);
const error = ref('');
const showTopTracks = ref(false);

import { useRouter } from 'vue-router';
const router = useRouter();

function logout() {
  const authStore = useAuthStore();
  authStore.clearTokens();
  router.replace('/');
}

async function getTopTracks() {
  if (!accessToken.value) {
    alert('Please log in to Spotify first.');
    return;
  }
  localStorage.setItem('term', term.value);
  localStorage.setItem('limit', limit.value);
  localStorage.setItem('offset', offset.value);
  loading.value = true;
  error.value = '';
  showTopTracks.value = false;
  try {
    const params = new URLSearchParams({
      access_token: accessToken.value,
      term: term.value,
      limit: limit.value,
      offset: offset.value,
    });
    const res = await axios.get(`http://127.0.0.1:3000/top-tracks?${params.toString()}`);
    topTracks.value = res.data;
    showTopTracks.value = true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error('Error fetching top tracks:', e.response?.data || e.message);
      if (e.response) {
        console.error('Status:', e.response.status);
        console.error('Data:', e.response.data);
      }
    } else {
      console.error('Unexpected error:', e);
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  accessToken.value = localStorage.getItem('access_token') || '';
  refreshToken.value = localStorage.getItem('refresh_token') || '';
});
</script>
