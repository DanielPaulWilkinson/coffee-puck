<script setup lang="ts">
import useVuelidate, { ValidationArgs } from '@vuelidate/core';
import { useSlots } from 'vue';
import Validation from './Validation.vue';

    useSlots();
    withDefaults(defineProps<{
        id: string,
        name: string,
        class?: string,
        error?: string,
        validation?: ValidationArgs,
        modelValue: number | string | boolean | null,
    }>(), {});

    const v$ = useVuelidate();
</script>
<template>
    <div class="radio-set">
        <slot />
    </div>
    <Validation v-if="v$.$error" :model-value="modelValue" :validation="validation" />
</template>