<script setup lang="ts">
import { coffeeType, coffee } from '@/data/types';
import Question from '@/components/layout/Question.vue';
import FillCoffee from '@/components/utils/FillCoffee.vue';
import Text from '@/components/fields/Text.vue';
import { onMounted, reactive, watch } from 'vue';
import type { coffeePaginationResponse } from '@/data/coffee';
import type { coffeeTypePaginationResponse } from '@/data/coffeeTypes';
import Modal from '@/components/utils/Modal.vue';
import { ValidationArgs } from "@vuelidate/core";
import Validation from "./Validation.vue";

export type Search = {
    cardSuggestions: CardSuggestion[],
    modalItem: coffee | coffeeType | null,
    modalShow: boolean,
}

export type CardSuggestion = {
    data: coffee | coffeeType,
    isSelected: boolean;
};

const props = defineProps<{
    id: string,
    modelValue: string,
    question: string,
    tooltip: string,
    label: string,
    class: string,
    suggestions: coffeePaginationResponse | coffeeTypePaginationResponse | null,
    error: string,
    validation?: ValidationArgs,
}>();

const emit = defineEmits<{
    (event: "update:modelValue", value: string): void
    (event: "search", value: string): void
    (event: "selectItem", value: coffee | coffeeType): void
    (event: "viewItem", value: coffee | coffeeType): void
}>();

const state = reactive<Search>({
    cardSuggestions: [],
    modalItem: null,
    modalShow: false,
});

onMounted(() => {
    state.cardSuggestions = [];
    props.suggestions?.data.forEach((suggestion: coffee | coffeeType) => {
        state.cardSuggestions.push({
            data: suggestion,
            isSelected: false,
        });
    });
});

watch(() => props.suggestions, () => {
    state.cardSuggestions = [];
    props.suggestions?.data.forEach((suggestion: coffee | coffeeType) => {
        state.cardSuggestions.push({
            data: suggestion,
            isSelected: false,
        });
    });
});

const unselectSuggestions = async () => state.cardSuggestions?.forEach(x => x.isSelected = false);

</script>
<template>
    <div class="col-md-6 mt-2">
        <h2>{{ question }}</h2>
        <Question name="coffee" :tooltip="props.tooltip" :label="props.label" :form-group="true" :error="props.error"
            class="">
            <Text input-mode="text" id="coffee" type="text" v-model="props.modelValue" placeholder="search..." error=""
                @input="emit('search', ($event.target as HTMLInputElement).value)" class="input" prepend-class="icon">
                <template #append>
                    <font-awesome-icon :icon="['fas', 'search']" />
                </template>
            </Text>
        </Question>

        <div class="row mt-2" v-if="state.cardSuggestions">
            <div class="col-lg-4 col-md-12 col-sm-12 col-12 mt-sm-2" v-for="(suggestion) in state.cardSuggestions">
                <div class="card selectable mt-3" :class="{ 'selected': suggestion.isSelected }"
                    @click.prevent="emit('selectItem', suggestion.data); unselectSuggestions(); suggestion.isSelected = true;">
                    <div v-if="typeof suggestion === typeof coffeeType && 'icon' in suggestion.data">
                        <FillCoffee v-if="suggestion.data.icon === 'espresso'" :id="suggestion.data.icon"
                            :type="suggestion.data.name" :espresso-delay="1000" :espresso-percent="16" />
                        <FillCoffee v-if="suggestion.data.icon === 'double-espresso'" id="double-espresso"
                            :type="suggestion.data.name" :espresso-delay="1000" :espresso-percent="32" />
                        <FillCoffee v-if="suggestion.data.icon === 'cafe-latte'" id="latte" :type="suggestion.data.name"
                            :espresso-delay="1000" :milk-delay="2000" :espresso-percent="16" :milk-percent="84" />
                        <FillCoffee v-if="suggestion.data.icon === 'americano'" id="americano"
                            :type="suggestion.data.name" :coffee-delay="1000" :coffee-percent="100" />
                        <FillCoffee v-if="suggestion.data.icon === 'long-black'" id="long-black"
                            :type="suggestion.data.name" :coffee-delay="1000" :coffee-percent="100" />
                    </div>
                    <img v-else src="https://howdencoffee.co.uk/wp-content/uploads/2022/08/HC-116.jpg"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ suggestion.data.name }}</h5>
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            @click.prevent="state.modalItem = suggestion.data; state.modalShow = true;">View</a>
                    </div>
                    <div v-if="suggestion.isSelected" class="check">
                        <img src="@/assets/check.svg" />
                    </div>
                </div>
            </div>
        </div>
        <Validation v-model="props.modelValue" :validation="props.validation"/>
    </div>
    <Modal :id="`${props.id}-suggestion-modal`" :isOpen="state.modalShow">
        <template #body>
            <div class="modal-header">
                <h5 class="modal-title">{{ state.modalItem?.name }}</h5>
                <button type="button" class="btn-close"></button>
            </div>
            <div class="modal-body">
                {{ state.modalItem?.name }}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="state.modalShow = false">Close</button>
                <button type="button" class="btn btn-primary">Select</button>
            </div>
        </template>
    </Modal>
</template>