<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { state, lastBrew, addBrew, updateBrew, deleteBrew } from '../lib/store'
import { METHODS, formatRatio, speed } from '../lib/brew'
import type { Method, Note } from '../lib/types'

const router = useRouter()
const route = useRoute()
const editing = state.brews.find((b) => b.id === route.params.id)
const open = computed(() => state.beans.filter((b) => !b.finished || b.id === editing?.beanId))
const initialBean = (route.query.bean as string) || lastBrew()?.beanId || open.value[0]?.id || ''
const f = reactive({ beanId: initialBean, method: 'espresso' as Method, dose: 18, yield: 36, time: 28, grind: '', temp: undefined as number | undefined, score: 3, notes: [] as Note[] })

function prefill(beanId: string) {
  const prev = lastBrew(beanId) ?? lastBrew()
  if (prev) Object.assign(f, { method: prev.method, dose: prev.dose, yield: prev.yield, time: prev.time, grind: prev.grind, temp: prev.temp })
  f.score = 3; f.notes = []
}
if (editing) Object.assign(f, { ...editing, notes: [...editing.notes] })
else prefill(f.beanId)
watch(() => f.beanId, (id) => { if (!editing) prefill(id) })
const prefilled = computed(() => !editing && !!lastBrew(f.beanId))

function setMethod(m: Method) {
  if (m === f.method) return
  f.method = m
  const prev = state.brews.filter((b) => b.beanId === f.beanId && b.method === m).sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]
  Object.assign(f, prev ? { dose: prev.dose, yield: prev.yield, time: prev.time, grind: prev.grind, temp: prev.temp } : { ...METHODS[m].defaults, grind: '' })
}
const NOTES: Note[] = ['sour', 'bitter', 'balanced', 'sweet']
const toggle = (n: Note) => (f.notes = f.notes.includes(n) ? f.notes.filter((x) => x !== n) : [...f.notes, n])
const sp = computed(() => speed(f.method, f.time))
const scoreWords = ['', 'Undrinkable', 'Meh', 'Fine', 'Good', 'Superb']

function submit() {
  if (!f.beanId) return
  const data = { beanId: f.beanId, method: f.method, dose: f.dose, yield: f.yield, time: f.time, grind: f.grind, temp: f.temp, score: f.score, notes: [...f.notes] }
  if (editing) { updateBrew(editing.id, data); router.push(`/brew/${editing.id}`); return }
  const brew = addBrew(data)
  router.push({ path: `/brew/${brew.id}`, query: { fresh: '1' } })
}
function remove() {
  if (editing && confirm('Delete this brew? This cannot be undone.')) { deleteBrew(editing.id); router.push('/history') }
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-7" novalidate>
    <header class="flex items-center justify-between">
      <h1 class="text-3xl">{{ editing ? 'Edit brew' : 'New brew' }}</h1>
      <RouterLink :to="editing ? `/brew/${editing.id}` : '/'" class="btn-ghost px-4">Cancel</RouterLink>
    </header>

    <div v-if="!open.length" class="card p-5">
      <p>You need a bean first.</p>
      <RouterLink to="/beans/new" class="btn-primary mt-3">Add a bean</RouterLink>
    </div>

    <template v-else>
      <div>
        <label for="bean" class="label">Bean</label>
        <select id="bean" v-model="f.beanId" class="field font-serif text-lg">
          <option v-for="b in open" :key="b.id" :value="b.id">{{ b.name }} · {{ b.roaster }}</option>
        </select>
        <p v-if="prefilled" class="mt-2 text-sm text-muted">Filled in from your last brew of this bean. Change only what you changed.</p>
      </div>

      <fieldset>
        <legend class="label">Method</legend>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button v-for="(m, key) in METHODS" :key="key" type="button" @click="setMethod(key)" :aria-pressed="f.method === key"
            class="chip justify-center" :class="f.method === key ? 'bg-espresso text-cream border-espresso' : 'border-espresso/20 bg-paper hover:bg-crema'">{{ m.label }}</button>
        </div>
      </fieldset>

      <div class="card p-5 space-y-4">
        <div class="grid grid-cols-3 gap-3">
          <div><label for="dose" class="label">Dose (g)</label><input id="dose" v-model.number="f.dose" type="number" inputmode="decimal" step="0.1" min="0" class="field text-lg font-semibold" /></div>
          <div><label for="yield" class="label">{{ f.method === 'espresso' ? 'Yield (g)' : 'Water (g)' }}</label><input id="yield" v-model.number="f.yield" type="number" inputmode="decimal" step="1" min="0" class="field text-lg font-semibold" /></div>
          <div><label for="time" class="label">Time (s)</label><input id="time" v-model.number="f.time" type="number" inputmode="numeric" min="0" class="field text-lg font-semibold" /></div>
        </div>
        <p class="flex justify-between text-sm" aria-live="polite">
          <span>Ratio <strong>{{ formatRatio(f.dose, f.yield) }}</strong></span>
          <span :class="sp === 'on-target' ? 'text-green-800' : 'text-copper'">{{ sp === 'on-target' ? 'On target' : sp === 'fast' ? 'Running fast' : 'Running slow' }}</span>
        </p>
        <div class="grid grid-cols-2 gap-3">
          <div><label for="grind" class="label">Grind setting</label><input id="grind" v-model="f.grind" inputmode="decimal" placeholder="e.g. 2.0" class="field" /></div>
          <div><label for="temp" class="label">Water °C <span class="font-normal">(optional)</span></label><input id="temp" v-model.number="f.temp" type="number" inputmode="numeric" class="field" /></div>
        </div>
      </div>

      <fieldset>
        <legend class="label">Taste <span class="text-espresso font-semibold">· {{ scoreWords[f.score] }}</span></legend>
        <div class="grid grid-cols-5 gap-2">
          <button v-for="s in 5" :key="s" type="button" @click="f.score = s" :aria-pressed="f.score === s" :aria-label="`${s} out of 5, ${scoreWords[s]}`"
            class="h-12 rounded-xl font-semibold text-lg border transition duration-200"
            :class="s <= f.score ? 'bg-copper text-paper border-copper' : 'bg-paper border-espresso/20 hover:bg-crema'">{{ s }}</button>
        </div>
      </fieldset>

      <fieldset>
        <legend class="label">How did it taste?</legend>
        <div class="flex flex-wrap gap-2">
          <button v-for="n in NOTES" :key="n" type="button" @click="toggle(n)" :aria-pressed="f.notes.includes(n)"
            class="chip capitalize" :class="f.notes.includes(n) ? 'bg-copper-light border-copper text-espresso' : 'border-espresso/20 bg-paper hover:bg-crema'">
            <span v-if="f.notes.includes(n)" aria-hidden="true" class="mr-1">✓</span>{{ n }}</button>
        </div>
      </fieldset>

      <button type="submit" class="btn-primary w-full h-14 text-lg">{{ editing ? 'Save changes' : 'Save and get a hint' }}</button>
      <button v-if="editing" type="button" @click="remove" class="btn w-full text-copper underline underline-offset-4">Delete this brew</button>
    </template>
  </form>
</template>
