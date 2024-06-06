<script setup lang="ts">
    const props = withDefaults(defineProps<{
        id: string,
        type: "radio",
        modelValue: string | null,
        checked?: boolean,
        class?: string,
        name: string,
    }>(), {
        checked: false,
    });

const emit = defineEmits<{
    (on: "update:modelValue", value: string): void
    (on: "selectedSuggestion", value: string): void
    (on: "blur", value: string): void
}>();

</script>
<template>
    <input 
        :id="id"
        :type="type"
        :value="modelValue"
        class="form-check-input"
        :class="class"
        :checked="checked"
        :name="name"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>