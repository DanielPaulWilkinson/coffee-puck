<script setup lang="ts">
const props = withDefaults(defineProps<{
    type: "text" | "email" | "number" | "currency",
    modelValue: string | number | null,
    pii?: boolean,
    inputmode?: "numeric" | "text" | undefined,
    placeholder?: string | null,
    class?: string | null,
    maxLength?: number | undefined,
    filter?: (e: KeyboardEvent) => boolean | undefined,
    append?: string,
    prepend?: string,
    id?: string,
    emitBlurEvent?: boolean,
    disabled?: boolean,
}>(), {
    pii: true,
    filter: () => true,
    maxLength: 999,
    inputmode: undefined,
    placeholder: undefined,
    class: "col-md-6",
    append: "",
    prepend: "",
    suggestions: undefined,
    id: undefined,
    validation: undefined,
    emitBlurEvent: false,
    disabled: false,
});


const emit = defineEmits<{
    (on:"update:modelValue", value: string | number): void
    (on:"blur"): void
}>();

if (typeof name !== "string") {
    throw new Error();
}

</script>
<template>
    <div
        :class="props?.class"
    >
        <div :class="(prepend || append || props.type === 'currency') ? 'input-group': ''">
            <span
                v-if="prepend || props.type === 'currency'"
                class="input-group-text"
            >{{ props.type === "currency" ? '£' : prepend }}</span>
            <input
                :id="id"
                ref="inputRef"
                :type="type"
                :value="modelValue"
                :maxLength="maxLength"
                :class="[{
                    input: true,
                    sessioncamhidetext: pii !== false,
                },
                ]"
                :disabled="disabled"
                class="form-control"
                :placeholder="placeholder || undefined"
                :inputmode="props.inputmode"
                @keypress="props.filter"
                @input="emit('update:modelValue',($event.target as HTMLInputElement).value)"
                @blur="emitBlurEvent ? emit('blur') : '';"
            >
            <span
                v-if="append"
                id="basic-addon2"
                class="input-group-text"
            >{{ append }}</span>
        </div>
    </div>
</template>
<style>
.error-margin {
    margin-top: 6px;
}
</style>
