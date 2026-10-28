<script setup lang="ts">
import SteamCup from './SteamCup.vue'
const leaf = 'M0 -14 C8 -10 12 -2 0 14 C-12 -2 -8 -10 0 -14Z'
</script>
<template>
  <div class="relative" aria-hidden="true">
    <svg viewBox="0 0 160 160" class="absolute inset-0 w-full h-full">
      <circle cx="80" cy="84" r="66" fill="#EADBC3"/>
      <g fill="#7A2430"><path :d="leaf" transform="translate(30 46) rotate(-35)"/></g>
      <g fill="#C9A24A"><path :d="leaf" transform="translate(132 58) rotate(40) scale(.9)"/></g>
      <g fill="#A0522D"><path :d="leaf" transform="translate(122 122) rotate(110) scale(.7)"/></g>
      <g fill="#7E5A12"><path :d="leaf" transform="translate(40 124) rotate(-120) scale(.6)"/></g>
    </svg>
    <div class="absolute inset-[18%]"><SteamCup pour /></div>
  </div>
</template>
