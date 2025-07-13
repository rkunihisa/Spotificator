
<template>
  <div>
    <h1>Dashboard</h1>
    <div style="margin-bottom: 1em;">
      <label>
        Term:
        <select v-model="term">
          <option value="short_term">short_term</option>
          <option value="medium_term">medium_term</option>
          <option value="long_term">long_term</option>
        </select>
      </label>
      <label style="margin-left: 1em;">
        Limit:
        <input type="number" v-model.number="limit" min="1" max="50" />
      </label>
      <label style="margin-left: 1em;">
        Offset:
        <input type="number" v-model.number="offset" min="0" />
      </label>
    </div>
    <Button
      :token="accessToken"
      :term="term"
      :limit="limit"
      :offset="offset"
      @click ="getTopTracks"
    >get your top tracks</Button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from '@/components/modules/Button.vue';

const accessToken = ref('');
const refreshToken = ref('');

const term = ref('short_term');
const limit = ref(10);
const offset = ref(0);

function getTopTracks() {
  if (!accessToken.value) {
    alert('Please log in to Spotify first.');
    return;
  }
    window.location.href = 'http://127.0.0.1:3000/top-tracks?access_token=' + encodeURIComponent(accessToken.value) +
      '&term=' + encodeURIComponent(term.value) +
      '&limit=' + encodeURIComponent(limit.value) +
      '&offset=' + encodeURIComponent(offset.value);
}

onMounted(() => {
  accessToken.value = localStorage.getItem('access_token') || '';
  refreshToken.value = localStorage.getItem('refresh_token') || '';
});
</script>
