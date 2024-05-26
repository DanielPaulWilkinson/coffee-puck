<script setup lang="ts">
export interface Options {
    value: string,
    name: string,
}
    
withDefaults(defineProps<{
        id: string,
        type: "select",
        modelValue: string | null,
        options?: Options[],
        placeholder: string | null,
        class?: string,
    }>(), {
        
    });

const emit = defineEmits<{
    (on: "update:modelValue", value: string): void
    (on: "selectedSuggestion", value: string): void
    (on: "blur", value: string): void
}>();

</script>
<template>
    <select 
        :id="id"
        :type="type"
        :value="modelValue"
        class="form-select" aria-label="Default select example"
        :class="class"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
        <option v-if="placeholder" value="" disabled="true" hidden="true" selected="true"> {{ placeholder }}</option>
        <option v-for="(option, index) in options" :value="option.value">{{ option.name }}</option>
    </select>
</template>