<script setup lang="ts">
import { ValidationArgs } from '@vuelidate/core';
import Validation from './Validation.vue';


export interface Options {
    value: string | number,
    name: string,
}

withDefaults(defineProps<{
    modelValue: string | number | null,
    options: (string | { value: string | number, label: string })[]
    placeholder: string | undefined
    percentage?: boolean
    col?: string,
    id?: string,
    validation?: ValidationArgs,
}>(), {

});

const emit = defineEmits<{
    (on: "update:modelValue", value: string | number): void
    (on: "change", value: string | number): void
}>();

</script>
<template>
    <select :id="id" :value="modelValue" :class="['form-select form-control']"
        @input="[$emit('update:modelValue', ($event.target as HTMLInputElement).value)]"
        @change="$emit('change', ($event.target as HTMLInputElement).value)">
        <option v-if="(typeof placeholder !== 'undefined')" value="" disabled="true" selected="true" hidden="true">
            {{ placeholder }}
        </option>
        <option v-for="option in options" :key="typeof option === 'string' ? option : option.label"
            :value="typeof option === 'string' ? option : option.value">
            {{ typeof option === 'string' ? option : option.label }}
        </option>
    </select>
    <Validation :model-value="modelValue" :validation="validation" />
</template>