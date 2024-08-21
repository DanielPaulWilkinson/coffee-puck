<script lang="ts" setup>
defineProps<{
    modelValue: boolean,
}>();

const emit = defineEmits<{
    (on: "update:modelValue", value: boolean): void
}>();
</script>

<template>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary" :class="[{ 'active': modelValue === true }]"
            @click="emit('update:modelValue', true)">
            <font-awesome-icon :icon="['fas', 'table']" /> Table
        </label>
        <label class="btn btn-secondary" :class="[{ 'active': modelValue === false }]"
            @click="emit('update:modelValue', false)">
            <font-awesome-icon :icon="['fas', 'table-cells-large']" /> Add
        </label>
    </div>
</template>