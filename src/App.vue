<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const tabs = [
  { to: '/', label: 'Today', d: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { to: '/beans', label: 'Beans', d: 'M12 3c4 0 7 4 7 9s-3 9-7 9-7-4-7-9 3-9 7-9zM9 6c4 3 2 9 6 12' },
  { to: '/history', label: 'History', d: 'M12 7v5l3 2M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5' },
]
const active = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to) && route.path !== '/beans/new')
const hideNav = computed(() => route.path === '/brew/new' || route.path === '/beans/new')
</script>

<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 btn-primary z-50">Skip to content</a>
  <div class="min-h-dvh mx-auto max-w-xl lg:max-w-5xl lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:px-8">
    <nav aria-label="Main" v-if="!hideNav"
      class="fixed bottom-0 inset-x-0 z-40 border-t border-espresso/10 bg-paper/95 backdrop-blur pb-[env(safe-area-inset-bottom)]
             lg:static lg:border-0 lg:bg-transparent lg:pt-10">
      <p class="hidden lg:block font-serif text-2xl mb-8">Brew<span class="text-copper">.</span>Journal</p>
      <ul class="flex justify-around lg:flex-col lg:gap-1">
        <li v-for="t in tabs" :key="t.to">
          <RouterLink :to="t.to" :aria-current="active(t.to) ? 'page' : undefined"
            class="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 min-w-[72px] min-h-[56px] lg:min-h-[44px] px-3 justify-center lg:justify-start rounded-xl text-xs lg:text-base font-medium transition duration-200"
            :class="active(t.to) ? 'text-copper lg:bg-copper-light' : 'text-muted hover:text-espresso'">
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="t.d"/></svg>
            {{ t.label }}
          </RouterLink>
        </li>
        <li class="hidden lg:block mt-6"><RouterLink to="/brew/new" class="btn-primary w-full">+ New brew</RouterLink></li>
      </ul>
    </nav>
    <main id="main" class="px-5 pt-8 lg:px-0 lg:pt-10 lg:max-w-2xl w-full" :class="hideNav ? 'pb-10' : 'pb-28'">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in"><component :is="Component" :key="route.path" /></Transition>
      </RouterView>
    </main>
  </div>
</template>
