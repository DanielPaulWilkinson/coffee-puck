<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Brew } from '../lib/types'
import { METHODS, formatRatio, formatTime } from '../lib/brew'
import { beanById } from '../lib/store'
import ScoreDots from './ScoreDots.vue'
const props = defineProps<{ brew: Brew; showBean?: boolean }>()
const when = new Date(props.brew.createdAt).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
</script>
<template>
  <RouterLink :to="`/brew/${brew.id}`" class="flex items-center gap-4 py-3 min-h-[56px] rounded-xl px-2 -mx-2 hover:bg-crema/60 transition duration-200">
    <div class="flex-1 min-w-0">
      <p class="font-medium truncate">{{ showBean ? beanById(brew.beanId)?.name ?? 'Unknown bean' : METHODS[brew.method].label }}</p>
      <p class="text-sm text-muted">{{ when }} · {{ showBean ? METHODS[brew.method].label + ' · ' : '' }}{{ formatRatio(brew.dose, brew.yield) }} · {{ formatTime(brew.time) }}</p>
    </div>
    <ScoreDots :score="brew.score" />
  </RouterLink>
</template>
