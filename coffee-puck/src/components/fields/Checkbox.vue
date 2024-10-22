<script setup lang="ts">
withDefaults(defineProps<{
    id: string,
    modelValue: string,
    class?: string,
    name?: string,
}>(), {
});

const emit = defineEmits<{
    (on: "update:modelValue", value: string): void
    (on: "uncheck", value: string): void
    (on: "check", value: string): void
}>();

</script>
<template>
    <label>{{ modelValue }}</label>
    <input type="checkbox" :id="id" :value="name" class="form-check-input" :class="class"
      @change="emit('uncheck', modelValue)"
      @input="emit('check', modelValue)"
    />
</template>