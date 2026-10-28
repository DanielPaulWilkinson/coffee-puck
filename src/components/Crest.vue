<script setup lang="ts">
const base = import.meta.env.BASE_URL
withDefaults(defineProps<{ size?: number }>(), { size: 40 })
</script>
<template>
  <img :src="base + 'icon.svg'" :width="size" :height="size" alt="" aria-hidden="true" class="rounded-[22%] shadow-card" />
</template>
