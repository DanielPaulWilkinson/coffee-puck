<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { beanById, brewsFor } from '../lib/store'
import { daysSince, restLabel } from '../lib/brew'
import ScoreChart from '../components/ScoreChart.vue'
import BrewRow from '../components/BrewRow.vue'
const route = useRoute()
const bean = computed(() => beanById(route.params.id as string))
const brews = computed(() => (bean.value ? brewsFor(bean.value.id) : []))
const best = computed(() => [...brews.value].sort((a, b) => b.score - a.score || b.createdAt.localeCompare(a.createdAt))[0])
</script>
<template>
  <div v-if="bean" class="space-y-6">
    <header>
      <RouterLink to="/beans" class="text-sm font-semibold text-copper min-h-[44px] inline-flex items-center">← Shelf</RouterLink>
      <h1 class="text-4xl leading-tight">{{ bean.name }}</h1>
      <p class="text-muted">{{ bean.roaster }} · roasted {{ daysSince(bean.roastDate) }} days ago · {{ bean.finished ? 'Finished' : restLabel(daysSince(bean.roastDate)) }}</p>
    </header>
    <section class="card p-5" aria-labelledby="chart-h">
      <div class="flex items-baseline justify-between"><h2 id="chart-h" class="text-xl">Taste over time</h2><span class="text-sm text-muted">{{ brews.length }} brews</span></div>
      <ScoreChart v-if="brews.length" :brews="[...brews].reverse()" class="mt-3" />
      <p v-else class="text-muted mt-3">No brews yet.</p>
      <p v-if="best" class="mt-3 text-sm border-l-2 border-copper pl-3">Best: <strong>{{ best.dose }}g → {{ best.yield }}g in {{ best.time }}s, grind {{ best.grind || '–' }}</strong></p>
    </section>
    <div class="grid grid-cols-2 gap-3">
      <RouterLink v-if="!bean.finished" :to="{ path: '/brew/new', query: { bean: bean.id } }" class="btn-primary">Brew this</RouterLink>
      <button type="button" class="btn-ghost" @click="bean.finished = !bean.finished">{{ bean.finished ? 'Reopen bag' : 'Mark finished' }}</button>
    </div>
    <section aria-labelledby="brews-h">
      <h2 id="brews-h" class="text-xl mb-2">Brews</h2>
      <ul class="card px-4 divide-y divide-espresso/10"><li v-for="b in brews" :key="b.id"><BrewRow :brew="b" /></li></ul>
    </section>
  </div>
  <p v-else>Bean not found.</p>
</template>
