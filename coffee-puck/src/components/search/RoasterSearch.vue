<script lang="ts" setup>
import { computed, reactive } from "vue";
import AutoComplete, { type Suggestion } from "../fields/AutoComplete.vue";
import { getRoasters } from "../../data/roasters";
import type { pagination, roaster } from "@/data/types";
withDefaults(
    defineProps<{
        id: string;
        modelValue: string | null | undefined;
    }>(),
    {},
);

type roasterSearch = {
    data: roaster[];
    pagination: pagination | null;
    search: string;
};

const state = reactive<roasterSearch>({
    search: "",
    data: [],
    pagination: null,
});

async function callData(page: number, search?: string) {
    const result = await getRoasters(page, 5, "id", "DESC", search);
    state.data = result.data;
    state.pagination = result.pagination;
}

const emit = defineEmits<{
    (on: "selected", value: number): void;
    (on: "update:modelValue", value: string): void;
}>();
const suggestions = computed(() => state.data.map((e: roaster) => { return { id: e.id, name: e.name, type: e.name }}))

</script>
<template>
    <AutoComplete
        :id="id"
        :search="state.search"
        :placeholder="state.search"
        not-found-message="no roasters found"
        :suggestions="suggestions as Suggestion[]"
        @update:suggestion="callData(1, $event)"
        @click:suggestion="emit('selected', $event.id as number)"
    />
</template>
