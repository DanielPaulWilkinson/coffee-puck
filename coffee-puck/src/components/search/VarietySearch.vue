<script lang="ts" setup>
import { onMounted, reactive, watch } from "vue";
import AutoComplete from "../fields/AutoComplete.vue";
import { getVarieties } from "../../data/varieties";
import type { pagination, variety } from "@/data/Types";
const props = withDefaults(
    defineProps<{
        id: string;
        modelValue: number | null;
    }>(),
    {},
);

type varietySearch = {
    data: variety[];
    pagination: pagination | null;
    search: string;
};

const state = reactive<varietySearch>({
    search: "",
    data: [],
    pagination: null,
});

async function callData(page: number, search?: string) {
    const result = await getVarieties(page, 5, "id", "DESC", search);
    state.data = result.data;
    state.pagination = result.pagination;
}

const emit = defineEmits<{
    (on: "selected", value: number): void;
    (on: "update:modelValue", value: string): void;
}>();

onMounted(async () => {
    await callData(1);
});
</script>
<template>
    <AutoComplete
        :id="id"
        :clear-input-after-click="false"
        not-found-message="no found"
        :suggestions="state.data.map((e) => { return { id: e.id, name: e.name, type: e.process}})"
        @update:suggestion="callData(1, $event)"
        @click:suggestion="emit('selected', $event.id as number)"
    />
</template>
