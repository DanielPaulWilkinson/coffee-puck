<script setup lang="ts">
import { useSlots } from 'vue';

    useSlots();
    const props = withDefaults(defineProps<{
        id: string,
        type: "text",
        modelValue: string | null,
        inputMode: "numeric" | "text" | "search" | "decimal",
        placeholder?: string | null,
        max?: number,
        min?: number,
        error: string,
        class?: string,
        append?: string,
        prependClass?: string,
        prepend?: string,
        filter?: (e: KeyboardEvent) => boolean | undefined;
        suggestions?: string[]
    }>(), {
        filter: () => true,
        max: 999,
        min: 0,
        error: "",
        placeholder: undefined,
        inputMode: undefined,
        append: "",
        prepend: "",
    });

const emit = defineEmits<{
    (on: "update:modelValue", value: string): void
    (on: "selectedSuggestion", value: string): void
    (on: "blur", value: string): void
}>();

</script>
<template>
    <div :class="(prepend || append || $slots.append) ? 'input-group' : ''">
    <span v-if="prepend || $slots.append" class="input-group-text" :class="prependClass">
        {{ prepend }}
        <slot name="append" />
    </span>
   
    <input 
        :id="id"
        :type="type"
        :value="modelValue"
        :maxlength="max"
        :minlength="min"
        class="form-control"
        :class="class"
        :placeholder="placeholder || undefined"
        :inputmode="inputMode"
        @keypress="filter"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="append"
    class="input-group-text">
        {{ append }}
    </span>
    <div v-if="suggestions">
        <ul class="suggestions">
            <li v-for="(suggestion, index) in suggestions"
            :key="index"
            class="suggestion">
                <span>{{ suggestion }}</span>
            </li>
        </ul>
    </div>
</div>
</template>
<style lang="scss">
.suggestions {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block;
    outline: 0;
    border: 1px solid #ddd;
    background: #fff;
    .suggestion{
        margin: 0;
        padding: 10px;
        cursor: pointer;
        :hover {
            background-color: #137abc;
            border-color: #137abc;
            color: #fff;
        }
    }
}
</style>