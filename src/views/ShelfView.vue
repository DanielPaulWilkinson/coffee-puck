<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { state, brewsFor } from '../lib/store'
import { daysSince, restLabel } from '../lib/brew'
const open = computed(() => state.beans.filter((b) => !b.finished))
const done = computed(() => state.beans.filter((b) => b.finished))
const tag = (d: number) => ({ Resting: 'bg-crema text-espresso', Peak: 'bg-[#DCEBDD] text-[#24402A]', 'Past best': 'bg-copper-light text-[#7A3A17]' } as Record<string, string>)[restLabel(d)]
</script>
<template>
  <div class="space-y-8">
    <header class="flex items-end justify-between">
      <div><p class="eyebrow">{{ open.length }} open</p><h1 class="text-4xl mt-1">Bean shelf</h1></div>
      <RouterLink to="/beans/new" class="btn-ghost">+ Add bean</RouterLink>
    </header>
    <section v-for="group in [{ t: 'On the counter', l: open }, { t: 'Finished', l: done }]" :key="group.t" v-show="group.l.length" :aria-label="group.t">
      <h2 class="text-xl mb-3">{{ group.t }}</h2>
      <ul class="space-y-3">
        <li v-for="b in group.l" :key="b.id">
          <RouterLink :to="`/beans/${b.id}`" class="card flex items-center gap-4 p-4 hover:-translate-y-0.5 transition duration-200" :class="b.finished && 'bg-cream'">
            <div class="w-12 h-12 shrink-0 rounded-full bg-espresso grid place-items-center" aria-hidden="true">
              <svg viewBox="0 0 24 24" class="w-6 h-6"><ellipse cx="12" cy="12" rx="6" ry="8.5" fill="#9A4E24" transform="rotate(-25 12 12)"/><path d="M9.5 5.5c3 3 .5 8 5 13" stroke="#3B2418" stroke-width="1.6" fill="none"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-serif text-xl leading-tight truncate">{{ b.name }}</p>
              <p class="text-sm text-muted truncate">{{ b.roaster }} · {{ brewsFor(b.id).length }} brews</p>
            </div>
            <div class="text-right shrink-0">
              <p class="font-semibold">{{ daysSince(b.roastDate) }}d</p>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="b.finished ? 'bg-crema' : tag(daysSince(b.roastDate))">{{ b.finished ? 'Finished' : restLabel(daysSince(b.roastDate)) }}</span>
            </div>
          </RouterLink>
        </li>
      </ul>
    </section>
    <p v-if="!state.beans.length" class="text-muted">No beans yet.</p>
  </div>
</template>
