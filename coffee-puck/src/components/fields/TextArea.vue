<script setup lang="ts">
import { computed, inject } from "vue";

const props = withDefaults(defineProps<{
    modelValue: string,
    pii?: boolean,
    placeholder?: string | null,
    class?: string | null,
    maxLength?: number | undefined,
    filter?: (e: KeyboardEvent) => boolean | undefined,
    id?: string,
}>(), {
    pii: true,
    filter: () => true,
    maxLength: 999,
    placeholder: undefined,
    class: "col-md-6",
    suggestions: undefined,
    id: undefined,
    validation: undefined,
});

const emit = defineEmits<{
    (on:"update:modelValue", value: string | number): void
    (on:"blur", value: string | number): void
}>();

</script>
<template>
    <div :class="props?.class">
        <textarea
            :id="id"
            ref="inputRef"
            :value="modelValue"
            :maxLength="maxLength"
            :class="[{
                input: true,
                sessioncamhidetext: pii !== false,
            },
            ]"
            rows="2"
            class="form-control"
            :placeholder="placeholder || undefined"
            @keypress="props.filter"
            @input="emit('update:modelValue',($event.target as HTMLInputElement).value)"
        />
    </div>
</template>
<style>
.error-margin {
    margin-top: 6px;
}
</style>
