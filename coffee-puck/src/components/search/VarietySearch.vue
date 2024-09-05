<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from "vue";
import AutoComplete from "../fields/AutoComplete.vue";
import { getVarieties } from "../../data/varieties";
import type { pagination, variety } from "@/data/types";
const props = 
    defineProps<{
        id: string;
        modelValue: string | null | undefined;
    }>();

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
    (on: "selected", value: variety | null): void;
}>();

watch(() => props.modelValue, async () => {
    state.search = props.modelValue ?? "";
    await callData(1);
});

onMounted(async () => {
    state.search = props.modelValue ?? "";
    await callData(1);
});

const suggestions = computed(() => state.data.map((e: variety) => { return { id: e.id, name: e.name, type: e.lineage}}))

</script>
<template>
    <AutoComplete
        :id="id"
        :search="state.search"
        :placeholder="state.search"
        not-found-message="no varieties found"
        :suggestions="suggestions"
        @update:suggestion="callData(1, $event)"
        @click:suggestion="emit('selected', state.data.find(x => x.id === $event.id) ?? null)"
    />
</template>
