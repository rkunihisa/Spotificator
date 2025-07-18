<template>
  <li
    class="flex flex-col items-center justify-between bg-[#181818] rounded-xl shadow-md p-0 w-44 h-64 mx-auto hover:ring-4 hover:ring-[#1db954] transition-all overflow-hidden"
    style="aspect-ratio: 3/4; font-family: 'Inter', 'Noto Sans JP', sans-serif;"
  >
    <div class="w-full h-2/3 flex items-center justify-center bg-[#282828]">
      <img
        v-if="props.track.album.images.length > 0"
        :src="props.track.album.images[0].url"
        alt="Album cover"
        crossorigin="anonymous"
        class="w-32 h-32 object-cover rounded-md shadow-md border-2 border-[#282828]"
      >
    </div>
    <div class="flex flex-col items-center justify-center w-full h-1/3 px-3 pb-3 pt-2">
      <span class="font-bold text-base text-white text-center truncate w-full" :title="props.track.name">{{ props.track.name }}</span>
      <span class="text-[#1db954] text-xs mt-1 text-center truncate w-full font-medium" :title="props.track.artists[0]?.name">{{ props.track.artists[0]?.name }}</span>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({ track: Object });
</script>
