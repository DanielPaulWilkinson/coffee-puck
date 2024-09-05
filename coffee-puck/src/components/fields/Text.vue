<script setup lang="ts">
import { ValidationArgs } from "@vuelidate/core";
import Validation from "./Validation.vue";
const props = withDefaults(defineProps<{
    id: string,
    // https://www.w3schools.com/html/html_form_input_types.asp
    type: "text" | "email" | "number" | "currency" | "tel",
    modelValue: string | number | null,
    // https://www.w3schools.com/tags/att_inputmode.asp
    inputmode?: "numeric" | "text" | undefined,
    placeholder?: string | null,
    class?: string | null,
    maxLength?: number | undefined,
    filter?: (e: KeyboardEvent) => boolean | undefined,
    // used for symbols like % for percentage
    append?: string,
    // used for symbols like £ before price
    prepend?: string,
    //do we want the blur event?
    emitBlurEvent?: boolean,
    disabled?: boolean,
    validation?: ValidationArgs
}>(), {
    filter: () => true,
    maxLength: 999,
    inputmode: undefined,
    placeholder: undefined,
    class: "",
    append: "",
    prepend: "",
    emitBlurEvent: false,
    disabled: false,
});
const emit = defineEmits<{
    (on: "update:modelValue", value: string | number): void
    (on: "blur"): void
}>();

</script>
<template>
    <div :class="props?.class">
        <div :class="(prepend || append || type === 'currency') ? 'input-group' : ''">
            <span v-if="prepend || type === 'currency'" class="input-group-text">
                {{ type === "currency" ? '£' : prepend }}
            </span>
            <input :id="id" :type="type" :value="modelValue" :maxLength="maxLength" :disabled="disabled"
                class="form-control input" 
                :placeholder="placeholder || undefined" :inputmode="inputmode"
                @keypress="props.filter" 
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                @blur="emitBlurEvent ? emit('blur') : '';">
            <span v-if="append" class="input-group-text">
                {{ append }}
            </span>
        </div>
        <Validation v-model="props.modelValue" :validation="props.validation"/>
    </div>
</template>
