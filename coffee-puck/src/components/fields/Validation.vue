<script setup lang="ts">
import { computed, watch } from "vue";
import { ValidationArgs, useVuelidate } from "@vuelidate/core";

const props = defineProps<{
    modelValue: string | number | null,
    validation?: ValidationArgs,
}>();

const internalModalValue = computed(() => props.modelValue);
const v$ = useVuelidate({
    field: props.validation ?? {},
}, {
    field: internalModalValue,
})

watch(() => props.modelValue, () => {
    v$.value.$validate();
});

</script>

<template>
    <div v-if="v$.$error">
        <div class="alert alert-danger mt-2">
            {{ v$.$errors[0].$message }}
        </div>
    </div>
</template>