<script setup lang="ts">
import { computed, inject } from "vue";

const props = withDefaults(defineProps<{
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
    <div :class="radioType">
        <input
            :id="`${id}_${value}`"
            class="form-control radio infoItem btn-check"
            :value="value"
            :disabled="disabled"
            :checked="value === modelValue"
            type="radio"
            @change="[$emit('update:modelValue', value)]"
        >
        <label
            :for="`${id}_${value}`"
            class="form-radio-label btn disable-selection align-middle show-pointer"
            :class="childClass ? childClass : ''"
        >
            {{ title }}
        </label>
    </div>
</template>

<style lang="scss">
    .standard {
        display: inline-block;
        padding-right: 15px;
        label.form-radio-label {
            padding: 11px 20px 9px;
            text-align: center;
            border-radius: 4px;
        }
    }
    .pill{
        display: inline-block;
        margin-left: 0px;
        &-start {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-top-left-radius: 25px !important;
            border-bottom-left-radius: 25px !important;
        }
        &-end{
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-top-right-radius: 25px !important;
            border-bottom-right-radius: 25px !important;
        }
    }
    .block {
        display: inline;
        padding-right: 15px;
        height: 110px;
        width: 100%;
        border-radius: 0%;
        label.form-radio-label {
            padding: 20px 20px 20px;
            border-radius: 4px;
            min-height: 95px;
        }
    }
</style>
