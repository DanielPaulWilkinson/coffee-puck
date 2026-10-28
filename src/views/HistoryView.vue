<script setup lang="ts">
import { computed, ref } from 'vue'
import { state, sortedBrews, replaceAll } from '../lib/store'
import { exportJson, importJson, mergeJournal } from '../lib/storage'
import BrewRow from '../components/BrewRow.vue'
const groups = computed(() => {
  const m = new Map<string, ReturnType<typeof sortedBrews>>()
  for (const b of sortedBrews()) {
    const k = new Date(b.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    m.set(k, [...(m.get(k) ?? []), b])
  }
  return [...m]
})
const avg = computed(() => state.brews.length ? (state.brews.reduce((s, b) => s + b.score, 0) / state.brews.length).toFixed(1) : '–')
const msg = ref('')
const mode = ref<'merge' | 'replace'>('merge')
function doExport() {
  const url = URL.createObjectURL(new Blob([exportJson(state)], { type: 'application/json' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: `brew-journal-${new Date().toISOString().slice(0, 10)}.json` })
  a.click(); URL.revokeObjectURL(url)
  msg.value = 'Backup downloaded.'
}
async function doImport(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  try {
    const d = importJson(await file.text())
    if (mode.value === 'replace') {
      if (!confirm(`Replace your journal with ${d.brews.length} brews and ${d.beans.length} beans from this backup?`)) return
      replaceAll(d); msg.value = 'Backup restored.'
    } else {
      const before = state.brews.length
      replaceAll(mergeJournal(state, d)); msg.value = `Merged. ${state.brews.length - before} new brews added.`
    }
    ;(e.target as HTMLInputElement).value = ''
  } catch (err) { msg.value = (err as Error).message }
}
</script>
<template>
  <div class="space-y-8">
    <header><p class="eyebrow">{{ state.brews.length }} brews · avg taste {{ avg }}</p><h1 class="text-4xl mt-1">History</h1></header>
    <section v-for="[month, list] in groups" :key="month" :aria-label="month">
      <h2 class="text-lg text-muted mb-2">{{ month }}</h2>
      <ul class="card px-4 divide-y divide-espresso/10"><li v-for="b in list" :key="b.id"><BrewRow :brew="b" show-bean /></li></ul>
    </section>
    <p v-if="!state.brews.length" class="text-muted">No brews yet. Your first one will show up here.</p>
    <section class="card p-5 space-y-3" aria-labelledby="bk-h">
      <h2 id="bk-h" class="text-xl">Your data</h2>
      <p class="text-sm text-muted">Everything lives on this device only. Download a backup now and then.</p>
      <fieldset class="flex flex-wrap gap-x-5 text-sm">
        <legend class="sr-only">When importing</legend>
        <label class="inline-flex items-center gap-2 min-h-[44px]"><input type="radio" value="merge" v-model="mode" class="w-5 h-5 accent-[#7A2430]" /> Merge with my journal</label>
        <label class="inline-flex items-center gap-2 min-h-[44px]"><input type="radio" value="replace" v-model="mode" class="w-5 h-5 accent-[#7A2430]" /> Replace everything</label>
      </fieldset>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn-ghost" @click="doExport">Export backup</button>
        <label class="btn-ghost cursor-pointer focus-within:ring-2 focus-within:ring-copper">Import backup<input type="file" accept="application/json" class="sr-only" @change="doImport" /></label>
      </div>
      <p class="text-sm" role="status">{{ msg }}</p>
      <a href="./privacy.html" class="text-sm font-semibold text-copper underline underline-offset-4 inline-flex items-center min-h-[44px]">Privacy policy</a>
    </section>
  </div>
</template>
