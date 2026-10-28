<script setup lang="ts">
import { computed } from 'vue'
import type { Brew } from '../lib/types'
const props = defineProps<{ brews: Brew[] }>() // oldest first
const W = 320, H = 140, P = 20
const pts = computed(() => {
  const n = props.brews.length
  return props.brews.map((b, i) => ({
    x: n === 1 ? W / 2 : P + (i * (W - 2 * P)) / (n - 1),
    y: H - P - ((b.score - 1) / 4) * (H - 2 * P),
    s: b.score,
  }))
})
const line = computed(() => pts.value.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' '))
const area = computed(() => pts.value.length > 1 ? `${line.value} L${pts.value.at(-1)!.x},${H - P} L${pts.value[0].x},${H - P} Z` : '')
const summary = computed(() => `Taste score over ${props.brews.length} brews: ${props.brews.map((b) => b.score).join(', ')} out of 5.`)
</script>
<template>
  <figure>
    <svg :viewBox="`0 0 ${W} ${H}`" class="w-full h-auto" role="img" :aria-label="summary">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A4E24" stop-opacity=".25"/><stop offset="1" stop-color="#9A4E24" stop-opacity="0"/></linearGradient></defs>
      <g v-for="s in [1,3,5]" :key="s">
        <line :x1="P" :x2="W-P" :y1="H-P-((s-1)/4)*(H-2*P)" :y2="H-P-((s-1)/4)*(H-2*P)" stroke="#3B2418" stroke-opacity=".08"/>
        <text :x="4" :y="H-P-((s-1)/4)*(H-2*P)+4" font-size="10" fill="#6B5446">{{ s }}</text>
      </g>
      <path v-if="area" :d="area" fill="url(#g)"/>
      <path :d="line" fill="none" stroke="#9A4E24" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      <circle v-for="(p, i) in pts" :key="i" :cx="p.x" :cy="p.y" r="4.5" fill="#FFFDF9" stroke="#9A4E24" stroke-width="2.5"/>
    </svg>
    <figcaption class="sr-only">{{ summary }}</figcaption>
  </figure>
</template>
