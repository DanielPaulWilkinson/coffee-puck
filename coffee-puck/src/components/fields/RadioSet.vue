<script setup lang="ts">
import { useSlots } from 'vue';

    useSlots();
    const props = withDefaults(defineProps<{
        id: string,
        name: string,
        class?: string,
        error?: string
    }>(), {});

</script>
<template>
    <div class="radio-set">
        <slot />
    </div>
</template>