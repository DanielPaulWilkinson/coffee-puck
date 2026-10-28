<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { addBean } from '../lib/store'
const router = useRouter()
const f = reactive({ name: '', roaster: '', roastDate: new Date(Date.now() - 5 * 864e5).toISOString().slice(0, 10) })
const err = reactive({ name: '' })
function submit() {
  err.name = f.name.trim() ? '' : 'Give the bean a name.'
  if (err.name) return
  const b = addBean({ name: f.name.trim(), roaster: f.roaster.trim(), roastDate: f.roastDate })
  router.push({ path: '/brew/new', query: { bean: b.id } })
}
</script>
<template>
  <form @submit.prevent="submit" class="space-y-6" novalidate>
    <header class="flex items-center justify-between"><h1 class="text-3xl">Add a bean</h1><RouterLink to="/beans" class="btn-ghost px-4">Cancel</RouterLink></header>
    <div><label for="n" class="label">Name</label><input id="n" v-model="f.name" class="field" placeholder="e.g. Kiamabara AA" autocomplete="off" :aria-invalid="!!err.name" aria-describedby="n-err" />
      <p id="n-err" class="text-sm text-[#8A2E12] mt-1" role="alert">{{ err.name }}</p></div>
    <div><label for="r" class="label">Roaster</label><input id="r" v-model="f.roaster" class="field" placeholder="e.g. Dark Arts Coffee" autocomplete="off" /></div>
    <div><label for="d" class="label">Roast date</label><input id="d" v-model="f.roastDate" type="date" class="field" /></div>
    <button class="btn-primary w-full h-14 text-lg">Save and brew</button>
  </form>
</template>
