<template>
  <div>
    <button @click="downloadTopTracks" class="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
      Download Top 4
    </button>
    <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block"><circle cx="84" cy="84" r="84" fill="#1DB954"/><path d="M120.1 115.2c-1.7 2.8-5.3 3.7-8.1 2-22.2-13.6-50.2-16.7-83.2-9.2-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.6-8 66.2-4.5 91.1 10.5 2.8 1.7 3.7 5.3 2 8.3zm11.6-23.2c-2.1 3.4-6.5 4.5-9.9 2.4-25.4-15.5-64.2-20-94.2-11-3.8 1.1-7.8-1.1-8.9-4.9-1.1-3.8 1.1-7.8 4.9-8.9 33.6-9.7 75.1-4.8 103.6 12.1 3.4 2.1 4.5 6.5 2.4 9.9zm12.2-25.1c-29-17.2-77.2-18.8-104.6-10.3-4.4 1.3-9-1.2-10.3-5.6-1.3-4.4 1.2-9 5.6-10.3 30.6-9.2 83.2-7.4 116.2 11.6 4 2.4 5.3 7.7 2.9 11.7-2.4 4-7.7 5.3-11.7 2.9z" fill="#fff"/></svg>
      Your Top Tracks
    </h1>
    <div class="h-1 w-24 bg-[#1db954] rounded mb-8"></div>
    <div v-if="loading" class="text-white text-lg mt-8">Loading...</div>
    <div v-else-if="error" class="text-red-400 text-lg mt-8">Error: {{ error }}</div>
    <div v-else>
      <div id="top4-capture" style="position:fixed;top:-9999px;left:-9999px;z-index:-1;display:block !important;">
        <ul class="grid grid-cols-2 gap-4 bg-black p-4 rounded">
          <Track v-for="track in items.slice(0, 4)" :key="track.id" :track="track" />
        </ul>
      </div>
      <Carousel v-if="isMobile" v-bind="carouselConfig" :items-to-show="3" :wrap-around="false" class="mt-6">
        <Slide v-for="track in items" :key="track.id" class="px-1">
          <Track :track="track" />
        </Slide>
      </Carousel>
      <ul v-else class="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-6">
        <Track v-for="track in items" :key="track.id" :track="track" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import Track from '../modules/Track.vue';
import { ref, onMounted } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';

import html2canvas from 'html2canvas';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const isMobile = ref(false);
function checkMobile() {
  isMobile.value = window.innerWidth <= 640;
}
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

async function downloadTopTracks() {
  const captureDiv = document.getElementById('top4-capture');
  if (!captureDiv) return;
  // 画像の読み込み完了を待つ
  const imgs = Array.from(captureDiv.getElementsByTagName('img'));
  await Promise.all(imgs.map(img => {
    if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  }));
  await new Promise(r => setTimeout(r, 50));
  html2canvas(captureDiv, { backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'top4_tracks.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
</script>
