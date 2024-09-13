<script setup lang="ts">

const props = withDefaults(defineProps<{
    modelValue: string,
    placeholder?: string | null,
    maxLength?: number | undefined,
    filter?: (e: KeyboardEvent) => boolean | undefined,
    id?: string,
}>(), {
    filter: () => true,
    maxLength: 999,
    placeholder: undefined,
    suggestions: undefined,
    id: undefined,
    validation: undefined,
});

const emit = defineEmits<{
    (on: "update:modelValue", value: string | number): void
    (on: "blur", value: string | number): void
}>();

</script>
<template>
    <textarea :id="id" ref="inputRef" :value="modelValue" :maxLength="maxLength" :class="[{
        input: true,
    },
    ]" rows="2" class="form-control" :placeholder="placeholder || undefined" @keypress="props.filter"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>
<style>
.error-margin {
    margin-top: 6px;
}
</style>
