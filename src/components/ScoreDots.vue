<script setup lang="ts">
defineProps<{ score: number }>()
</script>
<template>
  <span class="inline-flex gap-1" :aria-label="`Taste ${score} out of 5`" role="img">
    <span v-for="i in 5" :key="i" class="w-2 h-2 rounded-full" :class="i <= score ? 'bg-copper' : 'bg-crema'" />
  </span>
</template>
