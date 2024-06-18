<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import Text from "./Text.vue";

type State = {
    isOpen: boolean;
    setResult: boolean;
    searchTerm: string;
}

export type Suggestion = {
    id: number | string,
    name: string,
    type: string,
}


const state = reactive<State>({
    isOpen: false,
    setResult: false,
    searchTerm: "",
});

const props = defineProps<{
    suggestions: Suggestion[],
    search?: string,
    notFoundMessage: string,
    placeholder?: string,
    id: string,
}>();

const emit = defineEmits<{
    (on:"update:suggestion", value: string): void
    (on:"click:suggestion", value: Suggestion): void
}>();

function setResult(suggestion: Suggestion) {
    state.isOpen = false;
    state.setResult = true;
    state.searchTerm = suggestion.name;
    emit("click:suggestion", suggestion);
}

watch(() => state.searchTerm, (value) => {
    emit("update:suggestion", state.searchTerm ?? "");
    if (state.setResult || value === "") {
        state.isOpen = false;
        state.setResult = false;
    } else {
        state.isOpen = true;
    }
});

</script>
<template>
    <Text
        :id="props.id"
        v-model="state.searchTerm"
        :placeholder="props.placeholder"
        type="text"
        class="col-md-12"
    />
    <div v-if="state.isOpen && props.suggestions">
        <ul class="suggestions">
            <li
                v-for="(suggestion, key) in props.suggestions.slice(0,10)"
                :key="key"
                class="suggestion suggestion-success"
                @click="setResult(suggestion)"
            >
                {{ suggestion.name ?? "" }}
            </li>
            <li
                v-if="props.suggestions.length === 0"
                class="suggestion text-center"
            >
                {{ props.notFoundMessage }}
            </li>
        </ul>
    </div>
</template>
<style>
.suggestions {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block;
    outline: 0;
    border: 1px solid #ddd;
    background: #fff;
    color: #333;

}
.suggestion {
    margin: 0;
    padding: 10px;
    cursor: pointer;
}
.suggestion:hover {
        background-color: #137a8c!important;
        border-color: #137a8c;
        color: #ffffff;
    }
</style>
