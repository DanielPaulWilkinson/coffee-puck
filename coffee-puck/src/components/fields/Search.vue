<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import Text from "./Text.vue";
import { getVarieties } from "../../data/varieties"
const props = withDefaults(defineProps<{
    id: string,
    modelValue: string | null,
}>(), {});

const state = reactive({
    search: "",
    suggestions: [],
    data: [],
    pagination: null,
});

async function callData(page: number) {
    const result = await getVarieties(page, 5, "id", "DESC", state.search);
    state.data = result.data;
    state.pagination = result.pagination;
}

defineEmits<{
    (on: "selected", value: string): void
}>();

onMounted(() => {
    await callData(1);
}),

</script>
<template>
    <Text :id="id" type="text" inputmode="text" :v-model="state.search" @input="callData(1)"
        :suggestions="state.suggestions" @selected-suggestion="$emit('selected', $event)" />
</template>