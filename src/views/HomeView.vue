<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { state, lastBrew, beanById } from '../lib/store'
import { METHODS, formatRatio, formatTime, dialInHint, daysSince, restLabel } from '../lib/brew'
import ScoreDots from '../components/ScoreDots.vue'
const last = computed(() => lastBrew())
const bean = computed(() => last.value && beanById(last.value.beanId))
const hint = computed(() => last.value && dialInHint(last.value))
const open = computed(() => state.beans.filter((b) => !b.finished))
const h = new Date().getHours()
const greeting = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
</script>

<template>
  <div class="space-y-8">
    <header>
      <p class="eyebrow">{{ today }}</p>
      <h1 class="text-4xl mt-1">{{ greeting }}.</h1>
    </header>

    <section v-if="!state.beans.length" class="card p-6 text-center space-y-4">
      <div class="mx-auto w-16 h-16 rounded-full bg-copper-light grid place-items-center text-3xl" aria-hidden="true">☕</div>
      <h2 class="text-2xl">Start with a bag of beans</h2>
      <p class="text-muted">Add what's on your counter, then log your first brew. Everything stays on this device.</p>
      <RouterLink to="/beans/new" class="btn-primary">Add your first bean</RouterLink>
    </section>

    <template v-else>
      <RouterLink to="/brew/new" class="btn-primary w-full h-14 text-lg shadow-card">
        <span aria-hidden="true" class="text-2xl leading-none">+</span> New brew
      </RouterLink>

      <section v-if="last && bean" aria-labelledby="last-h">
        <h2 id="last-h" class="text-xl mb-3">Last brew</h2>
        <RouterLink :to="`/brew/${last.id}`" class="card block p-5 hover:-translate-y-0.5 transition duration-200">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-serif text-2xl leading-tight">{{ bean.name }}</p>
              <p class="text-sm text-muted">{{ bean.roaster }} · {{ METHODS[last.method].label }}</p>
            </div>
            <ScoreDots :score="last.score" />
          </div>
          <dl class="grid grid-cols-3 gap-2 mt-5 text-center">
            <div class="rounded-xl bg-cream py-3"><dt class="text-xs text-muted">Ratio</dt><dd class="font-semibold text-lg">{{ formatRatio(last.dose, last.yield) }}</dd></div>
            <div class="rounded-xl bg-cream py-3"><dt class="text-xs text-muted">Time</dt><dd class="font-semibold text-lg">{{ formatTime(last.time) }}</dd></div>
            <div class="rounded-xl bg-cream py-3"><dt class="text-xs text-muted">Grind</dt><dd class="font-semibold text-lg">{{ last.grind || '–' }}</dd></div>
          </dl>
          <p v-if="hint" class="mt-4 text-sm border-l-2 border-copper pl-3"><span class="font-semibold">{{ hint.headline }}</span></p>
        </RouterLink>
      </section>

      <section aria-labelledby="open-h">
        <div class="flex items-baseline justify-between mb-3">
          <h2 id="open-h" class="text-xl">Open beans</h2>
          <RouterLink to="/beans" class="text-sm font-semibold text-copper underline-offset-4 hover:underline min-h-[44px] inline-flex items-center">See shelf</RouterLink>
        </div>
        <ul class="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x">
          <li v-for="b in open" :key="b.id" class="snap-start shrink-0 w-44">
            <RouterLink :to="`/beans/${b.id}`" class="card block p-4 h-full hover:-translate-y-0.5 transition duration-200">
              <p class="font-serif text-lg leading-tight">{{ b.name }}</p>
              <p class="text-sm text-muted truncate">{{ b.roaster }}</p>
              <p class="mt-3 text-sm"><span class="font-semibold">{{ daysSince(b.roastDate) }} days</span> <span class="text-muted">· {{ restLabel(daysSince(b.roastDate)) }}</span></p>
            </RouterLink>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>
