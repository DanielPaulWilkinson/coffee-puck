<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { state, beanById } from '../lib/store'
import { METHODS, dialInHint, formatRatio, formatTime, speed, bestBrew } from '../lib/brew'
import { brewsFor } from '../lib/store'
import SteamCup from '../components/SteamCup.vue'
import ScoreDots from '../components/ScoreDots.vue'
const route = useRoute()
const fresh = computed(() => route.query.fresh === '1')
const isBest = computed(() => !!brew.value && brewsFor(brew.value.beanId).length > 1 && bestBrew(brewsFor(brew.value.beanId))?.id === brew.value.id)
const brew = computed(() => state.brews.find((b) => b.id === route.params.id))
const bean = computed(() => brew.value && beanById(brew.value.beanId))
const hint = computed(() => brew.value && dialInHint(brew.value))
const t = computed(() => brew.value && METHODS[brew.value.method])
const pos = computed(() => {
  if (!brew.value || !t.value) return 50
  const [lo, hi] = t.value.time, span = hi - lo
  return Math.min(100, Math.max(0, ((brew.value.time - (lo - span)) / (3 * span)) * 100))
})
</script>

<template>
  <div v-if="brew && bean && hint && t" class="space-y-6">
    <div v-if="fresh" class="flex items-center gap-4 pop" role="status">
      <div class="w-20 h-20 shrink-0"><SteamCup pour /></div>
      <p class="font-serif text-xl">Brew saved. Here's your nudge.</p>
    </div>
    <header>
      <p class="eyebrow">Dial-in</p>
      <h1 class="text-3xl mt-1">{{ bean.name }}</h1>
      <p v-if="isBest" class="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-gold-light text-gold text-sm font-semibold"><span aria-hidden="true">★</span> Best recipe for this bean</p>
      <p class="text-muted">{{ t.label }} · {{ new Date(brew.createdAt).toLocaleString('en-GB', { weekday: 'short', hour: '2-digit', minute: '2-digit' }) }}</p>
    </header>

    <section class="rounded-2xl p-6 text-cream" :class="hint.tone === 'good' ? 'bg-gradient-to-br from-[#2F4A35] to-[#1E3324]' : 'bg-gradient-to-br from-[#5A1A24] to-espresso'" aria-live="polite">
      <p class="text-sm uppercase tracking-[.14em] opacity-80">{{ hint.tone === 'good' ? 'Keep it' : 'Next time' }}</p>
      <p class="font-serif text-3xl leading-tight mt-2">{{ hint.headline }}</p>
      <p class="mt-3 opacity-90">{{ hint.detail }}</p>
    </section>

    <section class="card p-5 space-y-5">
      <dl class="grid grid-cols-3 text-center">
        <div><dt class="text-xs text-muted">Ratio</dt><dd class="text-2xl font-semibold">{{ formatRatio(brew.dose, brew.yield) }}</dd></div>
        <div><dt class="text-xs text-muted">Dose → out</dt><dd class="text-2xl font-semibold">{{ brew.dose }}→{{ brew.yield }}</dd></div>
        <div><dt class="text-xs text-muted">Grind</dt><dd class="text-2xl font-semibold">{{ brew.grind || '–' }}</dd></div>
      </dl>
      <div>
        <div class="flex justify-between text-sm mb-2"><span class="text-muted">Time</span><span><strong>{{ formatTime(brew.time) }}</strong> · {{ speed(brew.method, brew.time) === 'on-target' ? 'on target' : speed(brew.method, brew.time) }}</span></div>
        <div class="relative h-3 rounded-full bg-crema" role="img" :aria-label="`Time ${formatTime(brew.time)}, target ${formatTime(t.time[0])} to ${formatTime(t.time[1])}`">
          <div class="absolute inset-y-0 left-1/3 w-1/3 rounded-full bg-[#CFE3D2]"></div>
          <div class="absolute -top-1 w-5 h-5 rounded-full bg-copper border-2 border-paper shadow -translate-x-1/2 transition-all duration-200" :style="{ left: pos + '%' }"></div>
        </div>
        <div class="flex justify-between text-xs text-muted mt-2"><span>Fast</span><span>Target {{ formatTime(t.time[0]) }}–{{ formatTime(t.time[1]) }}</span><span>Slow</span></div>
      </div>
      <div class="flex items-center justify-between pt-1">
        <span class="text-sm text-muted">Taste</span>
        <span class="flex items-center gap-3"><ScoreDots :score="brew.score" /><span class="text-sm capitalize">{{ brew.notes.join(', ') || 'no notes' }}</span></span>
      </div>
    </section>

    <div class="grid grid-cols-2 gap-3">
      <RouterLink :to="{ path: '/brew/new', query: { bean: bean.id } }" class="btn-primary">Brew again</RouterLink>
      <RouterLink :to="`/beans/${bean.id}`" class="btn-ghost">See progress</RouterLink>
    </div>
    <RouterLink :to="`/brew/${brew.id}/edit`" class="btn w-full text-copper underline underline-offset-4">Edit or delete this brew</RouterLink>
  </div>
  <p v-else>Brew not found. <RouterLink to="/" class="underline">Go home</RouterLink></p>
</template>
