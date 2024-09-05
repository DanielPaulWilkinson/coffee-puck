<script setup lang="ts">
 withDefaults(defineProps<{
    title: string,
    id?: string | undefined,
    value: unknown,
    childClass?: string,
    radioType?: "standard" | "pill" | "block",
    modelValue: unknown,
    disabled?: boolean
}>(), {
    id: undefined,
    childClass: undefined,
    radioType: "standard",
    validation: undefined,
});

defineEmits<{
    (on:"update:modelValue", value: unknown): void
}>();

</script>

<template>
    <div :class="`radio-${radioType}`">
        <input
            :id="`${id}_${value}`"
            class="form-control radio btn-check"
            :value="value"
            :disabled="disabled"
            :checked="value === modelValue"
            type="radio"
            @change="[$emit('update:modelValue', value)]"
        >
        <label
            :for="`${id}_${value}`"
            class="form-radio-label btn disable-selection align-middle show-pointer"
            :class="[
                childClass ? childClass : '',
                value === modelValue ? 'selected' : ''
                ]"
        >
            {{ title }}
        </label>
    </div>
</template>
