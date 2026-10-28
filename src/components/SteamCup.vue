<script setup lang="ts">
defineProps<{ pour?: boolean }>()
</script>
<template>
  <svg viewBox="0 0 120 120" class="w-full h-full" aria-hidden="true">
    <g class="steam" fill="none" stroke="#C9A24A" stroke-width="3" stroke-linecap="round" opacity=".9">
      <path d="M44 40c-6-8 6-12 0-22"/><path d="M60 40c-6-8 6-12 0-22"/><path d="M76 40c-6-8 6-12 0-22"/>
    </g>
    <path d="M86 58h6a12 12 0 0 1 0 24h-8" fill="none" stroke="#C9A24A" stroke-width="5"/>
    <path d="M24 50h66v22a28 28 0 0 1-28 28h-10a28 28 0 0 1-28-28z" fill="#FFF9EE" stroke="#C9A24A" stroke-width="4"/>
    <clipPath id="cup"><path d="M28 54h58v18a24 24 0 0 1-24 24h-10a24 24 0 0 1-24-24z"/></clipPath>
    <g clip-path="url(#cup)"><rect :class="pour && 'pour'" x="20" y="58" width="80" height="50" fill="#4A2416"/><rect x="20" y="58" width="80" height="5" fill="#B57A4A" opacity=".8" :class="pour && 'pour'"/></g>
    <ellipse cx="57" cy="104" rx="42" ry="5" fill="#2A1810" opacity=".12"/>
  </svg>
</template>
